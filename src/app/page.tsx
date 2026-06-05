'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { Database, GitBranch, Search, ShieldCheck, Trash2, WandSparkles, X } from 'lucide-react';
import { GeneratorPanel } from '@/components/GeneratorPanel';
import { UuidCard } from '@/components/UuidCard';

type GeneratedUuid = {
  id: string;
  value: string;
  createdAt: number;
};

const HISTORY_LIMIT = 100;
const STORAGE_KEY = 'uuid-generator-history-v2';

const createUuid = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return uuidv4();
};

const formatUuid = (uuid: string, includeHyphens: boolean, isUppercase: boolean) => {
  const withoutHyphens = includeHyphens ? uuid : uuid.replaceAll('-', '');
  return isUppercase ? withoutHyphens.toUpperCase() : withoutHyphens.toLowerCase();
};

const readStoredUuids = (): GeneratedUuid[] => {
  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedValue) as GeneratedUuid[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => typeof item?.id === 'string' && typeof item?.value === 'string' && typeof item?.createdAt === 'number')
      .slice(0, HISTORY_LIMIT);
  } catch (error) {
    console.warn('Unable to restore UUID history:', error);
    return [];
  }
};

const persistUuids = (uuids: GeneratedUuid[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uuids));
  } catch (error) {
    console.warn('Unable to persist UUID history:', error);
  }
};

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

export default function Home() {
  const [uuids, setUuids] = useState<GeneratedUuid[]>([]);
  const [count, setCount] = useState(1);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [query, setQuery] = useState('');
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [isUppercase, setIsUppercase] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [bulkCopyStatus, setBulkCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    const loadHistory = window.setTimeout(() => {
      setUuids(readStoredUuids());
      setHasLoadedHistory(true);
    }, 0);

    return () => window.clearTimeout(loadHistory);
  }, []);

  useEffect(() => {
    if (hasLoadedHistory) {
      persistUuids(uuids);
    }
  }, [hasLoadedHistory, uuids]);

  const generateUuids = useCallback((quantity: number) => {
    const safeQuantity = Math.min(100, Math.max(1, quantity));
    const now = Date.now();
    const newUuids = Array.from({ length: safeQuantity }, (_, index) => {
      const value = createUuid();
      return {
        id: `${value}-${now}-${index}`,
        value,
        createdAt: now + index,
      };
    });

    setGeneratedCount((current) => current + safeQuantity);
    setUuids((previous) => [...newUuids, ...previous].slice(0, HISTORY_LIMIT));
  }, []);

  const formattedUuids = useMemo(
    () =>
      uuids.map((item) => ({
        ...item,
        formattedValue: formatUuid(item.value, includeHyphens, isUppercase),
      })),
    [includeHyphens, isUppercase, uuids],
  );

  const filteredUuids = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replaceAll('-', '');

    if (!normalizedQuery) {
      return formattedUuids;
    }

    return formattedUuids.filter((item) => item.value.replaceAll('-', '').toLowerCase().includes(normalizedQuery));
  }, [formattedUuids, query]);

  const clearUuids = () => {
    setUuids([]);
    setQuery('');
  };

  const copyVisibleUuids = async () => {
    if (filteredUuids.length === 0) {
      return;
    }

    try {
      await copyText(filteredUuids.map((item) => item.formattedValue).join('\n'));
      setBulkCopyStatus('copied');
      window.setTimeout(() => setBulkCopyStatus('idle'), 1800);
    } catch (error) {
      console.error('Failed to copy UUIDs:', error);
      setBulkCopyStatus('failed');
      window.setTimeout(() => setBulkCopyStatus('idle'), 2200);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eef2ff_100%)] text-zinc-900 selection:bg-blue-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_32%),linear-gradient(180deg,#020617_0%,#09090b_52%,#0f172a_100%)] dark:text-zinc-100 dark:selection:bg-blue-900/50">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 md:px-8 md:py-12">
        <header className="grid gap-8 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-12">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4" />
              Cryptographically strong UUID v4 values
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-zinc-950 dark:text-white md:text-7xl">
                UUIDs that are fast, clean, and ready to ship.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300 md:text-xl">
                Generate batches, keep a searchable local history, copy one or every visible result, and switch formats without regenerating your identifiers.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/30"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Live preview</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Newest generated UUID</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30">
                <WandSparkles className="h-6 w-6" />
              </div>
            </div>
            <code className="mt-5 block break-all rounded-3xl bg-zinc-950 p-5 font-mono text-base font-semibold leading-8 text-blue-100 ring-1 ring-white/10 dark:bg-black/60">
              {formattedUuids[0]?.formattedValue ?? 'Generate a UUID to see it here'}
            </code>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-500/10">
                <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{uuids.length}</p>
                <p className="text-xs font-medium text-blue-700/70 dark:text-blue-200/70">Stored</p>
              </div>
              <div className="rounded-2xl bg-violet-50 p-3 dark:bg-violet-500/10">
                <p className="text-2xl font-black text-violet-700 dark:text-violet-300">{filteredUuids.length}</p>
                <p className="text-xs font-medium text-violet-700/70 dark:text-violet-200/70">Visible</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">v4</p>
                <p className="text-xs font-medium text-emerald-700/70 dark:text-emerald-200/70">Version</p>
              </div>
            </div>
          </motion.div>
        </header>

        <section className="sticky top-4 z-20">
          <GeneratorPanel
            count={count}
            generatedCount={generatedCount}
            includeHyphens={includeHyphens}
            isUppercase={isUppercase}
            onCopyAll={copyVisibleUuids}
            onGenerate={generateUuids}
            setCount={setCount}
            setIncludeHyphens={setIncludeHyphens}
            setIsUppercase={setIsUppercase}
            visibleCount={filteredUuids.length}
          />
        </section>

        <section className="mt-8 flex-1 space-y-5">
          <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-xl shadow-blue-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-black/20 md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search UUID history..."
                className="h-13 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-12 font-medium outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                <Database className="h-4 w-4" />
                History {uuids.length > 0 && `(${uuids.length}/${HISTORY_LIMIT})`}
              </div>
              {uuids.length > 0 && (
                <button
                  onClick={clearUuids}
                  className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {bulkCopyStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ${
                  bulkCopyStatus === 'copied'
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-red-600 text-white shadow-red-600/20'
                }`}
              >
                {bulkCopyStatus === 'copied' ? 'Copied all visible UUIDs to your clipboard.' : 'Unable to copy visible UUIDs.'}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredUuids.map((item, index) => (
                <UuidCard key={item.id} createdAt={item.createdAt} index={index} uuid={item.formattedValue} />
              ))}
            </AnimatePresence>

            {filteredUuids.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[2rem] border-2 border-dashed border-blue-200/80 bg-white/60 px-6 py-20 text-center backdrop-blur dark:border-blue-900/50 dark:bg-zinc-950/40"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Search className="h-6 w-6" />
                </div>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                  {uuids.length === 0 ? 'No UUIDs generated yet.' : 'No matching UUIDs found.'}
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {uuids.length === 0 ? 'Generate a batch to start your local history.' : 'Try another search term or clear the filter.'}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-center gap-4 border-t border-white/70 py-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-semibold text-zinc-600 shadow-sm transition hover:bg-white dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <GitBranch className="h-4 w-4" />
            Built with Next.js, Tailwind CSS, and Framer Motion
          </a>
          <p>Generated values are stored locally in your browser and never sent to a server.</p>
        </footer>
      </div>
    </main>
  );
}
