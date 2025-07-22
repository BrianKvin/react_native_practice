import jwt from "jsonwebtoken";
import User from "../models/User";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.useId).select(-password);
    if (!user) return res.status(401).json({ message: "Token is not valid" })
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Internal server error" });
  }
};

export default protectRoute;

// const response = await fetch(`http://localhost:3000/api/books`, {
//   method: "POST",
//   body: JSON.stringify({
//     title,
//     caption
//   }),
//   headers: { Authorization: `Bearer ${token}`}
// });
