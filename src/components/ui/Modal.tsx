import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/utils/shadcn/utils";
import { tripData } from "@/lib/schemas/trip";
interface ConfirmationModalProps {
  data: tripData["waypoints"],
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: tripData["waypoints"]) => Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  data,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#F5F5F5] border-[#0077B6]/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#003366] text-xl font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#4F4F4F] text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            className={cn(
              "border-[#0077B6]/20 text-[#4F4F4F] hover:bg-[#0077B6]/5",
              "transition-all duration-200 ease-in-out"
            )}
            onClick={onClose}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "bg-[#0077B6] hover:bg-[#003366]",
              "transition-all duration-200 ease-in-out"
            )}
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationModal;