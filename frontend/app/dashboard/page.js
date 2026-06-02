"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  MapPin,
  Banknote,
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  X,
  LogOut,
  LayoutDashboard,
  AlertCircle,
  Loader2
} from "lucide-react";

// ─── Namaste Icon ──────────────────────────────────────────────────────────────
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

const LOCATIONS = [
  "Pune", "Mumbai", "Bangalore", "Delhi", 
  "Haryana", "Chennai", "Hyderabad", "Kolkata",
  "Ahmedabad", "Jaipur", "Remote"
];

const CATEGORIES = [
  "IT", "Teacher", "MBA", "Consulting", "Software Developer",
  "Finance", "Healthcare", "Education", "Marketing", "Engineering",
  "AI & ML", "Cloud Computing", "Data Science", "Product Management",
  "Sales & Marketing", "Finance & Administration", "Customer Service",
  "Cyber Security", "DevOps", "Design", "Management", "Quality Assurance",
  "Mobile Development", "Database Management", "Networking", "Technical Support",
  "Blockchain", "Game Development", "IT Support"
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    category: "",
    description: "",
    qualification: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/profile");
      return;
    }

    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.get("/jobs", { 
          withCredentials: true,
          signal: controller.signal 
        });
        const jobsData = Array.isArray(res.data) ? res.data : (res.data.jobs || []);
        setJobs(jobsData);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
          setJobs([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();

    return () => {
      controller.abort();
    };
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateJob = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const res = await api.put(`/jobs/${editingJob._id}`, formData);
        setJobs(prev => prev.map(job => job._id === editingJob._id ? res.data.job || res.data : job));
        setEditingJob(null);
      } else {
        const res = await api.post("/jobs", formData);
        setJobs(prev => [res.data.job || res.data, ...prev]);
      }
      setFormData({ 
        title: "", company: "", location: "", 
        salary: "", category: "", description: "", 
        qualification: "" 
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      salary: job.salary || "",
      category: job.category || "",
      description: job.description || "",
      qualification: job.qualification || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setFormData({ 
      title: "", company: "", location: "", 
      salary: "", category: "", description: "", 
      qualification: "" 
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Failed to delete job: " + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* ── Top Navigation ──────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <NamasteIconSmall />
            <span className="text-slate-900 font-black text-lg tracking-tight group-hover:text-blue-600 transition-colors">
              Namaste<span className="text-blue-600">Jobs</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-800">{user?.name || "Admin"}</span>
              <span className="text-xs text-slate-500">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Page Title */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp}
          className="mb-10 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage job postings, update listings, and oversee platform content.</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ── Left: Job Form ──────────────────────────────────────────── */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingJob ? "Edit Job" : "Add New Job"}
                </h2>
                {editingJob && (
                  <button 
                    onClick={handleCancelEdit}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleAddOrUpdateJob} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="e.g. Senior Frontend Developer"
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="e.g. Tech Corp"
                      required
                    />
                  </div>
                </div>

                {/* Location & Category Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                        required
                      >
                        <option value="">Select</option>
                        {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                      required
                    >
                      <option value="">Select</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                {/* Salary & Qualification Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Salary</label>
                    <div className="relative">
                      <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="e.g. ₹10-15 LPA"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Qualification</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="e.g. B.Tech"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    rows="4"
                    placeholder="Briefly describe the role and responsibilities..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-95 text-sm tracking-wide shadow-lg shadow-blue-600/10"
                >
                  {editingJob ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingJob ? "Update Job Listing" : "Add New Job"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ── Right: Jobs List ────────────────────────────────────────── */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-base font-bold text-slate-900">Active Job Listings</h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {jobs.length} Total
                </span>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
                    <p className="text-sm font-medium text-slate-500">Loading job listings...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-16 text-red-600">
                    <AlertCircle className="w-8 h-8 mb-4" />
                    <p className="text-sm font-medium">Error: {error}</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <Briefcase className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-base font-bold text-slate-600 mb-1">No jobs found</p>
                    <p className="text-sm">Start by adding your first job listing using the form.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <motion.div
                        key={job._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-white hover:bg-slate-50/80 p-5 rounded-xl border border-slate-200 hover:border-blue-200 transition-all duration-200"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between md:justify-start gap-3 mb-2">
                              <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
                                {job.title}
                              </h3>
                              <span className="flex-shrink-0 text-[10px] px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-bold tracking-wide uppercase">
                                {job.category}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 mt-3">
                              <span className="flex items-center gap-1.5">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {job.company}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Banknote className="w-3.5 h-3.5 text-slate-400" />
                                {job.salary}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                                {job.qualification || "Not specified"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-2 md:mt-0 md:self-center">
                            <button
                              onClick={() => handleEdit(job)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 border border-red-100 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}