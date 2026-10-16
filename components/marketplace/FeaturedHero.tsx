"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  Layers
} from "lucide-react";
import { Product } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { formatPrice } from "@/lib/utils";

interface FeaturedHeroProps {
  products: Product[];
}

export function FeaturedHero({ products }: FeaturedHeroProps) {
  const featured = React.useMemo(() => {
    const list = products.filter((p) => p.isFeatured);
    if (list.length >= 5) return list;
    return products.slice(0, Math.max(5, products.length));
  }, [products]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  }, [featured.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  }, [featured.length]);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (featured.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [featured.length, isPaused, nextSlide]);

  if (!featured || featured.length === 0) return null;

  const current = featured[currentIndex] || featured[0];
  const bgImage = current.images?.[0] || "";

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-950 text-white shadow-xl border-y border-white/10 select-none transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── HIGH VISIBILITY BACKGROUND IMAGE ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id + "-bg"}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 0.72, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>

      {/* ── SOFT DIAGONAL & HORIZONTAL GRADIENT OVERLAYS (IMAGE REMAINS FULLY VISIBLE) ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/92 via-gray-950/55 to-gray-950/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-transparent to-black/20 pointer-events-none" />

      {/* ── FULL-WIDTH BANNER INNER CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between gap-4">
        
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/25 text-amber-300 border border-amber-400/50 backdrop-blur-md shadow-sm">
              <Sparkles size={12} className="text-amber-400" />
              <span>Featured Material</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/40 text-white border border-white/25 backdrop-blur-md">
              {current.category}
            </span>
            {current.rating && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 text-xs font-bold text-amber-400 border border-white/15 backdrop-blur-sm">
                <Star size={12} fill="currentColor" />
                <span>{current.rating}</span>
                <span className="text-gray-300 font-normal hidden sm:inline">({current.reviewCount || 30} reviews)</span>
              </span>
            )}
          </div>

          {/* Slide counter & pause note */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-gray-200">
            {isPaused && (
              <span className="text-[10px] bg-black/50 border border-white/15 px-2 py-0.5 rounded-full text-gray-200 font-sans">
                Paused
              </span>
            )}
            <span className="text-white">0{currentIndex + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">0{featured.length}</span>
          </div>
        </div>

        {/* Middle: Title, Excerpt, Habesha Student info, and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Left Column: Heading, Description, Seller Details */}
          <div className="lg:col-span-8 space-y-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-title-block"}
                initial={{ opacity: 0, x: direction * 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold font-heading text-white line-clamp-2 leading-snug drop-shadow-md">
                  {current.title}
                </h2>

                <p className="text-gray-200 text-xs sm:text-sm line-clamp-1 max-w-2xl drop-shadow-sm font-medium">
                  {current.description}
                </p>

                {/* Habesha Student Seller Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/25 backdrop-blur-md shadow-md">
                  <div className="relative">
                    <img
                      src={current.seller.avatar || "/default-avatar.svg"}
                      alt={current.seller.name}
                      className="w-7 h-7 rounded-full object-cover border border-white/50"
                    />
                    {current.seller.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <VerifiedBadge isVerified={true} showText={false} size="sm" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-white tracking-wide">
                      {current.seller.name}
                    </span>
                    
                    {current.seller.isVerified ? (
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-sky-500/30 text-sky-200 border border-sky-400/50">
                        Verified Student
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-300">
                        Student
                      </span>
                    )}

                    {current.seller.university && (
                      <span className="text-gray-300 text-[11px] hidden sm:inline">
                        • {current.seller.university.split("(")[0].trim()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Price & Rounded CTA Button */}
          <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/15">
            {/* Price (No 'Student Price' label) */}
            <div className="flex flex-col text-left lg:text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-300 font-heading drop-shadow-sm">
                {formatPrice(current.price)}
              </span>
            </div>

            {/* Rounded CTA Button */}
            <Link
              href={`/product/${current.id}`}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-[#2E3192] to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-indigo-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap border border-white/10"
            >
              <span>Open Material</span>
              <ArrowRight size={16} />
            </Link>

            {/* Next / Prev Rounded Buttons */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
              <button
                onClick={prevSlide}
                aria-label="Previous featured"
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next featured"
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ── 4-SECOND PROGRESS INDICATOR TABS AT BOTTOM ── */}
      <div className="h-1.5 w-full bg-white/20 flex">
        {featured.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              onClick={() => goToSlide(idx)}
              className={`h-full flex-1 transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-amber-400 shadow-sm"
                  : "bg-transparent hover:bg-white/30"
              }`}
              title={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}
