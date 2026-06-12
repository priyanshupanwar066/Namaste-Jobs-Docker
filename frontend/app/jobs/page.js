"use client";

import { Suspense ,useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Briefcase, MapPin, Banknote, Clock, AlertCircle, ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

// ─── Namaste Icon (for branding consistency) ─────────────────────────────────
function NamasteIconSmall() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-blue-600">
      <path d="M32 8C32 8 24 16 24 24C24 28 26 32 28 34C28 34 20 38 16 44C12 50 12 56 16 58C20 60 28 56 32 52C36 56 44 60 48 58C52 56 52 50 48 44C44 38 36 34 36 34C38 32 40 28 40 24C40 16 32 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 44C16 44 24 40 32 40C40 40 48 44 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-1.5 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {start > 1 && (
      	      <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 text-sm rounded-lg hover:bg-blue-50 text-slate-500 font-medium transition-colors">1</button>
          {start > 2 && <span className="text-slate-300 px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm rounded-lg font-semibold transition-all ${
            p === currentPage
              ? "bg-blue-600 text-white shadow-md"
              : "hover:bg-blue-50 text-slate-500 hover:text-blue-600"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-slate-300 px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 text-sm rounded-lg hover:bg-blue-50 text-slate-500 font-medium transition-colors">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="h-5 bg-slate-100 rounded w-3/4 mb-3" />
          <div className="h-4 bg-slate-100 rounded w-1/2" />
        </div>
        <div className="w-16 h-6 bg-slate-100 rounded-full" />
      </div>
      <div className="space-y-2.5">
        <div className="h-3.5 bg-slate-100 rounded w-2/3" />
        <div className="h-3.5 bg-slate-100 rounded w-1/2" />
        <div className="h-3.5 bg-slate-100 rounded w-1/3" />
      </div>
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="h-9 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, onView, isNew }) {
  const newJob = isNew(job.createdAt);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 p-6 flex flex-col h-full"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0 pr-3">
          <h2 className="text-base font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
            {job.title}
          </h2>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Briefcase className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="text-sm font-semibold truncate">{job.company}</span>
          </div>
        </div>
        {newJob ? (
          <span className="flex-shrink-0 text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold tracking-wide uppercase">
            New
          </span>
        ) : (
          job.category && (
            <span className="flex-shrink-0 text-[10px] px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-bold tracking-wide uppercase max-w-[100px] truncate">
              {job.category}
            </span>
          )
        )}
      </div>

      {/* Details */}
      <div className="space-y-2.5 flex-1">
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
          <span className="text-sm truncate">{job.location}</span>
        </div>

        {job.salary && (
          <div className="flex items-center gap-2 text-slate-500">
            <Banknote className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">{job.salary}</span>
          </div>
        )}

        {job.createdAt && (
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-xs">
              {new Date(job.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5 pt-5 border-t border-slate-100">
        <button
          onClick={() => onView(job._id)}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all tracking-wide flex items-center justify-center gap-2"
        >
          View & Apply
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
function JobsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const locationParam = searchParams.get("location") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const jobsPerPage = 9; // 3-col grid looks better with 9

  const isNew = (createdAt) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(createdAt) > sevenDaysAgo;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: currentPage,
          limit: jobsPerPage,
          ...(category && { category }),
          ...(locationParam && { location: locationParam }),
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?${params}`,
  {
    signal: controller.signal,
  }
       );
        clearTimeout(timeoutId);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
        setTotalJobs(data.totalJobs || 0);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to connect to server. Check your connection and try again.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category, locationParam, currentPage]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (category) params.append("category", category);
      if (locationParam) params.append("location", locationParam);
      router.push(`/jobs?${params.toString()}`);
    }
  };

  const pageTitle = category
    ? `${category} Jobs${locationParam ? ` in ${locationParam}` : ""}`
    : locationParam
    ? `Jobs in ${locationParam}`
    : "All Job Listings";

  const fromJob = (currentPage - 1) * jobsPerPage + 1;
  const toJob = Math.min(currentPage * jobsPerPage, totalJobs);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <NamasteIconSmall />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {category ? "Category" : "Browse"} · NamasteJobs
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {pageTitle}
              </h1>
              {!loading && totalJobs > 0 && (
                <p className="text-slate-500 text-sm font-medium">
                  {totalJobs.toLocaleString()} verified openings found
                </p>
              )}
            </div>

            {/* Search bar matching homepage style */}
            <div className="w-full md:w-auto md:min-w-[400px]">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 flex items-center gap-2">
                <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    placeholder="Search title, company, or keyword…"
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
                  />
                </div>
                <button 
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (searchQuery) params.append("search", searchQuery);
                    if (category) params.append("category", category);
                    router.push(`/jobs?${params.toString()}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Error State */}
        {error && (
          <div className="mb-8 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm mb-0.5">Failed to load jobs</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Results meta */}
        {!loading && !error && totalJobs > 0 && (
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{fromJob}–{toJob}</span> of{" "}
              <span className="font-bold text-slate-800">{totalJobs.toLocaleString()}</span> results
            </p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Job Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs
              .filter((job) =>
                searchQuery
                  ? job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.company?.toLowerCase().includes(searchQuery.toLowerCase())
                  : true
              )
              .map((job, i) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <JobCard
                    job={job}
                    isNew={isNew}
                    onView={(id) => router.push(`/jobs/${id}`)}
                  />
                </motion.div>
              ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No Jobs Found</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              No listings match your current filters. Try adjusting your search or browse all available roles.
            </p>
            <button
              onClick={() => router.push("/jobs")}
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all text-sm tracking-wide"
            >
              Browse All Jobs
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && jobs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsPageContent />
    </Suspense>
  );
}
