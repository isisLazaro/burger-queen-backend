import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

export default {
  //funciones de middleware
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.User.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at adding a user"
      });
      //mostrar el error en el middlware morgan
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Register does not exist "
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at querying a user"
      });
      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.User.find(
        { nombre: new RegExp(valor, "i") },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at listing a user"
      });
      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      let pass = req.body.password;
      const reg0 = await models.User.findOne({ _id: req.body._id });
      if (pass != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          nombre: req.body.nombre,
          rol: req.body.rol,
          tipo_documento: req.body.tipo_documento,
          num_documento: req.body.num_documento,
          direccion: req.body.direccion,
          telefono: req.body.telefono,
          password: req.body.password
        }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at updating a user"
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at removing a user"
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at activating a user"
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at deactivating a user"
      });
      next(e);
    }
  },
  login: async (req, res, next) => {
    //aqui el problema con el ususario
    try {
      let user = await models.User.findOne({
        nombre: req.body.nombre,
        estado: 1
      });
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id, user.rol, user.nombre);
          res.status(200).json({ user, tokenReturn });
        } else {
          res.status(404).send({
            message: "Password incorrecto en login"
          });
        }
      } else {
        res.status(404).send({
          message: " no existe el usuario en login"
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error"
      });
      next(e);
    }
  }
};
