import { verifyToken } from "@clerk/backend";

export default async function clerkAuth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return res.status(401).json({ message: "Authorization header missing" });

    const token = header.split(" ")[1];

    const { payload } = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_VERIFICATION_KEY,
      authorizedParties: [process.env.CLERK_PUBLISHABLE_KEY]
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
