"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";

export const UTUploadDropzone = ({
  uploadCompleted,
}: {
  uploadCompleted?: () => void;
}) => (
  <UploadDropzone
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      toast.success("Upload complete!");
      uploadCompleted?.();

      for (const file of res) {
        console.log(`Uploaded: ${file.name}`);
      }
    }}
    onUploadError={(error: Error) => {
      toast.error(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
  />
);
