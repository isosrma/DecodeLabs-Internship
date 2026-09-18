import React, { useState } from 'react';
import {
  Search,
  Plus,
  RefreshCw,
  X,
  ArrowUpDown,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { useCabins } from '../../../services/query/cabin.query';
import { useCabin } from '../../../services/mutations/cabin.mutations';
import CabinForm from './form';
import ReusableTable from '../../../componenet/admin/table';

const SORT_OPTIONS = [
  { label: 'Newest first', sortBy: 'createdAt', order: 'desc' },
  { label: 'Oldest first', sortBy: 'createdAt', order: 'asc' },
  { label: 'Price: low→high', sortBy: 'regularPrice', order: 'asc' },
  { label: 'Price: high→low', sortBy: 'regularPrice', order: 'desc' },
  { label: 'Name: A→Z', sortBy: 'name', order: 'asc' },
  { label: 'Name: Z→A', sortBy: 'name', order: 'desc' },
];

const CAPACITY_OPTIONS = [
  { label: 'Any capacity', value: '' },
  { label: '1–2 guests', value: '1-2' },
  { label: '3–4 guests', value: '3-4' },
  { label: '5–8 guests', value: '5-8' },
  { label: '9+ guests', value: '9-999' },
];

const CabinsAdminPage = () => {
  const {
    cabins,
    pagination,
    loading,
    error,
    refetch,
    goToPage,
    updateFilters,
    currentFilters,
  } = useCabins();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCabin, setEditingCabin] = useState(null);
  const [localSearch, setLocalSearch] = useState(currentFilters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const {
    form,
    createCabin,
    updateCabin,
    deleteCabin,
    loading: mutationLoading,
    error: mutationError,
    success,
    resetForm,
  } = useCabin();

  // ── Helpers ───────────────────────────────────────────────
  const currentSort =
    SORT_OPTIONS.find(
      (o) =>
        o.sortBy === currentFilters.sortBy && o.order === currentFilters.order,
    ) || SORT_OPTIONS[0];

  const hasActiveFilters =
    currentFilters.search ||
    currentFilters.minPrice > 0 ||
    currentFilters.maxCapacity;

  // ── Filter handlers ───────────────────────────────────────
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: localSearch });
  };

  const handleSearchClear = () => {
    setLocalSearch('');
    updateFilters({ search: '' });
  };

  const handleMinPrice = (e) => {
    updateFilters({ minPrice: e.target.value });
  };

  const handleCapacity = (value) => {
    updateFilters({ maxCapacity: value });
  };

  const handleSort = (option) => {
    updateFilters({ sortBy: option.sortBy, order: option.order });
  };

  const handleClearAll = () => {
    setLocalSearch('');
    updateFilters({
      search: '',
      minPrice: '',
      maxCapacity: '',
      sortBy: 'createdAt',
      order: 'desc',
    });
  };

  // ── Modal / CRUD ──────────────────────────────────────────
  const handleAddNew = () => {
    setEditingCabin(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (cabin) => {
    setEditingCabin(cabin);
    setIsModalOpen(true);
  };

  const handleDelete = async (cabin) => {
    if (!window.confirm(`Delete "${cabin.name}"?`)) return;
    try {
      await deleteCabin(cabin.id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (editingCabin) await updateCabin(editingCabin.id, form.getValues());
      else await createCabin(form.getValues());
      setIsModalOpen(false);
      resetForm();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCabin(null);
    resetForm();
  };

  // ── Columns ───────────────────────────────────────────────
  const columns = [
    {
      header: 'Cabin',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              className="w-9 h-9 rounded-lg object-cover border border-gray-100 shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-indigo-400 text-xs font-bold">
                {row.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-sm font-semibold text-gray-800">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Capacity',
      key: 'maxCapacity',
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
          👥 {row.maxCapacity} guests
        </span>
      ),
    },
    {
      header: 'Regular Price',
      key: 'regularPrice',
      render: (row) => (
        <span className="text-sm font-bold text-gray-900">
          Rs. {row.regularPrice?.toLocaleString() ?? 0}
        </span>
      ),
    },
    {
      header: 'Discount',
      key: 'discount',
      render: (row) =>
        row.discount > 0 ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-600">
            − Rs. {row.discount?.toLocaleString()}
          </span>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        ),
    },
    {
      header: 'Description',
      key: 'description',
      render: (row) => (
        <span className="text-xs text-gray-400 line-clamp-1 max-w-[180px]">
          {row.description || '—'}
        </span>
      ),
    },
    {
      header: 'Added',
      key: 'createdAt',
      render: (row) => (
        <span className="text-xs text-gray-400">
          {new Date(row.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  // ── Pagination ────────────────────────────────────────────
  const getPageNumbers = () => {
    const pages = [];
    const { page, totalPages } = pagination;
    const delta = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (i === page - delta - 1 || i === page + delta + 1) {
        pages.push('...');
      }
    }
    return pages;
  };

  // ── Error state ───────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-16 gap-4">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <span className="text-red-500 text-xl font-bold">!</span>
        </div>
        <p className="text-red-500 font-medium text-sm">{error}</p>
        <button
          onClick={refetch}
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Cabins Management
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {pagination.totalCabins ?? 0} total cabins
            {hasActiveFilters && (
              <span className="ml-1 text-indigo-500 font-medium">
                (filtered)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={refetch}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition active:scale-95 shadow-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition active:scale-95 shadow-sm"
          >
            <Plus size={16} />
            Add Cabin
          </button>
        </div>
      </div>

      {/* ── Search + Filter Bar ───────────────────────────── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 min-w-0 flex gap-2"
          >
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search cabins by name…"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition active:scale-95 flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer text-sm text-gray-600 hover:border-indigo-300 transition group">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={`${currentFilters.sortBy}-${currentFilters.order}`}
                onChange={(e) => {
                  const [sortBy, order] = e.target.value.split('-');
                  handleSort({ sortBy, order });
                }}
                className="bg-transparent border-none outline-none text-sm text-gray-700 cursor-pointer appearance-none pr-5"
              >
                {SORT_OPTIONS.map((o) => (
                  <option
                    key={`${o.sortBy}-${o.order}`}
                    value={`${o.sortBy}-${o.order}`}
                  >
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="text-gray-400 pointer-events-none absolute right-3"
              />
            </div>
          </div>

          {/* Toggle advanced filters */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition flex-shrink-0 ${
              showFilters
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-200 hover:text-indigo-600'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition flex-shrink-0"
            >
              <X size={13} />
              Clear all
            </button>
          )}
        </div>

        {/* Advanced filters panel */}
        {showFilters && (
          <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Min price */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Min price (Rs.)
              </label>
              <input
                type="number"
                min={0}
                defaultValue={currentFilters.minPrice || ''}
                onBlur={handleMinPrice}
                placeholder="e.g. 1000"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition"
              />
              <p className="text-xs text-gray-400">
                Only show cabins priced above this amount
              </p>
            </div>

            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Guest capacity
              </label>
              <div className="flex flex-wrap gap-2">
                {CAPACITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleCapacity(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      currentFilters.maxCapacity === opt.value ||
                      (!currentFilters.maxCapacity && opt.value === '')
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Table ─────────────────────────────────────────── */}
      <ReusableTable
        title="All Cabins"
        columns={columns}
        data={cabins}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage={
          hasActiveFilters
            ? 'No cabins match your filters.'
            : 'No cabins found. Add your first cabin!'
        }
      />

      {/* ── Pagination ────────────────────────────────────── */}
      {pagination.totalPages > 1 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Page{' '}
            <span className="font-semibold text-gray-700">
              {pagination.page}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-gray-700">
              {pagination.totalPages}
            </span>{' '}
            ·{' '}
            <span className="font-semibold text-gray-700">
              {pagination.totalCabins}
            </span>{' '}
            cabins
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`e-${i}`} className="px-2 text-gray-300 text-sm">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold border transition-all ${
                    p === pagination.page
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              onClick={() => goToPage(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-100 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {editingCabin ? 'Edit cabin' : 'Add new cabin'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingCabin
                    ? `Editing: ${editingCabin.name}`
                    : 'Fill in the cabin details below'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-5">
              <CabinForm
                form={form}
                cabin={editingCabin}
                isEditMode={!!editingCabin}
                existingImage={editingCabin?.image}
                onSubmit={handleFormSubmit}
                loading={mutationLoading}
                error={mutationError}
                success={success}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabinsAdminPage;
