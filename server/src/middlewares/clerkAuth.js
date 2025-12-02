import { verifyToken } from "@clerk/backend";
import fs from 'fs'; 
import path from 'path'; 

// --- 1. Load the JWT Public Key ONCE on startup ---
// The key is read synchronously to ensure it's available before the server handles requests.
const JWT_PUBLIC_KEY = fs.readFileSync(path.resolve('clerk-public.pem'), 'utf8');

export default async function clerkAuth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ message: "Authorization header missing" });

    const token = header.split(" ")[1];
    const  payload  = await verifyToken(token, {
      jwtKey: JWT_PUBLIC_KEY,
      authorizedParties: ['http://localhost:5173']
    });

    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Clerk Token",
      error: err.message,
    });
  }
}
