import { evar } from "@/lib/envConstant";
import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(evar.appwriteProjectId);

export const storageClient = new Storage(client);
