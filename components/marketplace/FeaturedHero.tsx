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
  Layers,
  BookOpen
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
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0c0e17] text-white shadow-xl shadow-indigo-950/20 border border-white/10 select-none transition-all my-3 sm:my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── LOW OPACITY BACKGROUND IMAGE ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>

      {/* ── GRADIENTS FOR HIGH CONTRAST & SLIM LOOK ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e17] via-[#0c0e17]/95 to-[#0c0e17]/80 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#2E3192]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

      {/* ── COMPACT HORIZONTAL BANNER CONTENT ── */}
      <div className="relative z-10 px-4 py-3 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Side: Meta tags, Title, and Habesha Student Seller info */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-content"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5"
            >
              {/* Badges row */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  <Sparkles size={11} className="text-amber-400" />
                  <span>Featured Material</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-gray-200 border border-white/15">
                  {current.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {current.productType}
                </span>
                {current.rating && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                    <Star size={11} fill="currentColor" />
                    <span>{current.rating}</span>
                  </span>
                )}
                <span className="text-[10px] text-gray-400 font-mono ml-auto md:ml-0">
                  0{currentIndex + 1} / 0{featured.length}
                </span>
              </div>

              {/* Title: 1 clean bold line */}
              <h2 className="text-sm sm:text-base md:text-lg font-bold font-heading text-white truncate max-w-2xl leading-snug">
                {current.title}
              </h2>

              {/* Habesha Student Seller Row */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <img
                      src={current.seller.avatar || "/default-avatar.svg"}
                      alt={current.seller.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-indigo-400"
                    />
                    {current.seller.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <VerifiedBadge isVerified={true} showText={false} size="sm" />
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-gray-200 text-xs">
                    {current.seller.name}
                  </span>
                  {current.seller.isVerified ? (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-sky-500/20 text-sky-300">
                      Verified
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400">
                      Student
                    </span>
                  )}
                </div>

                {current.seller.university && (
                  <span className="text-gray-400 text-[11px] hidden sm:inline">
                    • {current.seller.university.split("(")[0].trim()}
                  </span>
                )}

                {current.seller.listingsCount && current.seller.listingsCount > 1 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                    <Layers size={10} />
                    <span>{current.seller.listingsCount} listings</span>
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Price, CTA, Carousel Controls in a compact row */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 flex-shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-white/10">
          {/* Price */}
          <div className="text-left md:text-right">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block leading-none">Price</span>
            <span className="text-base sm:text-lg font-extrabold text-amber-300 font-heading">
              {formatPrice(current.price)}
            </span>
          </div>

          {/* Rounded CTA Button to open product */}
          <Link
            href={`/product/${current.id}`}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-[#2E3192] to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Open Material</span>
            <ArrowRight size={14} />
          </Link>

          {/* Mini Nav Controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-white/15">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Slim 4-second progress indicator bar at the bottom */}
      <div className="h-1 w-full bg-white/10 flex">
        {featured.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => goToSlide(idx)}
            className={`h-full flex-1 transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? "bg-indigo-500"
                : "bg-transparent hover:bg-white/20"
            }`}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
}
