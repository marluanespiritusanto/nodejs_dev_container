import { model, Schema } from "mongoose";

const FruitSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  description: {
    type: String,
    minlength: 5,
    maxlength: 200,
    default: "Default description"
  }
});

export default model("Fruit", FruitSchema);
