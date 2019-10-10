import mongoose, { Schema } from "mongoose";

//unique?? required??
//hamburguesas, entradas, jochos
const dishCardSchema = new Schema({
  categoria: { type: String, maxlength: 50, unique: true, required: true },
  foto: { type: String },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const DishCard = mongoose.model("dishcard", dishCardSchema);

export default DishCard;
