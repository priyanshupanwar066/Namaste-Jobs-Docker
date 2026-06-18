"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Premium Section Header ───────────────────────────────────────────────────
function ModernSectionHeader({ title, subtitle, badge, badgeColor }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className={`w-2 h-2 rounded-full ${badgeColor}`} />
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{badge}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 mt-1.5">{subtitle}</p>}
    </div>
  );
}

// ─── Premium Job Table ────────────────────────────────────────────────────────
function ModernJobTable({ jobs, isNew, onView, showCategory = false, showTechStack = false }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No jobs found in this category.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Position & Company</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
              {showCategory && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>}
              {showTechStack && <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tech Stack</th>}
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Posted</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <tr 
                key={job._id || job.id} 
                onClick={() => onView(job._id || job.id)}
                className="group hover:bg-blue-50/40 transition-colors duration-200 cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {isNew(job.createdAt) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors block truncate">
                        {job.title}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{job.company}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate max-w-[120px]">{job.location}</span>
                  </span>
                </td>
                {showCategory && (
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {job.category || "General"}
                    </span>
                  </td>
                )}
                {showTechStack && (
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {job.techStack || "Full Stack"}
                    </span>
                  </td>
                )}
                <td className="px-6 py-4">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Recently"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); onView(job._id || job.id); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all active:scale-95"
                  >
                    Apply
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Modern Pagination Footer ─────────────────────────────────────────────────
function ModernPaginationFooter({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50 gap-4">
      <p className="text-xs text-slate-500 font-medium">
        Page <span className="font-bold text-slate-900">{currentPage}</span> of <span className="font-bold text-slate-900">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Previous
        </button>
        
        {start > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="w-8 h-8 text-xs font-medium rounded-lg hover:bg-white hover:border-slate-200 border border-transparent text-slate-600 transition-all">1</button>
            {start > 2 && <span className="text-slate-400 text-xs px-1">…</span>}
          </>
        )}
        
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 text-xs font-bold rounded-lg transition-all border ${
              p === currentPage 
                ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                : "text-slate-600 hover:bg-white hover:border-slate-200 border-transparent"
            }`}
          >
            {p}
          </button>
        ))}
        
        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="text-slate-400 text-xs px-1">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="w-8 h-8 text-xs font-medium rounded-lg hover:bg-white hover:border-slate-200 border border-transparent text-slate-600 transition-all">{totalPages}</button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function NamasteIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="text-blue-600">
      <path d="M32 8C32 8 24 16 24 24C24 28 26 32 28 34C28 34 20 38 16 44C12 50 12 56 16 58C20 60 28 56 32 52C36 56 44 60 48 58C52 56 52 50 48 44C44 38 36 34 36 34C38 32 40 28 40 24C40 16 32 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 44C16 44 24 40 32 40C40 40 48 44 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

// ─── Pagination Component ────────────────────────────────────────────────────
function PaginationFooter({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-1.5 px-6 py-5 border-t border-slate-100">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors tracking-wide uppercase"
      >
        ← Prev
      </button>
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-9 h-9 text-sm rounded-md hover:bg-slate-100 text-slate-500 transition-colors font-medium">1</button>
          {start > 2 && <span className="text-slate-300 text-sm px-1">…</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm rounded-md font-semibold transition-all ${
            p === currentPage ? "bg-blue-600 text-white shadow-md" : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-slate-300 text-sm px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-9 h-9 text-sm rounded-md hover:bg-slate-100 text-slate-500 transition-colors font-medium">{totalPages}</button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-colors tracking-wide uppercase"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Job Row Component ────────────────────────────────────────────────────────
function JobRow({ job, onView, isNew, showCategory = false, showTechStack = false }) {
  return (
    <tr className="border-t border-slate-100 hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => onView(job._id)}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {isNew(job.createdAt) && (
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          )}
          <div>
            <span className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors leading-tight block">
              {job.title}
            </span>
            {isNew(job.createdAt) && (
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold tracking-wide uppercase mt-0.5 inline-block">
                New
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-700 font-medium">{job.company}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-500 flex items-center gap-1.5">
          <LocationIcon />
          {job.location}
        </span>
      </td>
      {showCategory && (
        <td className="px-6 py-4">
          <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded font-semibold tracking-wide uppercase">
            {job.category || "General"}
          </span>
        </td>
      )}
      {showTechStack && (
        <td className="px-6 py-4">
          <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded font-semibold border border-blue-100 tracking-wide">
            {job.techStack || "Full Stack"}
          </span>
        </td>
      )}
      <td className="px-6 py-4">
        <span className="text-xs text-slate-400 font-medium">
          {new Date(job.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={(e) => { e.stopPropagation(); onView(job._id); }}
          className="text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all tracking-wide"
        >
          Apply →
        </button>
      </td>
    </tr>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, badge, badgeDot }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {badgeDot && <span className={`w-2 h-2 rounded-full ${badgeDot}`} />}
        {badge && <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{badge}</span>}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

// ─── Job Table ────────────────────────────────────────────────────────────────
function JobTable({ jobs, isNew, onView, showCategory, showTechStack, headers }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {headers.map((h, i) => (
              <th key={i} className="px-6 py-3.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-16 text-center text-slate-400 text-sm">
                No jobs found in this category.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <JobRow
                key={job._id}
                job={job}
                isNew={isNew}
                onView={onView}
                showCategory={showCategory}
                showTechStack={showTechStack}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat, onClick }) {
  const colorMap = {
    "💻": "bg-blue-50 border-blue-100 hover:border-blue-300 hover:bg-blue-100",
    "☁️": "bg-cyan-50 border-cyan-100 hover:border-cyan-300 hover:bg-cyan-100",
    "🔐": "bg-red-50 border-red-100 hover:border-red-300 hover:bg-red-100",
    "📊": "bg-amber-50 border-amber-100 hover:border-amber-300 hover:bg-amber-100",
    "⚙️": "bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100",
    "🤖": "bg-purple-50 border-purple-100 hover:border-purple-300 hover:bg-purple-100",
    "🎨": "bg-pink-50 border-pink-100 hover:border-pink-300 hover:bg-pink-100",
    "🚀": "bg-green-50 border-green-100 hover:border-green-300 hover:bg-green-100",
  };
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group flex items-center gap-4 p-5 bg-white rounded-xl border-2 ${colorMap[cat.icon] || "border-slate-200 hover:border-slate-400"} transition-all duration-200 text-left w-full shadow-sm`}
    >
      <span className="text-3xl flex-shrink-0">{cat.icon}</span>
      <div className="min-w-0">
        <span className="font-bold text-slate-800 text-sm block group-hover:text-blue-700 transition-colors">{cat.name}</span>
        <span className="text-xs text-slate-400 font-medium mt-0.5 block">{cat.count} openings</span>
      </div>
      <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-auto flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageOtherJobs, setCurrentPageOtherJobs] = useState(1);
  const [currentPageTechJobs, setCurrentPageTechJobs] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
  {
    credentials: "include",
  }
);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        const jobsArray = Array.isArray(data) ? data : data.jobs || [];
        const sortedJobs = jobsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const TECH_COMPANIES = ["TCS", "Infosys", "Wipro", "HCL", "Accenture", "Capgemini", "Cognizant", "Tech Mahindra", "IBM", "Oracle", "Deloitte", "Amazon", "Microsoft", "Google", "Zoho", "Paytm", "PhonePe", "Flipkart", "Swiggy", "Razorpay"];
  const TECH_CATEGORIES = ["SOFTWARE DEVELOPMENT", "CLOUD COMPUTING", "CYBER SECURITY", "DATA SCIENCE", "DEVOPS", "AI ML", "FRONTEND", "BACKEND"];
  const trendingSearches = ["IT", "Marketing", "Finance", "Design", "Engineering", "Sales"];

  const isNew = (createdAt) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(createdAt) > sevenDaysAgo;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (locationQuery) params.append("location", locationQuery);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleFilterClick = (category) => {
    router.push(`/jobs?category=${encodeURIComponent(category)}`);
  };

  const handleView = (id) => router.push(`/jobs/${id}`);

  const otherJobs = jobs.filter((j) => !TECH_CATEGORIES.includes((j.category || "").toUpperCase()));
  const techJobs = jobs.filter((j) => TECH_CATEGORIES.includes((j.category || "").toUpperCase()));

  const paginatedJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  const paginatedOtherJobs = otherJobs.slice((currentPageOtherJobs - 1) * jobsPerPage, currentPageOtherJobs * jobsPerPage);
  const paginatedTechJobs = techJobs.slice((currentPageTechJobs - 1) * jobsPerPage, currentPageTechJobs * jobsPerPage);

  const jobCategories = [
    { name: "Software Dev", icon: "💻", category: "SOFTWARE DEVELOPMENT", count: jobs.filter(j => j.category === "SOFTWARE DEVELOPMENT").length || 45 },
    { name: "Cloud Engineering", icon: "☁️", category: "CLOUD COMPUTING", count: jobs.filter(j => j.category === "CLOUD COMPUTING").length || 32 },
    { name: "Cyber Security", icon: "🔐", category: "CYBER SECURITY", count: jobs.filter(j => j.category === "CYBER SECURITY").length || 28 },
    { name: "Data Science", icon: "📊", category: "DATA SCIENCE", count: jobs.filter(j => j.category === "DATA SCIENCE").length || 56 },
    { name: "DevOps", icon: "⚙️", category: "DEVOPS", count: jobs.filter(j => j.category === "DEVOPS").length || 39 },
    { name: "AI / ML", icon: "🤖", category: "AI ML", count: jobs.filter(j => j.category === "AI ML").length || 61 },
    { name: "Frontend", icon: "🎨", category: "FRONTEND", count: jobs.filter(j => j.category === "FRONTEND").length || 44 },
    { name: "Backend", icon: "🚀", category: "BACKEND", count: jobs.filter(j => j.category === "BACKEND").length || 37 },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.07 } },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Global CSS for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── HERO SECTION ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute ml-160 inset-0 z-0">
          <Image
            src="/hero-team.png.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/25 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <NamasteIcon />
                <div>
                  <h1 className="text-5xl font-black text-slate-900 leading-none">Namaste</h1>
                  <h1 className="text-5xl font-black text-blue-600 leading-none">Jobs India</h1>
                </div>
              </div>

              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Find Jobs. Build Careers.</h2>
                <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 leading-tight mt-2">Create Better Futures.</h2>
              </div>

              <p className="text-lg text-slate-600 max-w-md">
                Connecting talented professionals with top companies across India. Explore opportunities in Tech, Cloud, AI, and more.
              </p>

              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Job title, keyword or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                    <LocationIcon />
                    <input
                      type="text"
                      placeholder="Location"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
                  >
                    <BriefcaseIcon />
                    Find Jobs
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">Trending:</span>
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => router.push(`/jobs?search=${encodeURIComponent(term)}`)}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 text-sm font-medium rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Thousands of Opportunities", desc: "across top companies", icon: <BriefcaseIcon /> },
              { title: "Create Your Profile", desc: "showcase your skills and get noticed", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
              { title: "Easy Apply", desc: "simple, fast and secure", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> },
              { title: "Grow Your Career", desc: "learn, upskill and advance", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> }
            ].map((feature, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <div className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ───────────────────────────────────────────────────── */}
      {jobs.length > 0 && (
        <div className="bg-slate-50 border-y border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-bold text-slate-600 uppercase">Live</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {[...jobs.slice(0, 8), ...jobs.slice(0, 8)].map((job, i) => (
                  <Link key={`${job._id}-${i}`} href={`/jobs/${job._id}`} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                    <span className="font-semibold">{job.title}</span>
                    <span className="text-slate-400">at</span>
                    <span className="font-medium">{job.company}</span>
                    <span className="text-slate-400">•</span>
                    <span>{job.location}</span>
                    {isNew(job.createdAt) && <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] rounded font-bold border border-red-100">NEW</span>}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="py-16">
          <motion.div variants={fadeUp} className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Explore by Domain</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Browse Tech Roles</h2>
            </div>
            <Link href="/jobs" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              View all <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobCategories.map((cat) => (
              <motion.div key={cat.name} variants={fadeUp}>
                <CategoryCard cat={cat} onClick={() => handleFilterClick(cat.category)} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <div className="h-px bg-slate-200 mb-16" />

        {/* ── TRUSTED BY ────────────────────────────────────────────────────── */}
        <section className="pb-16">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Opportunities from India&apos;s Top Companies</p>
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...TECH_COMPANIES, ...TECH_COMPANIES].map((name, i) => (
                <span key={`${name}-${i}`} className="text-sm font-black text-slate-300 hover:text-blue-600 transition-colors cursor-default tracking-wide uppercase">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST JOBS TABLE ─────────────────────────────────────────────── */}
       
        {/* ── NEWEST OPPORTUNITIES ──────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="pb-16">
          <ModernSectionHeader badge="Latest Postings" badgeColor="bg-red-500" title="Newest Opportunities" subtitle="Freshest roles added in the past 7 days — apply before they're gone." />
          
          {isLoading ? (
            <div className="py-24 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
              <div className="inline-block w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-slate-500">Fetching live opportunities…</p>
            </div>
          ) : (
            <>
              <ModernJobTable jobs={paginatedJobs} isNew={isNew} onView={handleView} />
              <ModernPaginationFooter currentPage={currentPage} totalPages={Math.max(1, Math.ceil(jobs.length / jobsPerPage))} onPageChange={setCurrentPage} />
            </>
          )}
        </motion.section>

        {/* ── OTHER OPPORTUNITIES ───────────────────────────────────────────── */}
        {otherJobs.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="pb-16">
            <ModernSectionHeader badge={`${otherJobs.length} Roles Available`} badgeColor="bg-blue-500" title="Other Opportunities" subtitle="Non-tech roles across business, operations, and management." />
            <ModernJobTable jobs={paginatedOtherJobs} isNew={isNew} onView={handleView} showCategory={true} />
            <ModernPaginationFooter currentPage={currentPageOtherJobs} totalPages={Math.max(1, Math.ceil(otherJobs.length / jobsPerPage))} onPageChange={setCurrentPageOtherJobs} />
          </motion.section>
        )}

        {/* ── TECH INDUSTRY JOBS ────────────────────────────────────────────── */}
        {techJobs.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="pb-16">
            <ModernSectionHeader badge={`${techJobs.length} Tech Roles`} badgeColor="bg-emerald-500" title="Tech Industry Jobs" subtitle="Engineering, cloud, data, and development roles at India's best tech companies." />
            <ModernJobTable jobs={paginatedTechJobs} isNew={isNew} onView={handleView} showTechStack={true} />
            <ModernPaginationFooter currentPage={currentPageTechJobs} totalPages={Math.max(1, Math.ceil(techJobs.length / jobsPerPage))} onPageChange={setCurrentPageTechJobs} />
          </motion.section>
        )}
        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="pb-20">
          <div className="bg-blue-600 rounded-2xl px-8 py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 1.5px)`, backgroundSize: "28px 28px" }} />
            <div className="relative max-w-xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Ready to Find Your Next Role?</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">Join thousands of professionals who landed their dream job through NamasteJobs. Free to use, always verified.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/jobs" className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all text-sm tracking-wide shadow-lg">
                  Browse All Jobs
                </Link>
                <Link href="/register" className="px-8 py-3.5 bg-blue-700 border border-blue-500 text-white font-bold rounded-xl hover:bg-blue-800 active:scale-95 transition-all text-sm tracking-wide">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
