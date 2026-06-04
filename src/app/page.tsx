'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { UuidCard } from '@/components/UuidCard';
import { GeneratorPanel } from '@/components/GeneratorPanel';
import { Trash2, GitBranch } from 'lucide-react';

export default function Home() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate one initial UUID on mount
    setUuids([uuidv4()]);
  }, []);

  const generateUuids = useCallback((quantity: number) => {
    const newUuids = Array.from({ length: quantity }, () => uuidv4());
    setUuids((prev) => [...newUuids, ...prev].slice(0, 100)); // Keep last 100
  }, []);

  const clearUuids = () => {
    setUuids([]);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-24 space-y-12">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40"
          >
            <span className="text-2xl font-bold text-white">ID</span>
          </motion.div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
              UUID Generator
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md">
              Generate secure, Version 4 Universally Unique Identifiers in an instant.
            </p>
          </div>
        </header>

        {/* Controls */}
        <section className="sticky top-6 z-10">
          <GeneratorPanel
            onGenerate={generateUuids}
            count={count}
            setCount={setCount}
          />
        </section>

        {/* UUID List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              History {uuids.length > 0 && `(${uuids.length})`}
            </h2>
            {uuids.length > 0 && (
              <button
                onClick={clearUuids}
                className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {uuids.map((uuid) => (
                <UuidCard key={uuid} uuid={uuid} />
              ))}
            </AnimatePresence>

            {uuids.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-2xl"
              >
                <p className="text-zinc-400">No UUIDs generated yet.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 transition-colors"
            >
              <GitBranch className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-zinc-400">
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </footer>
      </div>
    </main>
  );
}
