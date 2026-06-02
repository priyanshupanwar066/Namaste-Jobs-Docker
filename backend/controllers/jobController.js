import Job from "../models/job.js";

// ✅ Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};

// ✅ Create a Job (Only Admins)
export const createJob = async (req, res) => {
  try {
    const { title, description, category, location, salary, company, qualification } = req.body;
    
    if (!title || !description || !category || !location || !salary || !company || !qualification) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const job = new Job({
      title,
      description,
      category,
      location,
      salary,
      company,
      qualification,
      postedBy: req.user.id,
    });
    
    await job.save();
    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    console.error("Job creation error:", error);
    res.status(400).json({ 
      error: "Invalid job data",
      details: error.message 
    });
  }
};