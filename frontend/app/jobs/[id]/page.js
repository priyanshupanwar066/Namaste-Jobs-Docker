"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Briefcase, MapPin, Banknote, Clock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobDetails();
  }, [id]);

  if (loading) return (
    <div className="max-w-4xl mx-auto mt-28 p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!job) return (
    <div className="max-w-4xl mx-auto mt-28 p-6 text-center">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found!</h2>
      <button
        onClick={() => router.push('/jobs')}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
      >
        Browse All Jobs
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto mt-28 p-6"
    >
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Jobs
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {job.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold text-gray-800">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <MapPin className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-800">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <Banknote className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Salary</p>
              <p className="font-semibold text-gray-800">{job.salary}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <Clock className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Posted</p>
              <p className="font-semibold text-gray-800">{new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {job.requirements && (
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {job.requirements.split('\n').map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities && (
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {job.responsibilities.split('\n').map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;