import jwt from "jsonwebtoken";
import "dotenv/config";
const isAuthenticated = (req, res, next) => {
  try {
    const Token = req.cookies?.Token;
    if (!Token) {
      return res.status(401).json({ message: "user not authenticated" });
    }
    jwt.verify(Token, process.env.JWT_SECRETE_KEY, (err, decode) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Session is Expired! login again." });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Invalid Token!" });
        } else {
          return res.status(401).json({ message: "Verification failed!" });
        }
      }
      req.id = decode.UserId;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
export default isAuthenticated;
