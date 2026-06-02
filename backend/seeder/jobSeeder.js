import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/job.js";

dotenv.config();

const locations = [
  "DELHI",
  "MUMBAI",
  "BANGALORE",
  "HYDERABAD",
  "PUNE",
  "KOLKATA",
  "CHENNAI",
  "AHMEDABAD",
  "JAIPUR",
  "REMOTE",
  "INTERNATIONAL",
  "OTHER",
];

const companies = [
  "TCS",
  "Infosys",
  "Wipro",
  "HCL",
  "Accenture",
  "Capgemini",
  "Cognizant",
  "Tech Mahindra",
  "IBM",
  "Oracle",
  "Deloitte",
  "Amazon",
  "Microsoft",
  "Google",
  "Zoho",
  "PhonePe",
  "Paytm",
  "Flipkart",
  "Swiggy",
  "Razorpay",
  "LTIMindtree",
  "Mphasis",
  "Persistent",
  "Birlasoft",
  "Nagarro",
];

const categoryJobs = {
  "SOFTWARE DEVELOPMENT": [
    "Java Developer",
    "Python Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Software Developer",
  ],

  "WEB DEVELOPMENT": [
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
  ],

  "CLOUD COMPUTING": [
    "AWS Cloud Engineer",
    "Azure Cloud Engineer",
    "Cloud Support Engineer",
    "Cloud Architect",
  ],

  DEVOPS: [
    "DevOps Engineer",
    "Kubernetes Engineer",
    "Site Reliability Engineer",
    "Platform Engineer",
  ],

  "CYBER SECURITY": [
    "SOC Analyst",
    "Cyber Security Analyst",
    "Security Engineer",
    "Threat Hunter",
  ],

  "DATA SCIENCE": [
    "Data Analyst",
    "Data Scientist",
    "Data Engineer",
    "Business Analyst",
  ],

  "AI ML": [
    "AI Engineer",
    "ML Engineer",
    "Prompt Engineer",
    "GenAI Engineer",
  ],

  "DESIGN UI UX": [
    "UI Designer",
    "UX Designer",
    "Product Designer",
    "UI UX Designer",
  ],

  FINANCE: [
    "Financial Analyst",
    "Accounts Executive",
    "Finance Associate",
  ],

  HEALTHCARE: [
    "Healthcare Analyst",
    "Medical Coordinator",
    "Healthcare Consultant",
  ],

  MARKETING: [
    "Digital Marketing Executive",
    "SEO Specialist",
    "Content Marketing Manager",
    "Marketing Executive",
  ],

  OTHER: [
    "Technical Support Engineer",
    "Customer Support Executive",
    "Operations Executive",
  ],
};

async function seedJobs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const jobs = [];

    const TOTAL_JOBS = 2392;

    const categories = Object.keys(categoryJobs);

    for (let i = 0; i < TOTAL_JOBS; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const title =
        categoryJobs[category][
          Math.floor(Math.random() * categoryJobs[category].length)
        ];

      const location =
        locations[Math.floor(Math.random() * locations.length)];

      const company =
        companies[Math.floor(Math.random() * companies.length)];

      jobs.push({
        title,
        description: `Hiring ${title} for ${company}. Excellent career growth opportunity in ${location}. Looking for motivated candidates with strong technical skills.`,

        location,

        qualification:
          Math.random() > 0.5
            ? "BTECH MCA BCA"
            : "ANY GRADUATE",

        category,

        company,

        salary: `${4 + Math.floor(Math.random() * 26)} LPA`,
      });
    }

    await Job.insertMany(jobs);

    console.log(`✅ ${jobs.length} Additional Jobs Inserted`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedJobs();