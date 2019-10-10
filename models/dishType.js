import mongoose, { Schema } from "mongoose";

const dishTypeSchema = new Schema({
  //required??
  categoria: { type : String , required: true },
  //malicia
  nombre: { type: String, maxlength: 50, required: true },
  //combo
  //default: isCombo
  //Combo: { type: Boolean , required: true},
  combo:{ type: Number },
  sencilla:{ type: Number },
  chica: { type: Number },
  mediana: { type: Number },
  grande: { type: Number }, 
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const DishType = mongoose.model("dishType", dishTypeSchema);

export default DishType;
