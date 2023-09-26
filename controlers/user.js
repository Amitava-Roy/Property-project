const User = require("../model/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.postSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  //validation of inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errs = errors.errors;
    console.log(errs);
    const err = new Error(
      errs[0].msg + " of " + errs[0].path
    );

    err.statusCode = 422;
    return next(err);
  }
  //crud
  User.findOne({ email })
    .then((data) => {
      if (data) {
        return new Error("User already exits");
      }
      bcrypt.hash(password, 12).then((password) => {
        const user = new User({ name, email, password });
        user
          .save()
          .then((data) => {
            res.json({
              message: "user sucessfully created",
            });
          })
          .catch((err) => next(err));
      });
    })
    .catch((err) => next(err));
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  //validation of inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errs = errors.errors;
    console.log(errs);
    const err = new Error(
      errs[0].msg + " of " + errs[0].path
    );

    err.statusCode = 422;
    return next(err);
  }

  //CRUD
  User.findOne({ email })
    .then((data) => {
      if (!data) {
        const err = new Error("no users found");
        return next(err);
      }
      bcrypt
        .compare(password, data.password)
        .then((doMatch) => {
          if (!doMatch) {
            const error = new Error(
              "wrong password entered"
            );
            return next(error);
          }
          const token = jwt.sign(
            { _id: data._id },
            "secrateuser",
            { expiresIn: "2hr" }
          );
          console.log("token", token);
          res.json({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      next(err);
    });
};
