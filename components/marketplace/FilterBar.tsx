"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronDown,
  Check,
  Sparkles,
  Cpu,
  Briefcase,
  Stethoscope,
  Scale,
  Code2,
  Calculator,
  Palette,
  Atom,
  BookOpen,
  SlidersHorizontal,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterState } from "@/lib/types";
import { CATEGORIES, PRODUCT_TYPES, SORT_OPTIONS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  "Engineering": <Cpu size={13} className="flex-shrink-0" />,
  "Business": <Briefcase size={13} className="flex-shrink-0" />,
  "Medicine": <Stethoscope size={13} className="flex-shrink-0" />,
  "Law": <Scale size={13} className="flex-shrink-0" />,
  "Computer Science": <Code2 size={13} className="flex-shrink-0" />,
  "Mathematics": <Calculator size={13} className="flex-shrink-0" />,
  "Arts & Humanities": <Palette size={13} className="flex-shrink-0" />,
  "Natural Sciences": <Atom size={13} className="flex-shrink-0" />,
};

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const setFilter = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearCategory = () => onChange({ ...filters, category: "" });
  const clearType = () => onChange({ ...filters, productType: "" });

  const activeSortLabel = SORT_OPTIONS.find((s) => s.value === filters.sort)?.label || "Newest First";

  return (
    <div className="space-y-3 py-1">
      {/* ── UPGRADED CATEGORY PILLS BAR WITH THEMED ICONS ─────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 custom-scrollbar scroll-smooth -mx-1 px-1">
        {/* All Categories Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setFilter("category", "")}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 flex-shrink-0 cursor-pointer shadow-xs",
            !filters.category
              ? "bg-gradient-to-r from-indigo-600 via-[#2E3192] to-indigo-700 text-white shadow-md shadow-indigo-600/30 scale-102"
              : "bg-white dark:bg-[#18181C] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-400/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
          )}
        >
          <Sparkles size={13} className={!filters.category ? "text-amber-300" : "text-gray-400"} />
          <span>All Categories</span>
        </motion.button>

        {/* Category Pills with Icons */}
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat;
          const icon = categoryIcons[cat];
          return (
            <motion.button
              key={cat}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter("category", cat)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 flex-shrink-0 cursor-pointer whitespace-nowrap shadow-xs",
                isActive
                  ? "bg-gradient-to-r from-indigo-600 via-[#2E3192] to-indigo-700 text-white shadow-md shadow-indigo-600/30 scale-102"
                  : "bg-white dark:bg-[#18181C] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-400/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
              )}
            >
              <span className={isActive ? "text-white" : "text-gray-500 dark:text-gray-400"}>
                {icon}
              </span>
              <span>{cat}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ── SUB-TYPE, SORT & ACTIVE CHIPS ─────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
        
        {/* Material Type Dropdown (Rounded-Full) */}
        <div className="relative" ref={typeRef}>
          <button
            type="button"
            onClick={() => {
              setTypeOpen((v) => !v);
              setSortOpen(false);
            }}
            className={cn(
              "inline-flex items-center justify-between gap-2 px-4 py-2 text-xs font-bold rounded-full border bg-white dark:bg-[#18181C] text-gray-800 dark:text-gray-200 transition-all duration-200 cursor-pointer shadow-xs",
              typeOpen
                ? "border-[#2E3192] ring-2 ring-[#2E3192]/20"
                : filters.productType
                ? "border-[#2E3192] bg-indigo-50/80 dark:bg-indigo-950/40 text-[#2E3192] dark:text-indigo-300"
                : "border-gray-200 dark:border-gray-800 hover:border-indigo-400/60"
            )}
          >
            <BookOpen size={13} className="text-indigo-600 dark:text-indigo-400" />
            <span className="truncate">
              {filters.productType
                ? PRODUCT_TYPES.find((t) => t.value === filters.productType)?.label || filters.productType
                : "All Material Types"}
            </span>
            <ChevronDown
              size={13}
              className={cn(
                "text-gray-400 transition-transform duration-200 flex-shrink-0",
                typeOpen && "rotate-180 text-[#2E3192]"
              )}
            />
          </button>

          <AnimatePresence>
            {typeOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-[#18181C] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-30 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setFilter("productType", "");
                    setTypeOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2 text-xs text-left transition-colors font-medium cursor-pointer",
                    !filters.productType ? "text-[#2E3192] font-bold bg-indigo-50/80 dark:bg-indigo-950/40" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <span>All Material Types</span>
                  {!filters.productType && <Check size={14} className="text-[#2E3192]" />}
                </button>

                {PRODUCT_TYPES.map((t) => {
                  const selected = filters.productType === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => {
                        setFilter("productType", t.value);
                        setTypeOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2 text-xs text-left transition-colors font-medium cursor-pointer",
                        selected ? "text-[#2E3192] font-bold bg-indigo-50/80 dark:bg-indigo-950/40" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <span>{t.label}</span>
                      {selected && <Check size={14} className="text-[#2E3192]" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Dropdown (Rounded-Full) */}
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => {
              setSortOpen((v) => !v);
              setTypeOpen(false);
            }}
            className={cn(
              "inline-flex items-center justify-between gap-2 px-4 py-2 text-xs font-bold rounded-full border bg-white dark:bg-[#18181C] text-gray-800 dark:text-gray-200 transition-all duration-200 cursor-pointer shadow-xs",
              sortOpen
                ? "border-[#2E3192] ring-2 ring-[#2E3192]/20"
                : "border-gray-200 dark:border-gray-800 hover:border-indigo-400/60"
            )}
          >
            <SlidersHorizontal size={13} className="text-indigo-600 dark:text-indigo-400" />
            <span className="truncate">{activeSortLabel}</span>
            <ChevronDown
              size={13}
              className={cn(
                "text-gray-400 transition-transform duration-200 flex-shrink-0",
                sortOpen && "rotate-180 text-[#2E3192]"
              )}
            />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-[#18181C] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-30 overflow-hidden"
              >
                {SORT_OPTIONS.map((s) => {
                  const selected = filters.sort === s.value;
                  return (
                    <button
                      key={s.value}
                      onClick={() => {
                        setFilter("sort", s.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2 text-xs text-left transition-colors font-medium cursor-pointer",
                        selected ? "text-[#2E3192] font-bold bg-indigo-50/80 dark:bg-indigo-950/40" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <span>{s.label}</span>
                      {selected && <Check size={14} className="text-[#2E3192]" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active filter dismissible chips */}
        {filters.category && (
          <ActiveChip label={filters.category} onClear={clearCategory} />
        )}
        {filters.productType && (
          <ActiveChip
            label={PRODUCT_TYPES.find((t) => t.value === filters.productType)?.label ?? filters.productType}
            onClear={clearType}
          />
        )}
      </div>
    </div>
  );
}

function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#2E3192] dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs"
    >
      <span>{label}</span>
      <button
        type="button"
        onClick={onClear}
        className="p-0.5 rounded-full hover:bg-indigo-200/50 dark:hover:bg-indigo-800/50 transition-colors cursor-pointer"
        aria-label={`Remove ${label} filter`}
      >
        <X size={12} className="text-[#2E3192] dark:text-indigo-300" />
      </button>
    </motion.span>
  );
}
