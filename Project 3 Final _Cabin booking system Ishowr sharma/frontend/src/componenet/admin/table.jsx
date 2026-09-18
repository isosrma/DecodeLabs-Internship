// src/components/admin/ReusableTable.jsx
import React, { useState } from 'react';
import { Edit2, Trash2, Eye, SearchX, Database } from 'lucide-react';

const ReusableTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = 'No records found',
  actions = true,
  showView = false,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
            <div className="h-5 w-32 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="divide-y divide-gray-50">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div
                className="h-3 bg-gray-100 rounded-full animate-pulse"
                style={{ width: `${40 + i * 10}%` }}
              />
              <div className="h-3 bg-gray-100 rounded-full animate-pulse w-1/4 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Database size={14} className="text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {data?.length || 0} {data?.length === 1 ? 'record' : 'records'}
            </p>
          </div>
        </div>

        {/* Count pill */}
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600">
          {data?.length || 0} total
        </span>
      </div>

      {/* ── Table ──────────────────────────────────────────────── */}
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {/* Row number */}
                <th className="pl-6 pr-3 py-3.5 text-left w-10">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    #
                  </span>
                </th>

                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.header}
                  </th>
                ))}

                {actions && (
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-colors duration-150 ${
                    hoveredRow === rowIndex ? 'bg-indigo-50/40' : 'bg-white'
                  }`}
                >
                  {/* Row number */}
                  <td className="pl-6 pr-3 py-4">
                    <span className="text-xs font-medium text-gray-300 tabular-nums">
                      {String(rowIndex + 1).padStart(2, '0')}
                    </span>
                  </td>

                  {columns.map((col, colIndex) => {
                    const value = col.accessor
                      ? col.accessor
                          .split('.')
                          .reduce((obj, key) => obj?.[key], row)
                      : col.render
                        ? null
                        : row[col.key];

                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-4 text-sm text-gray-700 align-middle"
                      >
                        {col.render ? (
                          col.render(row)
                        ) : value !== undefined &&
                          value !== null &&
                          value !== '' ? (
                          <span className="leading-tight">{value}</span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                    );
                  })}

                  {/* Action Buttons */}
                  {actions && (
                    <td className="px-4 py-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-1">
                        {showView && onView && (
                          <button
                            onClick={() => onView(row)}
                            title="View"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                              text-blue-600 bg-blue-50 border border-blue-100
                              hover:bg-blue-100 hover:border-blue-200
                              transition-all duration-150 active:scale-95"
                          >
                            <Eye size={13} />
                            View
                          </button>
                        )}

                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            title="Edit"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                              text-emerald-600 bg-emerald-50 border border-emerald-100
                              hover:bg-emerald-100 hover:border-emerald-200
                              transition-all duration-150 active:scale-95"
                          >
                            <Edit2 size={13} />
                            Edit
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            title="Delete"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                              text-red-500 bg-red-50 border border-red-100
                              hover:bg-red-100 hover:border-red-200
                              transition-all duration-150 active:scale-95"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* ── Empty State ──────────────────────────────────────── */
        <div className="py-20 flex flex-col items-center gap-4 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <SearchX size={24} className="text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{emptyMessage}</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your filters or add new records.
            </p>
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────── */}
      {data && data.length > 0 && (
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing{' '}
            <span className="font-medium text-gray-600">{data.length}</span>{' '}
            {data.length === 1 ? 'entry' : 'entries'}
          </p>
          <div className="flex items-center gap-1.5">
            {[...Array(Math.min(3, Math.ceil(data.length / 10)))].map(
              (_, i) => (
                <button
                  key={i}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                    i === 0
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-500 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  {i + 1}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
