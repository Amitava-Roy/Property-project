const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    movingDate: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location:{
      type:String
    }
  },
  {
    collection: "property",
    timeStamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
