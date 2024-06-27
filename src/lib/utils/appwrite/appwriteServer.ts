import { evar } from "@/lib/envConstant";
import sdk, { Client, Storage } from "node-appwrite";

let client = new Client();

client
  .setEndpoint(`${evar.domain}/v1`) // Your API Endpoint
  .setProject(evar.appwriteProjectId) // Your project ID
  .setKey(evar.appwriteApiKey); // Your secret API key

export const storageServer = new Storage(client);
