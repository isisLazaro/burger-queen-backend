import routerx from "express-promise-router";
import dishTypeController from "../controllers/DishTypeController";
import auth from "../middlewares/auth";

const router = routerx();
//eliminar momentanamente  auth.verifyAdministradora, regresarlo cuando ya se implemente login
router.post("/add", dishTypeController.add);
router.get("/query", dishTypeController.query);
router.get("/list", dishTypeController.list);
router.put("/update", dishTypeController.update);
router.delete("/remove", dishTypeController.remove);
router.put("/activate", dishTypeController.activate);
router.put("/deactivate", dishTypeController.deactivate);

export default router;