import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

import "../app/globals.css";

export const metadata = {
  title: "NamasteJobs — India's Premier Tech Careers Platform",
  description:
    "Discover verified Cloud, DevOps, Data Science, AI/ML, and Software Engineering jobs from India's top companies.",
  keywords: "tech jobs india, software jobs, cloud jobs, data science jobs, devops jobs, namastejobs",
  openGraph: {
    title: "NamasteJobs — India's Premier Tech Careers Platform",
    description: "Find your next tech role in India. Verified listings, one-click apply.",
    siteName: "NamasteJobs",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DM Sans — clean, professional, modern */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F7F8FA] text-slate-900 antialiased">
        <AuthProvider>
          {/* Sticky top navbar */}
          <div className="sticky top-0 z-50 w-full">
            <Navbar />
          </div>

          {/* Page content — no container padding here; pages control their own layout */}
          <main>{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}