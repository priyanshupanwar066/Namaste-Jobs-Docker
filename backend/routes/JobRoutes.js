import express from "express";
import Job from "../models/job.js";
import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ Get All Jobs with Filtering & Pagination (Public)
router.get("/", async (req, res) => {
  try {
    const { category, location, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build filter object
    let filter = {};
    if (category) filter.category = { $regex: new RegExp(category, "i") };
    if (location) filter.location = { $regex: new RegExp(location, "i") };

    // Get jobs with sorting and pagination
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(parseInt(limit));

    console.log("✅ Jobs fetched:", jobs.length); // Moved after jobs is defined

    // Get total count with same filters
    const totalJobs = await Job.countDocuments(filter);

    res.status(200).json({
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: parseInt(page),
      totalJobs,
      jobs
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Jobs by Category (Public) - Updated with sorting
router.get("/category/:category", async (req, res) => {
  try {
    const jobs = await Job.find({ category: req.params.category })
      .sort({ createdAt: -1 }); // Newest first

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this category" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Bulk Create Jobs (Only Admins)
router.post("/bulk", protect, adminMiddleware, async (req, res) => {
  try {
    const jobs = req.body;
    
    // Validate all jobs have required fields
    const requiredFields = ['title', 'description', 'location', 'qualification', 'category', 'company', 'salary'];
    for (const job of jobs) {
      const missingFields = requiredFields.filter(field => !job[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Missing required fields in one or more jobs: ${missingFields.join(', ')}`
        });
      }
      job.postedBy = req.user.id;
    }

    const savedJobs = await Job.insertMany(jobs);
    res.status(201).json(savedJobs);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors 
    });
  }
});

// ✅ Get Jobs by Qualification (Public) - Updated with sorting
router.get("/qualification/:qualification", async (req, res) => {
  try {
    const jobs = await Job.find({ qualification: req.params.qualification })
      .sort({ createdAt: -1 }); // Newest first

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this qualification" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Job by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create New Job (Only Admins)
router.post("/", protect, adminMiddleware, async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'description', 'location', 'qualification', 'category', 'company', 'salary'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Create single job
    const newJob = await Job.create({
      ...req.body,
      postedBy: req.user.id
    });

    res.status(201).json({
      message: "Job created successfully",
      job: newJob
    });
  } catch (error) {
    console.error("Job creation error:", error);
    res.status(400).json({ 
      error: error.message,
      validationErrors: error.errors 
    });
  }
});

// ✅ Update a Job (Only Admins)
router.put("/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body, 
        updatedAt: new Date(),
        postedBy: req.user.id // Ensure ownership is maintained
      },
      { new: true, runValidators: true } // Run validators on update
    );
    
    if (!updatedJob) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Job update error:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.errors 
    });
  }
});

// ✅ Delete a Job (Only Admins)
router.delete("/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ 
      message: "Job deleted successfully",
      deletedJob: job 
    });
  } catch (error) {
    console.error("Job deletion error:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.errors 
    });
  }
});

export default router;