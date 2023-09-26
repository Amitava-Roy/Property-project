const Property = require("../model/property");
const { validationResult } = require("express-validator");

exports.getPropertyList = (req, res, next) => {
  Property.find()
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      next(err);
    });
  // error = new Error("error");
  // next(error);
};

exports.postProperty = (req, res, next) => {
  const {
    imgUrl,
    name,
    type,
    movingDate,
    price,
    owner,
    location,
  } = req.body;
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

  const property = new Property({
    name,
    imgUrl,
    price: Number(price),
    type,
    movingDate,
    owner,
    location,
  });
  property
    .save()
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => next(err));
};

exports.patchProperty = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  //reading inputs
  const {
    name,
    imgUrl,
    price,
    type,
    movingDate,
    location,
  } = req.body;
  //validating inputs

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
  //CRUD oparetions
  Property.findOneAndUpdate(
    { _id: id },
    {
      name,
      imgUrl,
      price,
      type,
      movingDate,
      location,
    },
    { new: true }
  )
    .then((data) => {
      console.log(data);
      res.status(201).json({
        message: "data updated successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletProperty = (req, res, next) => {
  const id = req.params.id;
  Property.findOneAndDelete({ _id: id })
    .then((data) => {
      res.json({ message: "data deleted sucessfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getListOfProprties = (req, res, next) => {
  const { owner } = req.body;
  if (!owner) {
    return new Error("owner not mentioned");
  }
  Property.find({ owner })
    .then((data) => {
      if (!data) {
        return new Error("could not find any property");
      }
      res.json({ data });
    })
    .catch((err) => {
      next(err);
    });
};
