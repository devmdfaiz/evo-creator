"use client";
import { Label } from "@/components/ui/label";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useMemo,
  useState,
  useTransition,
} from "react";
import TypographyP from "../typography/TypographyP";
import { cn } from "@/lib/utils/utils";
import { Input } from "@/components/ui/input";
import TypographyMuted from "../typography/TypographyMuted";
import {
  Cross1Icon,
  FileIcon,
  ReloadIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "../ui/button";
import { TImagesPreview, TValidFiles } from "@/lib/types/index.type";
import { showToast } from "@/lib/zod/index.zodSchema";
import axios from "axios";
import { Progress } from "../ui/progress";
import { Loader, LoaderCircle, Trash } from "lucide-react";
import { luciedConf } from "@/lib/constants/index.constant";
import ButtonSpinner from "../global/spinner/ButtonSpinner";
import { clientError } from "@/lib/utils/error/errorExtractor";
import { storageClient } from "@/lib/utils/appwrite/appwriteClient";
import { evar } from "@/lib/envConstant";

function optimizeFilesForPreview(file: FileList, sizeLimit: number) {
  const filesArray: File[] = Array.from(file);
  let preview: TImagesPreview[] = [];

  if (filesArray.length > sizeLimit) {
    showToast(
      "Action not Allowed!",
      `Select only ${sizeLimit} file(s)`,
      "Close",
      () => {}
    );

    return preview;
  }

  filesArray.map((file) => {
    preview.push({
      url: URL.createObjectURL(file),
      file,
    });
  });

  return preview;
}

function validateFile(
  formates: TValidFiles,
  files: TImagesPreview[]
): { validFiles: TImagesPreview[]; nonValidFiles: TImagesPreview[] } {
  let validFiles: TImagesPreview[] = [];
  let nonValidFiles: TImagesPreview[] = [];

  files.map((file) => {
    const size = parseInt((file.file.size / (1024 * 1024)).toFixed(0));

    if (size <= formates.size && formates.formates.includes(file.file.type)) {
      validFiles.push(file);
    }

    if (size > formates.size && !formates.formates.includes(file.file.type)) {
      nonValidFiles.push(file);
    }
  });

  return { validFiles, nonValidFiles };
}

const FileUploader = ({
  fileType,
  sizeLimit,
  from,
}: {
  fileType: TValidFiles;
  sizeLimit: number;
  from: "product" | "details" | "customise";
}) => {
  const [isDragStatusActive, setIsDragStatusActive] = useState<boolean>(false);
  const [imagesPreview, setImagesPreview] = useState<TImagesPreview[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const filesToValidate = optimizeFilesForPreview(files, sizeLimit);

      const preview = validateFile(fileType, filesToValidate);

      if (preview.nonValidFiles.length > 0) {
        preview.nonValidFiles.map((nonValidFile) => {
          showToast(
            "Invalid file",
            `${nonValidFile.file.name}`,
            "Close",
            () => {}
          );
        });
      }

      startTransition(() => {
        setImagesPreview((prev) => {
          if (prev.length >= sizeLimit) {
            showToast(
              "Action not Allowed!",
              `You crossed file uploading limit`,
              "Close",
              () => {}
            );

            return [...prev];
          }
          return [...prev, ...preview.validFiles];
        });
      });
    }
  }

  function handleFileDrop(e: DragEvent<HTMLDivElement | HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragStatusActive(false);

    const files = e.dataTransfer.files;

    if (files) {
      const filesToValidate = optimizeFilesForPreview(files, sizeLimit);

      const preview = validateFile(fileType, filesToValidate);

      if (preview.nonValidFiles.length > 0) {
        preview.nonValidFiles.map((nonValidFile) => {
          showToast(
            "Invalid file",
            `${nonValidFile.file.name}`,
            "Close",
            () => {}
          );
        });
      }

      startTransition(() => {
        setImagesPreview((prev) => {
          if (prev.length >= sizeLimit) {
            showToast(
              "Action not Allowed!",
              `You crossed file uploading limit`,
              "Close",
              () => {}
            );

            return [...prev];
          }
          return [...prev, ...preview.validFiles];
        });
      });
    }

    e.dataTransfer.clearData();
  }

  function handleDragEvent(e: DragEvent<HTMLDivElement | HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragStatusActive(true);
    } else if (e.type === "dragleave" || e.type === "dragend") {
      setIsDragStatusActive(false);
    }
  }

  /**
   * 
   * {
   * {
   * from: "product",
   * status: "uploaded"
   * fileData: {
   * uploadedFileId: "234567uiuv5c43x3crntmyi",
   * uploadedFileUrl: "h"
   * }
   * }
   * }
   */

  return (
    <>
      <Label
        htmlFor="file-taker"
        className={cn(
          "w-full h-fit border border-foreground/40 border-dashed rounded py-8 cursor-pointer",
          {
            "bg-foreground/20": isDragStatusActive,
          }
        )}
        onDrop={handleFileDrop}
        onDragEnter={handleDragEvent}
        onDragOver={handleDragEvent}
        onDragLeave={handleDragEvent}
        onDragEnd={handleDragEvent}
      >
        <Input
          type="file"
          multiple
          className="hidden"
          id="file-taker"
          onChange={handleFile}
          accept={fileType.formates.join(",")}
        />
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col items-center justify-center gap-px">
            <UploadIcon className="w-7 h-7" />
            <TypographyP className="opacity-70 text-sm">
              Drag & Drop your file(s) here or{" "}
              <span className="font-bold">click here</span> to upload
            </TypographyP>
            <TypographyMuted className="text-xs opacity-50">
              up to {sizeLimit} {from === "product" ? "file" : "images"},{" "}
              {fileType.size}MB per {from === "product" ? "file" : "images"}
            </TypographyMuted>
            <TypographyMuted className="text-xs opacity-50">
              Supported file formate(s){" "}
              {from === "product" ? ".zip" : ".png, .jgp, .jpeg, .gif, .webp"}
            </TypographyMuted>
          </div>
        </div>
      </Label>

      {imagesPreview.length > 0 &&
        imagesPreview.map((data, i) => (
          <ImagePreview
            imagesPreview={data}
            index={i}
            setImagesPreview={setImagesPreview}
            from={from}
          />
        ))}
    </>
  );
};

const ImagePreview = ({
  imagesPreview,
  index,
  setImagesPreview,
  from,
}: {
  imagesPreview: TImagesPreview;
  index: number;
  setImagesPreview: Dispatch<SetStateAction<TImagesPreview[]>>;
  from: "product" | "details" | "customise";
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [uploadingStatus, setUploadingStatus] = useState<
    "starting" | "uploading" | "failed" | "success"
  >("starting");

  function handleFileUpload() {
    setUploadingStatus("uploading");
    const { file } = imagesPreview;
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/appwrite/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total!) * 100
          );
          startTransition(() => {
            if (progress <= 99) {
              setUploadProgress(progress);
            }
          });
        },
      })
      .then((res) => {
        const { data, status } = res;

        if (status === 201) {
          setUploadProgress(100);
          setUploadingStatus("success");

          const view = storageClient.getFileView(evar.appwriteBucketId, data?.fileResponse?.$id
          )

          console.log("view", view)
          console.log("data", data)
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        setUploadingStatus("failed");
        showToast("Something went wrong!", errorMessage, "Close", () => {});
      });
  }

  function handleFileActions(index: number) {
    if (uploadingStatus === "success") {
      setImagesPreview((prev) => {
        const filtered = prev.filter((_, i) => i !== index);

        return filtered;
      });
    }

    if (uploadingStatus === "failed") {
      handleFileUpload();
    }
  }

  useMemo(() => {
    handleFileUpload();
  }, []);

  return (
    <div className="border border-foreground/40 border-dashed w-full h-fit rounded py-3 px-5 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-1 grow">
        <div key={index} className="flex justify-between items-center gap-3">
          <div>
            {from === "product" ? (
              <FileIcon className="w-5 h-5" />
            ) : (
              <Image
                src={imagesPreview.url}
                alt="preview"
                width={40}
                height={40}
                className="object-fill"
              />
            )}
          </div>
          <div className="grow">
            <TypographyP>
              {imagesPreview.file.name.slice(0, 30)}
              {imagesPreview.file.name.length > 30 && "..."}
            </TypographyP>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <Progress value={uploadProgress} className="" />
          <span>{uploadProgress}%</span>
        </div>
      </div>
      <div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleFileActions(index)}
        >
          {uploadingStatus === "uploading" ? (
            <LoaderCircle className="animate-spin" {...luciedConf} />
          ) : uploadingStatus === "success" ? (
            <Trash {...luciedConf} />
          ) : (
            <ReloadIcon />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
