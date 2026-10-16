"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, BookOpen, Shield, RefreshCw, XCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterBar } from "@/components/marketplace/FilterBar";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductCardSkeleton } from "@/components/marketplace/ProductCardSkeleton";
import { FeaturedHero } from "@/components/marketplace/FeaturedHero";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import { FilterState, Product } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const PAGE_SIZE = 8;
const API = API_BASE_URL;

/** Normalise a backend product into the Product shape ProductCard expects */
function normalise(p: any): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description ?? "",
    price: p.price,
    status: p.status,
    category: p.category?.name ?? "",
    productType: p.productType?.name ?? "",
    images: (p.images ?? []).map((img: any) => (typeof img === "string" ? img : img.image_url)),
    isFeatured: p.isFeatured ?? false,
    createdAt: p.created_at || new Date().toISOString(),
    rating: p.rating ?? 4.9,
    reviewCount: p.reviewCount ?? 32,
    department: p.department,
    seller: {
      id: p.seller?.id ?? "s1",
      name: p.seller?.profile?.name || p.seller?.name || "Student",
      username: p.seller?.profile?.username || p.seller?.username || "student",
      avatar: p.seller?.profile?.avatar_url || p.seller?.avatar || "/default-avatar.svg",
      isVerified: p.seller?.profile?.is_verified ?? p.seller?.isVerified ?? false,
      email: p.seller?.email ?? "",
      bio: p.seller?.profile?.bio ?? "",
      role: (p.seller?.role as any) ?? "student",
      university: p.seller?.university,
      listingsCount: p.seller?.listingsCount ?? 2,
      memberSince: p.seller?.created_at ?? "2024",
    },
  };
}

/** Filter mock products client-side when backend is offline */
function filterMockProducts(f: FilterState): Product[] {
  return MOCK_PRODUCTS.filter((p) => {
    if (f.search) {
      const q = f.search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchSeller =
        p.seller.name.toLowerCase().includes(q) ||
        p.seller.username.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSeller && !matchCategory) return false;
    }
    if (f.category && p.category !== f.category) return false;
    if (f.productType && p.productType !== f.productType) return false;
    return true;
  });
}

function MarketplaceFeedInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { darkMode, toggleDark } = useTheme();
  const { user, isLoading } = useAuth();

  // Redirect admin directly to overview
  useEffect(() => {
    if (!isLoading && user && user.role === "admin") {
      router.replace("/admin/overview");
    }
  }, [user, isLoading, router]);

  const [filters, setFilters] = useState<FilterState>({
    category: (searchParams.get("category") as FilterState["category"]) || "",
    productType: "",
    sort: "newest",
    search: searchParams.get("search") || "",
  });
  const [searchInput, setSearchInput] = useState(filters.search);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch from backend, gracefully fallback to MOCK_PRODUCTS if offline or empty
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: "approved" });
      if (filters.search) params.set("search", filters.search);
      if (filters.category) params.set("category_name", filters.category);
      if (filters.productType) params.set("product_type_name", filters.productType);

      const res = await fetch(`${API}/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(normalise));
        } else {
          // If live backend has no products yet, use realistic mock data
          setProducts(filterMockProducts(filters));
        }
      } else {
        // Backend offline or error -> Fallback to mock data
        setProducts(filterMockProducts(filters));
      }
    } catch (err) {
      // Backend not running on local/Vercel -> Fallback to mock data
      setProducts(filterMockProducts(filters));
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.category, filters.productType]);

  useEffect(() => {
    fetchProducts();
    setPage(1);
  }, [fetchProducts]);

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setFilters((f) => ({ ...f, search: query }));
  };

  // Client-side sort with user's own listings prioritized at top
  const sorted = useMemo(() => {
    let list = [...products];

    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    if (user?.id) {
      list.sort((a, b) => {
        const isMineA = a.seller?.id === user.id ? 1 : 0;
        const isMineB = b.seller?.id === user.id ? 1 : 0;
        return isMineB - isMineA;
      });
    }

    return list;
  }, [products, filters.sort, user?.id]);

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const scrollToMaterials = () => {
    const el = document.getElementById("materials-feed");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading || (user && user.role === "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF5] dark:bg-[#18181C]">
        <Spinner size="lg" className="text-[#2E3192]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF5] dark:bg-[#18181C] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        onSearch={handleSearch}
        searchValue={searchInput}
        darkMode={darkMode}
        toggleDark={toggleDark}
      />

      <main className="flex-1">
        {/* Subtle Academic Trust Banner */}
        <div className="bg-[#2E3192]/5 border-b border-[#2E3192]/10 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-semibold text-[#2E3192] dark:text-indigo-300">
            <Shield size={14} className="text-[#2E3192] dark:text-indigo-400" />
            <span>Peer-to-peer university academic marketplace • Verified Ethiopian university students</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-16">
          {/* Dynamic Slim Wide-Strip Featured Hero Banner (Changes every 4 seconds) */}
          <FeaturedHero products={products.length > 0 ? products : MOCK_PRODUCTS} />

          {/* Marketplace Browse Bar & Filters */}
          <div id="materials-feed" className="mb-3 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight text-gray-900 dark:text-gray-100">
                  Academic Marketplace
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-[#2E3192] dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40">
                  {sorted.length} verified materials
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs hidden sm:block">
                Lecture notes, modules, past exams & tutorials by verified Ethiopian university students
              </p>
            </div>

            {/* Interactive Custom Filter Bar */}
            <FilterBar filters={filters} onChange={setFilters} />
          </div>

          {/* Product Cards Grid */}
          <div className="pt-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="py-16 flex flex-col items-center justify-center text-center bg-white dark:bg-[#16181D] border border-[#E5E5E0] dark:border-[#26282E] rounded-3xl p-8 shadow-sm max-w-lg mx-auto my-8"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-[#2E3192] dark:text-indigo-400 mb-4 shadow-xs">
                <Search size={30} />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
                No matching materials found
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
                We couldn't find any listings matching your search or category filters. Try clearing your filters to see all available study materials.
              </p>
              <button
                onClick={() => setFilters({ category: "", productType: "", sort: "newest", search: "" })}
                className="px-6 py-3 text-xs font-bold text-white bg-[#2E3192] hover:bg-[#232675] rounded-full shadow-md shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <XCircle size={15} />
                <span>Reset All Filters</span>
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Showing <strong className="text-gray-900 dark:text-gray-100">{visible.length}</strong> of{" "}
                  <strong className="text-gray-900 dark:text-gray-100">{sorted.length}</strong> student study materials
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {visible.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: idx * 0.035, ease: "easeOut" }}
                      className="h-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="ghost"
                    onClick={() => setPage((p) => p + 1)}
                    size="lg"
                    className="rounded-full px-8 py-3.5 border border-[#E5E5E0] dark:border-[#26282E] hover:bg-white dark:hover:bg-[#16181D] font-bold text-xs text-gray-800 dark:text-gray-200 shadow-sm hover:scale-105 transition-all"
                  >
                    Load More Materials ({sorted.length - visible.length} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function MarketplaceFeed() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF5] dark:bg-[#18181C]">
        <Spinner size="lg" className="text-[#2E3192]" />
      </div>
    }>
      <MarketplaceFeedInner />
    </Suspense>
  );
}
