import models from "../models";

export default {
  //en seccion administradora
  add: async (req, res, next) => {
    try {
      //console.log("Body", req.body);
      const reg = await models.DishCard.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at adding a category"
      });
      next(e);
    }
  },
  //en seccion administradora
  query: async (req, res, next) => {
    try {
      const reg = await models.DishCard.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Register does not exist "
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at querying a category"
      });
      next(e);
    }
  },
  //en seccion administradora y en la carta
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.DishCard.find(
        {
          $or: [
            { categoria: new RegExp(valor, "i") },
            { foto: new RegExp(valor, "i") }
          ]
        },
        { createdAt: 0 }
      ).sort({ createdAt: 1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at listing a category"
      });
      next(e);
    }
  },
  //en seccion administradora
  update: async (req, res, next) => {
    try {
      const reg = await models.DishCard.findByIdAndUpdate(
        { _id: req.body._id },
        { categoria: req.body.categoria },
        { foto: req.body.foto }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at updating a category"
      });
      next(e);
    }
  },
  //en seccion administradora
  remove: async (req, res, next) => {
    try {
      const reg = await models.DishCard.findByIdAndDelete({
        _id: req.body._id
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at removing a category"
      });
      next(e);
    }
  },
  //en seccion administradora
  activate: async (req, res, next) => {
    try {
      const reg = await models.DishCard.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at activating a category"
      });
      next(e);
    }
  },
  //en seccion administradora
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.DishCard.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "An error ocurred at deactivating a category"
      });
      next(e);
    }
  }
};
