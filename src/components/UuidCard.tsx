'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Fingerprint, Sparkles } from 'lucide-react';

interface UuidCardProps {
  createdAt: number;
  index: number;
  uuid: string;
}

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

export const UuidCard: React.FC<UuidCardProps> = ({ createdAt, index, uuid }) => {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyToClipboard = async () => {
    try {
      await copyText(uuid);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Failed to copy UUID:', err);
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2200);
    }
  };

  const timestamp = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(createdAt);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-blue-900/70 dark:hover:shadow-black/30"
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500 opacity-70" />
      <div className="flex items-start gap-4 pl-2">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20 sm:flex">
          {index === 0 ? <Sparkles className="h-5 w-5" /> : <Fingerprint className="h-5 w-5" />}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-900">#{index + 1}</span>
            {index === 0 && (
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                Newest
              </span>
            )}
            <time dateTime={new Date(createdAt).toISOString()}>Generated at {timestamp}</time>
          </div>
          <code className="block break-all font-mono text-sm font-semibold leading-7 text-zinc-900 dark:text-zinc-100 md:text-base">
            {uuid}
          </code>
        </div>

        <button
          onClick={copyToClipboard}
          className="relative shrink-0 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
          aria-label={`Copy UUID ${uuid}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <Check className="h-5 w-5 text-emerald-500" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <Copy className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {(copied || copyFailed) && (
          <motion.span
            initial={{ opacity: 0, y: 8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 8, x: '-50%' }}
            className={`absolute bottom-3 left-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg ${
              copyFailed ? 'bg-red-600' : 'bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-950'
            }`}
          >
            {copyFailed ? 'Copy failed' : 'Copied!'}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
