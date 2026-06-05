'use client';

import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Check,
  Copy,
  FileCode2,
  Fingerprint,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const createUuid = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return uuidv4();
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

const docExamples = [
  {
    label: 'JavaScript',
    code: 'const id = crypto.randomUUID();',
  },
  {
    label: 'SQL primary key',
    code: 'id UUID PRIMARY KEY DEFAULT gen_random_uuid()',
  },
  {
    label: 'API response',
    code: '{ "requestId": "9f1c3d2e-8a74-4b20-9f3c-2b91d5a0c7e8" }',
  },
];

const uuidUseCases = ['Database records', 'Request tracing', 'Session identifiers', 'Distributed systems'];

export default function Home() {
  const [uuid, setUuid] = useState(createUuid);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const generateUuid = useCallback(() => {
    setUuid(createUuid());
    setCopyStatus('idle');
  }, []);

  const copyUuid = async () => {
    if (!uuid) {
      return;
    }

    try {
      await copyText(uuid);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
    } catch (error) {
      console.error('Failed to copy UUID:', error);
      setCopyStatus('failed');
      window.setTimeout(() => setCopyStatus('idle'), 2200);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#eef2ff_100%)] text-zinc-900 selection:bg-blue-100 dark:bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.25),transparent_32%),linear-gradient(180deg,#020617_0%,#09090b_52%,#0f172a_100%)] dark:text-zinc-100 dark:selection:bg-blue-900/50">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/20" />
      <div className="pointer-events-none absolute bottom-20 left-[-8rem] h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-600/20" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 md:px-8 md:py-12">
        <nav className="mb-14 flex items-center justify-between gap-4">
          <a href="#generator" className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/75 px-4 py-2 font-black shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Fingerprint className="h-5 w-5" />
            </span>
            UUID Studio
          </a>
          <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/65 p-1 text-sm font-semibold shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 sm:flex">
            <a href="#about" className="rounded-full px-4 py-2 text-zinc-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-zinc-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
              What is UUID?
            </a>
            <a href="#docs" className="rounded-full px-4 py-2 text-zinc-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-zinc-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
              Documentation
            </a>
          </div>
        </nav>

        <section id="generator" className="grid gap-10 pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
              <ShieldCheck className="h-4 w-4" />
              Secure online UUID v4 generator
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-zinc-950 dark:text-white md:text-7xl">
                One UUID. Tap to copy. Ship faster.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300 md:text-xl">
                Generate a fresh Version 4 UUID with a focused Kinde-style flow, no saved history, and a polished interface that keeps this project&apos;s blue glass design system.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#generator-card" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-700">
                Generate now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#docs" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white/80 px-6 font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200 dark:hover:border-blue-900 dark:hover:bg-blue-500/10 dark:hover:text-blue-300">
                Read docs
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.section
            id="generator-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/75 dark:shadow-black/30 md:p-6"
            aria-label="UUID generator"
          >
            <div className="mb-5 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Generator</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Click the UUID card to copy it.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <button
              type="button"
              onClick={copyUuid}
              className="group relative block w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 p-5 text-left shadow-inner ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-black/60 dark:hover:border-blue-900"
              aria-label="Copy generated UUID"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-violet-500" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <code className="break-all pl-2 font-mono text-lg font-semibold leading-8 text-blue-100 md:text-2xl">
                  {uuid || 'Generating UUID...'}
                </code>
                <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-blue-500">
                  {copyStatus === 'copied' ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                  {copyStatus === 'copied' ? 'Copied' : 'Copy'}
                </span>
              </div>
            </button>

            <AnimatePresence>
              {copyStatus === 'failed' && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20"
                >
                  Unable to copy this UUID. Please select it manually.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateUuid}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Generate
              </motion.button>
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                <KeyRound className="h-4 w-4" />
                Version 4
              </div>
            </div>
          </motion.section>
        </section>

        <section id="about" className="grid gap-6 border-t border-white/70 py-16 dark:border-white/10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">What is UUID?</p>
            <h2 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white md:text-5xl">A unique identifier for distributed software.</h2>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl shadow-blue-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-black/20">
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                A UUID, or Universally Unique Identifier, is a 128-bit value formatted as five groups of hexadecimal characters. Version 4 UUIDs are randomly generated, which makes them a practical default for creating unique IDs without asking a central server for the next number.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {uuidUseCases.map((item) => (
                <div key={item} className="rounded-3xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/55">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="docs" className="border-t border-white/70 py-16 dark:border-white/10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">Documentation</p>
              <h2 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white md:text-5xl">Use generated UUIDs anywhere.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Copy the current UUID directly from the generator card, then paste it into application code, a database migration, or an API payload.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {docExamples.map((example) => (
              <article key={example.label} className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-black/20">
                <div className="mb-4 flex items-center gap-3 text-sm font-bold text-zinc-700 dark:text-zinc-200">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                    <FileCode2 className="h-5 w-5" />
                  </span>
                  {example.label}
                </div>
                <code className="block min-h-28 break-all rounded-3xl bg-zinc-950 p-4 font-mono text-sm font-semibold leading-7 text-blue-100 ring-1 ring-white/10 dark:bg-black/60">
                  {example.code}
                </code>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-auto flex flex-col items-center gap-3 border-t border-white/70 py-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          <p className="font-semibold text-zinc-600 dark:text-zinc-300">Built with Next.js, Tailwind CSS, and Framer Motion.</p>
          <p>No UUID history is saved by this interface; generated values stay in the current page state only.</p>
        </footer>
      </div>
    </main>
  );
}
