const supabase = require("../lib/supabase");
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    // Attach the user to the request object
    req.user = data.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = authenticate;
