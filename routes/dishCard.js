import routerx from "express-promise-router";
import dishCardController from "../controllers/DishCardController";
//import auth from "../middlewares/auth";

const router = routerx();
//eliminar momentanamente  auth.verifyAdministradora, regresarlo cuando ya se implemente login
router.post("/add", dishCardController.add);
router.get("/query", dishCardController.query);
router.get("/list", dishCardController.list);
router.put("/update", dishCardController.update);
router.delete("/remove", dishCardController.remove);
router.put("/activate", dishCardController.activate);
router.put("/deactivate", dishCardController.deactivate);

export default router;
