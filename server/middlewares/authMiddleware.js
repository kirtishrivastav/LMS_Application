import { clerkClient, getAuth } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    console.log("Auth Object:", auth); // Add this
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized - No user ID' });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== 'educator') {
      return res.status(403).json({ success: false, message: 'Unauthorized Access' });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
