'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Hash, Plus, RefreshCw, Settings2 } from 'lucide-react';

interface GeneratorPanelProps {
  count: number;
  generatedCount: number;
  includeHyphens: boolean;
  isUppercase: boolean;
  onCopyAll: () => void;
  onGenerate: (count: number) => void;
  setCount: (count: number) => void;
  setIncludeHyphens: (enabled: boolean) => void;
  setIsUppercase: (enabled: boolean) => void;
  visibleCount: number;
}

const clampQuantity = (value: number) => Math.min(100, Math.max(1, value));

export const GeneratorPanel: React.FC<GeneratorPanelProps> = ({
  count,
  generatedCount,
  includeHyphens,
  isUppercase,
  onCopyAll,
  onGenerate,
  setCount,
  setIncludeHyphens,
  setIsUppercase,
  visibleCount,
}) => {
  const quickAmounts = [1, 5, 10, 25, 50, 100];

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/75 dark:shadow-black/30 md:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <Settings2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Generation controls
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <label className="space-y-2" htmlFor="count">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Quantity
              </span>
              <div className="relative">
                <Hash className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  id="count"
                  inputMode="numeric"
                  max={100}
                  min={1}
                  type="number"
                  value={count}
                  onChange={(event) => setCount(clampQuantity(Number(event.target.value) || 1))}
                  className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-10 pr-4 text-base font-semibold text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>
            </label>

            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setCount(amount)}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    count === amount
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">Uppercase</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Format displayed IDs in A-F capitals.</span>
              </span>
              <input
                checked={isUppercase}
                onChange={(event) => setIsUppercase(event.target.checked)}
                type="checkbox"
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <span>
                <span className="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">Hyphens</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Keep the canonical 8-4-4-4-12 grouping.</span>
              </span>
              <input
                checked={includeHyphens}
                onChange={(event) => setIncludeHyphens(event.target.checked)}
                type="checkbox"
                className="h-5 w-5 accent-blue-600"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:min-w-64 lg:flex-col">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onGenerate(count)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Generate {count}
          </motion.button>

          <div className="grid grid-cols-2 gap-3 sm:flex-1 lg:flex-none">
            <button
              type="button"
              onClick={() => onGenerate(count)}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              title="Regenerate selected quantity"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              type="button"
              disabled={visibleCount === 0}
              onClick={onCopyAll}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Copy className="h-4 w-4" />
              Copy all
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {generatedCount} generated this session
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
          Showing {visibleCount} matching UUID{visibleCount === 1 ? '' : 's'}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-900">History capped at 100</span>
      </div>
    </div>
  );
};
