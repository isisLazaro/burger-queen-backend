import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  rol: { type: String, maxlength: 30, required: true },
  nombre: { type: String, maxlength: 50, unique: true, required: true },
  tipo_documento: { type: String, maxlength: 20 },
  num_documento: { type: String, maxlength: 20 },
  direccion: { type: String, maxlength: 100 },
  telefono: { type: String, maxlength: 20 },
  password: { type: String, maxlength: 64, required: true },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("user", userSchema);

export default User;
