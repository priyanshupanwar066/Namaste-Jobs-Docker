import Link from "next/link";
import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Namaste Jobs
            </h3>
            <p className="text-gray-600">
              Connecting talent with opportunity across Indias fastest growing job market.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Github, link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label={`${social.icon.name} page`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Browse Jobs", href: "/jobs" },
                { name: "Post a Job", href: "/post-job" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Resources</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Career Guide", href: "#" },
                { name: "Resume Tips", href: "#" },
                { name: "Interview Prep", href: "#" },
                { name: "Blog", href: "/blog" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@namastejobs.com" className="hover:text-blue-600">
                  contact@namastejobs.com
                </a>
              </div>
              <p className="text-gray-600">+91 7078041562</p>
              <address className="text-gray-600 not-italic">
                123 Business Street<br />
                Saharanpur , Uttarpradesh , India
              </address>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Namaste Jobs. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}