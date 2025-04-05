"use client";

import React from "react";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-extrabold mb-2 ">Confirm Deletion</h2>
        <p className="text-md text-white/80 mb-6">
          Are you sure you want to delete this item? This action is irreversible.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onclick={onClose}
            extraStyle="text-gray-800 hover:text-gray-600"
            text="Cancel"
            type="button"
            variant="secondry"
          />
          <Button
            onclick={onConfirm}
            text="Delete"
            type="button"
            variant="logout"
          />

        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
