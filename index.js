import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import router from "./routes";

//cadena de conexion a la base de datos Mongo DB
mongoose.Promise = global.Promise;
//const dbUrl = "mongodb://localhost:27017/dbPanDmonium";
const dbUrl = "mongodb+srv://sofiamejia:Tdna7xnhJiBFKCDI@sofiamejia-t5dfn.mongodb.net/dbPanDmonium?retryWrites=true&w=majority";
mongoose.connect( dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(mongoose => console.log("Connecting PanDmonium database to port 27017"))
.catch(err => console.log(err));


const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ruta independiente de mi sistema operativo
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);

app.set("port", process.env.PORT || 3000);



app.listen(app.get("port"), () => {
    console.log("server on port 3000 and asignated port: " + app.get("port"));
  
});

