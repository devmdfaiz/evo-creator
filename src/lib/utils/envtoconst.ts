type Appwrite = {
  appwriteEndpoint: string | undefined;
  appwriteProjectId: string | undefined;
};

export const appwritInfo: Appwrite = {
  appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
  appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
};