'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Plus } from 'lucide-react';

interface GeneratorPanelProps {
  onGenerate: (count: number) => void;
  count: number;
  setCount: (count: number) => void;
}

export const GeneratorPanel: React.FC<GeneratorPanelProps> = ({ onGenerate, count, setCount }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <label htmlFor="count" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          Quantity:
        </label>
        <select
          id="count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full md:w-24 px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          {[1, 5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 w-full md:w-auto md:ml-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onGenerate(count)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Generate
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onGenerate(count)}
          className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors"
          title="Refresh List"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
