import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { 
      type: String, 
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: function(v) {
          // Convert to uppercase and check against a more flexible pattern
          const loc = v.toUpperCase();
          return /^[A-Z\s]+$/.test(loc); // Allows any alphabetic characters and spaces
        },
        message: props => `${props.value} is not a valid location!`
      }
    },
    qualification: { type: String, required: true },
    category: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: function(v) {
          const cat = v.toUpperCase();
          return /^[A-Z\s&]+$/.test(cat); // Allows alphabets, spaces, and &
        },
      },
    },
    company: { type: String, required: true },
    salary: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.location = ret.location.toUpperCase();
        ret.category = ret.category.toUpperCase();
        return ret;
      }
    }
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;