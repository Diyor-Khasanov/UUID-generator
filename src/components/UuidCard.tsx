'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface UuidCardProps {
  uuid: string;
}

export const UuidCard: React.FC<UuidCardProps> = ({ uuid }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <code className="text-sm md:text-base font-mono text-zinc-800 dark:text-zinc-200 truncate pr-4">
        {uuid}
      </code>

      <button
        onClick={copyToClipboard}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        aria-label="Copy UUID"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Copy className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: -20, x: '-50%' }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 bottom-full mb-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded pointer-events-none"
        >
          Copied!
        </motion.span>
      )}
    </motion.div>
  );
};
