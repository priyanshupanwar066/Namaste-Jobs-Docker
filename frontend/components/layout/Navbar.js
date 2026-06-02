"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Search, ChevronDown, Briefcase, LogOut, User, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

// ── Constants ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const CATEGORIES = [
  { label: "Software Development", value: "Software Developer" },
  { label: "Web Development", value: "Web Developer" },
  { label: "Cloud Computing", value: "Cloud Computing" },
  { label: "Data Science", value: "Data Science" },
  { label: "DevOps", value: "DevOps" },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "AI / ML", value: "AI & ML" },
  { label: "Design / UI-UX", value: "Design" },
  { label: "Finance", value: "Finance" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Marketing", value: "Marketing" },
  { label: "Other", value: "Other" },
];

const LOCATIONS = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune",
  "Kolkata", "Chennai", "Ahmedabad", "Jaipur", "Remote",
  "International", "Other",
];

// ─── Dropdown Menu ────────────────────────────────────────────────────────────
function DropdownMenu({ label, items, onSelect, dropRef, isOpen, onToggle, icon }) {
  return (
    <div className="relative" ref={dropRef}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
          isOpen
            ? "bg-violet-600 text-white"
            : "text-slate-600 hover:text-violet-700 hover:bg-violet-50"
        }`}
      >
        {icon && <span className="opacity-70">{icon}</span>}
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute top-full mt-2 left-0 w-52 bg-white rounded-xl shadow-xl shadow-slate-200/80 border border-slate-100 py-1.5 z-50 overflow-hidden"
          >
            {items.map((item) => {
              const label = typeof item === "string" ? item : item.label;
              const value = typeof item === "string" ? item : item.value;
              return (
                <button
                  key={value}
                  role="option"
                  onClick={() => onSelect(value)}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium"
                >
                  {label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ value, onChange, onKeyDown, className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      <input
        type="text"
        placeholder="Search jobs, companies…"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        aria-label="Search jobs"
        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-slate-100 border border-transparent text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-violet-300 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
      />
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors"
      />
    </div>
  );
}

// ─── User Avatar ──────────────────────────────────────────────────────────────
function UserAvatar({ name }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";
  return (
    <div className="w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const { user, logout } = useAuth();

  // ── Scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close dropdowns on outside click ──
  useEffect(() => {
    const handler = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setCategoryOpen(false);
      if (locationRef.current && !locationRef.current.contains(e.target)) setLocationOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Close mobile menu on route change ──
  useEffect(() => {
    setMenuOpen(false);
    setCategoryOpen(false);
    setLocationOpen(false);
  }, [pathname]);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigateToJobs = useCallback((type, value) => {
    router.push(`/jobs?${type}=${encodeURIComponent(value)}`);
    setCategoryOpen(false);
    setLocationOpen(false);
    setMenuOpen(false);
  }, [router]);

  const handleSearch = useCallback((e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  }, [searchQuery, router]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
    setMenuOpen(false);
  }, [logout, router]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-slate-200/60" : "border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
              aria-label="NamasteJobs home"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center group-hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight">
                <span className="text-violet-600">Namaste</span>
                <span className="text-slate-800">Jobs</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                    pathname === item.path
                      ? "text-violet-700 bg-violet-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-violet-50 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* ── Desktop Controls ── */}
            <div className="hidden md:flex items-center gap-2">
              {/* Dropdowns */}
              <DropdownMenu
                label="Categories"
                items={CATEGORIES}
                onSelect={(v) => navigateToJobs("category", v)}
                dropRef={categoryRef}
                isOpen={categoryOpen}
                onToggle={() => { setCategoryOpen((o) => !o); setLocationOpen(false); }}
              />
              <DropdownMenu
                label="Locations"
                items={LOCATIONS}
                onSelect={(v) => navigateToJobs("location", v)}
                dropRef={locationRef}
                isOpen={locationOpen}
                onToggle={() => { setLocationOpen((o) => !o); setCategoryOpen(false); }}
              />

              {/* Search */}
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-52"
              />

              {/* Auth buttons */}
              <div className="flex items-center gap-2 ml-1 pl-3 border-l border-slate-200">
                {user ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
                    >
                      <UserAvatar name={user.name} />
                      <span className="max-w-[80px] truncate">{user.name || "Profile"}</span>
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 active:scale-95 rounded-lg transition-all shadow-sm shadow-violet-200"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">

                {/* Nav Links */}
                <div className="space-y-0.5 pb-3 border-b border-slate-100">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                        pathname === item.path
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Search */}
                <div className="py-3 border-b border-slate-100">
                  <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-400 mt-1.5 px-1">Press Enter to search</p>
                </div>

                {/* Categories */}
                <div className="py-3 border-b border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => navigateToJobs("category", cat.value)}
                        className="text-left px-3 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition-colors font-medium"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="py-3 border-b border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
                    Locations
                  </p>
                  <div className="grid grid-cols-3 gap-1">
                    {LOCATIONS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => navigateToJobs("location", loc)}
                        className="text-left px-3 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition-colors font-medium"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth */}
                <div className="pt-3 pb-2">
                  {user ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <UserAvatar name={user.name} />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{user.name || "User"}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <User size={15} className="text-slate-400" />
                        My Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <LayoutDashboard size={15} className="text-slate-400" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <LogOut size={15} />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Link
                        href="/login"
                        className="flex-1 text-center py-2.5 text-sm font-bold text-violet-600 border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 rounded-xl transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Spacer to prevent content hiding under fixed navbar ── */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;