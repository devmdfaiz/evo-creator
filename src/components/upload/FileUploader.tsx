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
import {
  Item,
  TNImagesPreview,
  TTabsFrom,
  TValidFiles,
} from "@/lib/types/index.type";
import { showToast } from "@/lib/zod/index.zodSchema";
import axios from "axios";
import { Progress } from "../ui/progress";
import { LoaderCircle, Trash } from "lucide-react";
import { luciedConf } from "@/lib/constants/index.constant";
import { clientError } from "@/lib/utils/error/errorExtractor";
import { storageClient } from "@/lib/utils/appwrite/appwriteClient";
import { evar } from "@/lib/envConstant";
import { useFileHandler, usePageFormInputs } from "@/context/zustand/store";

function optimizeFilesForPreview(
  file: FileList,
  countLimit: number,
  from: TTabsFrom
) {
  const filesArray: File[] = Array.from(file);
  let preview: Item[] = [];

  if (filesArray.length > countLimit) {
    showToast(
      "Action not Allowed!",
      `Select only ${countLimit} file(s)`,
      "Close",
      () => {}
    );

    return preview;
  }

  filesArray.map((file) => {
    preview.push({
      status: "un-uploaded",
      fileData: {
        fileName: file.name,
        localUrl: URL.createObjectURL(file),
        selectedFile: file,
      },
    });
  });

  return preview;
}

function validateFile(
  formatesToValidate: TValidFiles,
  files: Item[],
  from: TTabsFrom
) {
  let validFiles: Item[] = [];
  let nonValidFiles: Item[] = [];

  files.map((file) => {
    const {
      fileData: {
        selectedFile: { size, type },
      },
    } = file;

    const sizeToValidate = parseInt((size / (1024 * 1024)).toFixed(0));

    if (
      sizeToValidate <= formatesToValidate.size &&
      formatesToValidate.formates.includes(type)
    ) {
      validFiles.push(file);
    }

    if (
      sizeToValidate > formatesToValidate.size &&
      !formatesToValidate.formates.includes(type)
    ) {
      nonValidFiles.push(file);
    }
  });

  return { validFiles, nonValidFiles };
}

//React components starts here
const FileUploader = ({
  fileType,
  countLimit,
  from,
}: {
  fileType: TValidFiles;
  countLimit: number;
  from: TTabsFrom;
}) => {
  const [isDragStatusActive, setIsDragStatusActive] = useState<boolean>(false);
  const { imagesPreview, setImagesPreview } = useFileHandler();
  const [isPending, startTransition] = useTransition();

  useMemo(() => {
    const filtered = imagesPreview[from].filter(
      (file) => file.status === "success"
    );

    setImagesPreview({
      action: "re-push",
      from,
      filesToRePush: filtered,
    });
  }, []);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const filesToValidate = optimizeFilesForPreview(files, countLimit, from);

      const preview = validateFile(fileType, filesToValidate, from);

      if (preview.nonValidFiles.length > 0) {
        preview.nonValidFiles.map((nonValidFile) => {
          showToast(
            "Invalid file",
            `${nonValidFile.fileData.selectedFile.name}`,
            "Close",
            () => {}
          );
        });
      }

      // startTransition(() => {
      //   setImagesPreview((prev) => {
      //     if (prev.length >= countLimit) {
      //       showToast(
      //         "Action not Allowed!",
      //         `You crossed file uploading limit`,
      //         "Close",
      //         () => {}
      //       );

      //       return [...prev];
      //     }
      //     return [...prev, ...preview.validFiles];
      //   });
      // });

      setImagesPreview({
        validFiles: preview.validFiles,
        countLimit,
        from,
        action: "add",
      });
    }
  }

  function handleFileDrop(e: DragEvent<HTMLDivElement | HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragStatusActive(false);

    const files = e.dataTransfer.files;

    if (files) {
      const filesToValidate = optimizeFilesForPreview(files, countLimit, from);

      const preview = validateFile(fileType, filesToValidate, from);

      if (preview.nonValidFiles.length > 0) {
        preview.nonValidFiles.map((nonValidFile) => {
          showToast(
            "Invalid file",
            `${nonValidFile.fileData.selectedFile.name}`,
            "Close",
            () => {}
          );
        });
      }

      // startTransition(() => {
      //   setImagesPreview((prev) => {
      //     if (prev.length >= countLimit) {
      //       showToast(
      //         "Action not Allowed!",
      //         `You crossed file uploading limit`,
      //         "Close",
      //         () => {}
      //       );

      //       return [...prev];
      //     }
      //     return [...prev, ...preview.validFiles];
      //   });
      // });

      setImagesPreview({
        validFiles: preview.validFiles,
        countLimit,
        from,
        action: "add",
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

  return (
    <>
      <Label
        htmlFor="file-taker"
        className={cn(
          "w-full h-fit border border-foreground/40 border-dashed rounded py-8 cursor-pointer px-4",
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
              up to {countLimit} {from === "product" ? "file" : "images"},{" "}
              {fileType.size}MB per {from === "product" ? "file" : "images"}
            </TypographyMuted>
            <TypographyMuted className="text-xs opacity-50">
              Supported file formate(s){" "}
              {from === "product" ? ".zip" : ".png, .jgp, .jpeg, .gif, .webp"}
            </TypographyMuted>
          </div>
        </div>
      </Label>

      {imagesPreview[from].length > 0 &&
        imagesPreview[from].map((filesData, i) => {
          return (
            <ImagePreview
              key={i}
              index={i}
              from={from}
              imagesPreview={filesData}
            />
          );
        })}
    </>
  );
};

const ImagePreview = ({
  index,
  from,
  imagesPreview,
}: {
  index: number;
  from: TTabsFrom;
  imagesPreview: Item;
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const { setImagesPreview } = useFileHandler();

  console.log("preview imagesPreview", imagesPreview);

  function handleFileUpload() {
    setImagesPreview({
      action: "update",
      uploadingStatus: "uploading",
      index,
      from,
    });

    const {
      fileData: { selectedFile },
    } = imagesPreview;
    const formData = new FormData();
    formData.append("file", selectedFile);

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

        const appwriteFileId = data?.fileResponse?.$id;

        if (status === 201) {
          setUploadProgress(100);

          const view = storageClient.getFileView(
            evar.appwriteBucketId,
            appwriteFileId
          );

          const appwriteFileUrl = view?.href;

          console.log("view", view);
          setImagesPreview({
            action: "update",
            uploadingStatus: "success",
            index,
            from,
            uploadedFileId: appwriteFileId,
            uploadedFileUrl: appwriteFileUrl,
          });
        }
      })
      .catch((error) => {
        const errorMessage = clientError(error);
        setImagesPreview({
          action: "update",
          uploadingStatus: "failed",
          from,
          index,
        });
        showToast("Something went wrong!", errorMessage, "Close", () => {});
      });
  }

  function handleFileActions(index: number) {
    if (imagesPreview.status === "success") {
      setImagesPreview({
        action: "delete",
        uploadingStatus: "deleting",
        from,
        index,
      });

      const del = storageClient
        .deleteFile(
          evar.appwriteBucketId,
          imagesPreview.fileData.uploadedFileId!
        )
        .then((res) => {
          setImagesPreview({
            action: "delete",
            uploadingStatus: "deleted",
            from,
            index,
          });
        })
        .catch((error) => {
          setImagesPreview({
            action: "delete",
            uploadingStatus: "success",
            from,
            index,
          });
        });
    }

    if (
      imagesPreview.status === "failed" ||
      imagesPreview.status === "deleted"
    ) {
      setImagesPreview({
        action: "update",
        uploadingStatus: "uploading",
        index,
        from,
      });
      handleFileUpload();
    }
  }

  useMemo(() => {
    if (imagesPreview.status === "un-uploaded") {
      handleFileUpload();
    } else if (imagesPreview.status === "success") {
      setUploadProgress(100);
    } else {
      if (index === 0) {
        showToast(
          "Reload Detected",
          "A reload has been detected. As a result, any unsaved files have been lost. Please re-select the files.",
          "Close",
          () => {}
        );
      }
    }
  }, []);

  return (
    <div className="border border-foreground/40 border-dashed w-full h-fit rounded py-3 px-5 flex justify-between items-center gap-3">
      <div className="flex flex-col gap-1 grow">
        <div key={index} className="flex justify-between items-center gap-3">
          <div>
            {from === "product" ? (
              <FileIcon className="w-5 h-5" />
            ) : imagesPreview.status === "success" ? (
              <Image
                src={imagesPreview.fileData.uploadedFileUrl!}
                alt="preview"
                width={40}
                height={40}
                className="object-fill"
              />
            ) : (
              <Image
                src={imagesPreview?.fileData?.localUrl}
                alt="preview"
                width={40}
                height={40}
                className="object-fill"
              />
            )}
          </div>
          <div className="grow">
            <TypographyP>
              {imagesPreview?.fileData?.fileName?.slice(0, 30)}
              {imagesPreview?.fileData?.fileName?.length > 30 && "..."}
            </TypographyP>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-center">
          {imagesPreview.status !== "deleted" ? (
            <>
              <Progress value={uploadProgress} />
              <span>{uploadProgress}%</span>
            </>
          ) : (
            <TypographyP className="text-red-700 bg-red-700/20 px-3 py-1 rounded text-xs my-1">
              The file has been deleted. To re-upload, click {`${'Reload'}`}.
            </TypographyP>
          )}
        </div>
      </div>
      <div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => handleFileActions(index)}
        >
          {imagesPreview.status === "uploading" ? (
            <LoaderCircle className="animate-spin" {...luciedConf} />
          ) : imagesPreview.status === "success" ? (
            <Trash {...luciedConf} />
          ) : imagesPreview.status === "deleting" ? (
            <LoaderCircle className="animate-spin" {...luciedConf} />
          ) : (
            <ReloadIcon />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
