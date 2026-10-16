"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Video,
  BookOpen,
  ClipboardList,
  Play,
  Star,
  User,
  ArrowUpRight
} from "lucide-react";
import { Product, ProductType } from "@/lib/types";
import { VerifiedBadge } from "@/components/shared/VerifiedBadge";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";

const productTypeIcons: Record<ProductType, React.ReactNode> = {
  module: <BookOpen size={28} className="text-[#2E3192] opacity-60" />,
  notes: <FileText size={28} className="text-[#2E3192] opacity-60" />,
  "past-exam": <ClipboardList size={28} className="text-[#2E3192] opacity-60" />,
  "video-lecture": <Video size={28} className="text-[#2E3192] opacity-60" />,
};

const productTypeLabels: Record<ProductType, string> = {
  module: "Module",
  notes: "Notes",
  "past-exam": "Past Exam",
  "video-lecture": "Video Lecture",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const hasImage = product.images && product.images.length > 0;
  const isMine = !!(user && product.seller.id && user.id === product.seller.id);

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.article
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={`bg-white dark:bg-[#18181C] border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 h-full flex flex-col relative shadow-sm hover:shadow-xl hover:shadow-indigo-950/10 dark:hover:shadow-indigo-500/5 ${
          isMine
            ? "border-[#2E3192]/60 ring-2 ring-[#2E3192]/20 dark:ring-[#2E3192]/30 bg-gradient-to-b from-[#2E3192]/[0.03] via-white to-white dark:via-[#18181C] dark:to-[#18181C]"
            : "border-[#E5E5E0] dark:border-[#26282E] hover:border-[#2E3192]/50"
        }`}
      >
        {/* Fixed 16:9 Thumbnail Image Block */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
          {hasImage ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-50/50 dark:bg-gray-800">
              {productTypeIcons[product.productType]}
            </div>
          )}

          {/* Vignette / Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Video play overlay */}
          {product.productType === "video-lecture" && hasImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
                <Play size={16} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
          )}

          {/* Category Pill with Backdrop Blur Overlay */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md bg-black/55 border border-white/20 shadow-xs">
              {productTypeLabels[product.productType]}
            </span>
          </div>

          {/* Top Right: Your Listing (if applicable) - No featured star */}
          {isMine && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold leading-tight bg-[#2E3192] text-white shadow-md border border-indigo-400/30">
                <User size={10} className="text-white" />
                <span>Your Listing</span>
              </span>
            </div>
          )}

          {/* Bottom rating & department overlay */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white/90 z-10 text-[10px] font-medium">
            <span className="truncate max-w-[70%] font-semibold tracking-wide text-white drop-shadow-sm">
              {product.department || product.category}
            </span>
            {product.rating && (
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/10 text-[10px] font-bold flex-shrink-0">
                <Star size={10} fill="currentColor" />
                <span>{product.rating}</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Title - Clean 2-line clamp without purple category tag */}
            <h3 className="text-xs sm:text-[13px] md:text-sm font-bold font-heading text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-[#2E3192] dark:group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h3>
          </div>

          {/* Habesha Student Seller Section */}
          <div className="pt-2.5 border-t border-[#E5E5E0] dark:border-[#26282E]/80 flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              {/* Seller details (No 3 listings / 8 listings box) */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <img
                    src={product.seller.avatar || "/default-avatar.svg"}
                    alt={product.seller.name || product.seller.username}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900/60 shadow-2xs"
                  />
                  {product.seller.isVerified && (
                    <div className="absolute -bottom-1 -right-1">
                      <VerifiedBadge isVerified={true} showText={false} size="sm" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                      {product.seller.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="truncate">@{product.seller.username}</span>
                    {product.seller.university && (
                      <span className="truncate hidden sm:inline text-gray-400 dark:text-gray-500">
                        • {product.seller.university.split("(")[0].trim()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price (NO "Price" label) & Rounded CTA Button */}
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 dark:border-gray-800">
              <span className="text-sm sm:text-base font-extrabold text-[#2E3192] dark:text-indigo-400 font-heading">
                {formatPrice(product.price)}
              </span>

              <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-[#2E3192] text-gray-800 hover:text-white dark:bg-gray-800 dark:hover:bg-indigo-600 dark:text-gray-200 dark:hover:text-white transition-all duration-200 group-hover:bg-[#2E3192] group-hover:text-white">
                <span>View</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
