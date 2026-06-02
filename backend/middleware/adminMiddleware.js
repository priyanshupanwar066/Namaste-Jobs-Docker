import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ error: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ error: "Admin access required" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

export default adminMiddleware;