const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const propertyController = require("../controlers/property");
const isAuth = require("../Middleware/userLogin");

router.get(
  "/list-properties",
  propertyController.getPropertyList
);

router.post(
  "/property",
  [
    body("name")
      .isLength({ min: 1 })
      .trim()
      .withMessage("name is wrong"),
    body("type")
      .isLength({ min: 1 })
      .trim()
      .withMessage("type is wrong"),
    body("price")
      .isLength({ min: 1 })
      .isNumeric()
      .trim()
      .withMessage("price is wrong"),
    body("movingDate")
      .isLength({ min: 1 })
      .trim()
      .withMessage("name is wrong"),
    body("imgUrl").isURL(),
  ],
  isAuth,
  propertyController.postProperty
);
router.patch(
  "/property/:id",
  [
    body("name")
      .optional({ nullable: true })
      .isLength({ min: 1 })
      .trim()
      .withMessage("name is wrong"),
    body("type")
      .optional({ nullable: true })
      .isLength({ min: 1 })
      .trim()
      .withMessage("type is wrong"),
    body("price")
      .optional({ nullable: true })
      .isLength({ min: 1 })
      .isNumeric()
      .trim()
      .withMessage("price is wrong"),
    body("movingDate")
      .optional({ nullable: true })
      .isLength({ min: 1 })
      .trim()
      .withMessage("moving date is wrong"),
    body("imgUrl")
      .optional({ nullable: true })
      .isURL()
      .withMessage("url is wrong"),
  ],
  isAuth,
  propertyController.patchProperty
);
router.delete(
  "/property/:id",
  isAuth,
  propertyController.deletProperty
);
router.get(
  "/property",
  isAuth,
  propertyController.getListOfProprties
);

module.exports = router;
