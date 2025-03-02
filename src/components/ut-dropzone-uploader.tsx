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

      // for (const file of res) {
      //   toast.success(`Uploaded: ${file.name}`);
      // }
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
  />
);
