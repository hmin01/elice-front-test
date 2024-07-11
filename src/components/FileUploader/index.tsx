import { useMemo } from "react";
// Type
import type { FileUploaderProps } from "./FileUploader.types";
import { setClassName } from "@/utilities/className";

export default function FileUploader({ className, onChange }: FileUploaderProps) {
  const id: string = useMemo(() => `dropzone-${Date.now()}`, []);

  return (
    <div className={setClassName("flex items-center justify-center w-full", className)}>
      <label htmlFor={id} className="bg-slate-50 border border-dashed border-gray-300 cursor-pointer flex flex-col h-full hover:bg-slate-100 items-center justify-center rounded-lg w-full">
        <div className="flex gap-4 items-center justify-center px-4 py-2">
          <svg className="w-8 h-8 text-slate-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
        </div>
        <input hidden id={id} onChange={onChange} type="file" />
      </label>
    </div>
  );
}
