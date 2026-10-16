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
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Eye
} from "lucide-react";
import { Product } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { formatPrice } from "@/lib/utils";

interface FeaturedHeroProps {
  products: Product[];
  onScrollToMaterials?: () => void;
}

export function FeaturedHero({ products, onScrollToMaterials }: FeaturedHeroProps) {
  // Filter for featured items or take top items to guarantee at least 5
  const featured = React.useMemo(() => {
    const list = products.filter((p) => p.isFeatured);
    if (list.length >= 5) return list;
    // Fall back to all products if fewer than 5 flagged as featured
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

  // 4-second auto slide interval
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
      className="relative w-full mb-10 overflow-hidden rounded-3xl sm:rounded-[32px] bg-[#0c0e17] text-white shadow-2xl shadow-indigo-950/20 border border-white/10 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── BACKGROUND IMAGE (LOW OPACITY AS REQUESTED) ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.id + "-bg"}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.22, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </AnimatePresence>

      {/* ── GRADIENT OVERLAYS FOR MAXIMUM READABILITY ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e17] via-[#0c0e17]/90 to-[#0c0e17]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-transparent to-[#0c0e17]/40 pointer-events-none" />
      
      {/* Decorative ambient glowing circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2E3192]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* ── HERO CONTENT WRAPPER ── */}
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14 min-h-[480px] sm:min-h-[500px] flex flex-col justify-between">
        
        {/* Top bar: Badge & Slide counter */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-xs">
              <Sparkles size={13} className="text-amber-400" />
              <span>Featured Academic Material</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-gray-200 border border-white/15 backdrop-blur-md">
              <BookOpen size={12} className="text-indigo-300" />
              <span>{current.category}</span>
            </span>
            {isPaused && (
              <span className="text-[11px] text-gray-400 bg-black/40 px-2 py-0.5 rounded-full">
                Paused
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400">
              <span className="text-white">0{currentIndex + 1}</span> / 0{featured.length}
            </span>
          </div>
        </div>

        {/* Middle: Content Grid (Text + Habesha Seller Spotlight & Preview Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column: Heading, Description, Habesha Student info, CTA */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-info"}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    {current.productType}
                  </span>
                  {current.rating && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Star size={13} fill="currentColor" />
                      <span>{current.rating}</span>
                      <span className="text-gray-400 font-normal">({current.reviewCount || 24} reviews)</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
                  {current.title}
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-2xl font-normal">
                  {current.description}
                </p>

                {/* Habesha Student Seller Spotlight Card */}
                <div className="inline-flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md max-w-md shadow-lg">
                  <div className="relative">
                    <img
                      src={current.seller.avatar || "/default-avatar.svg"}
                      alt={current.seller.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
                    />
                    {current.seller.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                        <VerifiedBadge isVerified={true} showText={false} size="sm" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-bold text-white tracking-wide">
                        {current.seller.name}
                      </span>
                      {current.seller.isVerified ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          Verified Student
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-500/20 text-gray-300 border border-gray-400/20">
                          Student
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-300 mt-0.5">
                      <span className="text-indigo-300 truncate">@{current.seller.username}</span>
                      {current.seller.university && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-300 truncate text-[11px]">
                            {current.seller.university}
                          </span>
                        </>
                      )}
                    </div>

                    {current.seller.listingsCount && current.seller.listingsCount > 1 && (
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                        <Layers size={11} />
                        <span>{current.seller.listingsCount} active listings available</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Price and CTA Buttons (Rounded as requested) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex flex-col pr-2 border-r border-white/15">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Investment</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading">
                  {formatPrice(current.price)}
                </span>
              </div>

              {/* Primary CTA Button: Rounded, opens the item */}
              <Link
                href={`/product/${current.id}`}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-[#2E3192] to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Open Material</span>
                <ArrowRight size={17} />
              </Link>

              {/* Secondary CTA: Rounded button */}
              {onScrollToMaterials && (
                <button
                  type="button"
                  onClick={onScrollToMaterials}
                  className="px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/15 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <Eye size={15} />
                  <span>Browse All</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Floating 3D Preview Card with Rounded Corners */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-card"}
                initial={{ opacity: 0, y: 20, rotate: 1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -20, rotate: -1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-sm rounded-3xl overflow-hidden bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-3.5 group relative"
              >
                <Link href={`/product/${current.id}`} className="block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={bgImage}
                      alt={current.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#2E3192] text-white shadow-md border border-indigo-400/40">
                        {formatPrice(current.price)}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs text-white">
                      <p className="font-bold truncate">{current.title}</p>
                      <p className="text-[11px] text-gray-300">{current.category} • {current.seller.name}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-300 px-1">
                    <span className="flex items-center gap-1 font-semibold text-amber-300">
                      <Star size={13} fill="currentColor" /> {current.rating || 4.9} rating
                    </span>
                    <span className="text-indigo-300 font-bold hover:underline flex items-center gap-1">
                      Click to explore <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom controls: 4-second indicator dots & Prev/Next buttons */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10 mt-6">
          
          {/* Indicator dots for the 5+ featured items */}
          <div className="flex items-center gap-2">
            {featured.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 sm:w-10 bg-indigo-500 shadow-md shadow-indigo-500/50"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Go to featured slide ${idx + 1}`}
                  title={item.title}
                />
              );
            })}
          </div>

          {/* Prev / Next Rounded Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous featured listing"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next featured listing"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
