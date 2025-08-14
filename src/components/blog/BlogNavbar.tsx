"use client";
import React from "react";
import { Save, Upload, Loader2 } from "lucide-react";

interface BlogNavProps {
  type: "create" | "update";
  isPublishing: boolean;
  isSavedDraftClicked?: boolean;
  onSaveDraft?: () => void;
  onPublish: () => void;
  hasChanges?: boolean;
}

export const BlogNav: React.FC<BlogNavProps> = ({
  type,
  isPublishing,
  isSavedDraftClicked = false,
  onSaveDraft,
  onPublish,
  hasChanges = false,
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-gray-200 ">
      <div className="px-2 sm:px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl  font-bold font-raleway text-midnight-blue">
          JourneyWise
        </h1>

        <div className="flex items-center gap-2">
          {/* Changes indicator for update */}

          {/* Save as Draft - Only for create */}
          {type === "create" && onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isPublishing}
              className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md  border-[1px] sm:border-2 border-ocean-blue bg-white text-white hover:bg-ocean-blue/90 transition-colors sm:text-base text-xs group ${
                isPublishing && isSavedDraftClicked
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Save
                className={`w-4 h-4 text-ocean-blue group-hover:text-white ${
                  isPublishing && isSavedDraftClicked ? "hidden" : "hidden sm:block"
                }`}
              />
              <span className="sm:text-base text-xs text-ocean-blue group-hover:text-white flex items-center justify-center gap-2">
                <Loader2
                  className={`w-4 h-4 ${
                    isPublishing && isSavedDraftClicked
                      ? "animate-spin"
                      : "hidden"
                  }`}
                />
                {isPublishing && isSavedDraftClicked
                  ? "Saving..."
                  : "Save as draft"}
              </span>
            </button>
          )}

          {/* Publish/Update Button */}
          <button
            type="button"
            onClick={onPublish}
            disabled={isPublishing || (type === "update" && !hasChanges)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-ocean-blue text-white hover:bg-ocean-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:text-base text-xs"
          >
            {isPublishing && !isSavedDraftClicked ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="sm:text-base text-xs">
                  {type === "create" ? "Publishing..." : "Updating..."}
                </span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 sm:block hidden" />
                <span className="sm:text-base text-xs">
                  {type === "create" ? "Publish" : "Update"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
