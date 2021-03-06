/**
 * authorize an adin user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next pass control to the next middleware
 */
export default function (req, res, next) {
  const admin = req.body.is_admin;
  if (!admin) return res.status(403).json({ status: 'error', error: 'ACCESS DENIED, YOU ARE NOT AN ADMIN' });
  
  next();
}
