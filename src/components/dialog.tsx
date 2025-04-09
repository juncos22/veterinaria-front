import React from "react";

type DialogComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactElement;
};

export const DialogComponent = ({
  isOpen,
  onClose,
  title,
  children,
}: DialogComponentProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-90">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Content */}
        <div className="text-gray-600 mb-4">{children}</div>

        {/* Action Buttons
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div> */}
      </div>
    </div>
  );
};
