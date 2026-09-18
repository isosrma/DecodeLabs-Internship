import React, { useEffect, useState } from 'react';
import {
  Home,
  Users,
  DollarSign,
  Tag,
  FileText,
  ImagePlus,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function CabinForm({
  form,
  cabin,
  onSubmit,
  loading,
  error,
  success,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = form;

  const isEditMode = Boolean(cabin);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const selectedFile = watch('cabinImage');

  // Prefill on edit
  useEffect(() => {
    if (cabin) {
      reset({
        name: cabin.name || '',
        maxCapacity: cabin.maxCapacity || '',
        regularPrice: cabin.regularPrice || '',
        discount: cabin.discount || 0,
        description: cabin.description || '',
      });
      setImagePreview(null);
    } else {
      reset();
    }
  }, [cabin, reset]);

  // Image preview
  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const url = URL.createObjectURL(selectedFile[0]);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  const clearImage = () => {
    setImagePreview(null);
    reset((prev) => ({ ...prev, cabinImage: null }));
  };

  const displayImage = imagePreview || cabin?.image;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* ── Name ─────────────────────────────────────── */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Cabin Name <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <Home
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            {...register('name', { required: 'Cabin name is required' })}
            placeholder="e.g. Mountain View Cabin"
            className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:bg-white transition
              ${
                errors.name
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
                  : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-300'
              }`}
          />
        </div>
        {errors.name && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      {/* ── Capacity + Price row ──────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {/* Max Capacity */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Max Guests
          </label>
          <div className="relative">
            <Users
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="number"
              min={1}
              {...register('maxCapacity', { valueAsNumber: true })}
              placeholder="e.g. 4"
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:bg-white transition
                ${
                  errors.maxCapacity
                    ? 'border-red-300 focus:ring-red-100'
                    : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-300'
                }`}
            />
          </div>
          {errors.maxCapacity && (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.maxCapacity.message}
            </p>
          )}
        </div>

        {/* Regular Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Price / Night
          </label>
          <div className="relative">
            <DollarSign
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="number"
              min={0}
              {...register('regularPrice', { valueAsNumber: true })}
              placeholder="e.g. 2500"
              className={`w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:bg-white transition
                ${
                  errors.regularPrice
                    ? 'border-red-300 focus:ring-red-100'
                    : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-300'
                }`}
            />
          </div>
          {errors.regularPrice && (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertCircle size={12} /> {errors.regularPrice.message}
            </p>
          )}
        </div>
      </div>

      {/* ── Discount ─────────────────────────────────── */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Discount (Rs.)
        </label>
        <div className="relative">
          <Tag
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="number"
            min={0}
            {...register('discount', { valueAsNumber: true })}
            placeholder="e.g. 200  (0 for no discount)"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition"
          />
        </div>
      </div>

      {/* ── Description ──────────────────────────────── */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Description
        </label>
        <div className="relative">
          <FileText
            size={15}
            className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none"
          />
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Describe the cabin — views, amenities, vibe…"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white transition resize-none"
          />
        </div>
      </div>

      {/* ── Image upload ─────────────────────────────── */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Cabin Photo
        </label>

        {displayImage ? (
          /* Image preview */
          <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
            <img
              src={displayImage}
              alt="Cabin preview"
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 transition shadow-sm opacity-0 group-hover:opacity-100"
            >
              <X size={13} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-3 py-2">
              <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                Hover to replace image
              </p>
            </div>
            {/* Hidden file input overlay for replacing */}
            <label className="absolute inset-0 cursor-pointer opacity-0">
              <input
                type="file"
                accept="image/*"
                {...register('cabinImage')}
                className="sr-only"
              />
            </label>
          </div>
        ) : (
          /* Drop zone */
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            className={`flex flex-col items-center justify-center gap-2.5 w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition
              ${
                dragOver
                  ? 'border-indigo-400 bg-indigo-50'
                  : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/50'
              }`}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <ImagePlus size={18} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Drop image or <span className="text-indigo-500">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              {...register('cabinImage')}
              className="sr-only"
            />
          </label>
        )}
      </div>

      {/* ── Feedback messages ─────────────────────────── */}
      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle
            size={15}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
          <CheckCircle2
            size={15}
            className="text-emerald-500 flex-shrink-0 mt-0.5"
          />
          <p className="text-sm text-emerald-600">{success}</p>
        </div>
      )}

      {/* ── Action buttons ────────────────────────────── */}
      <div className="flex gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition active:scale-95"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed
            text-white text-sm font-semibold transition active:scale-95 flex items-center justify-center gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              {isEditMode ? 'Updating…' : 'Creating…'}
            </>
          ) : isEditMode ? (
            'Update Cabin'
          ) : (
            'Create Cabin'
          )}
        </button>
      </div>
    </form>
  );
}
