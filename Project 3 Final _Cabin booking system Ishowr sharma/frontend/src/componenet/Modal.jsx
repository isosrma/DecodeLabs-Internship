import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title || 'Confirm Action'}</h3>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-700 dark:text-gray-200">
          {message || 'Are you sure you want to continue?'}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
