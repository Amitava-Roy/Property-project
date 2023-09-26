const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.get("Authorization");

  try {
    const data = jwt.verify(token, "secrateuser");
    console.log("get");
    if (data) {
      req.body.owner = data._id;
      next();
    }
  } catch (err) {
    next(err);
  }
};
