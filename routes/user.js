import routerx from "express-promise-router";
import userController from "../controllers/UserController";
import auth from "../middlewares/auth";
const router = routerx();

router.post("/add",  userController.add);
router.get("/query", auth.verifyAdministradora, userController.query);
router.get("/list", userController.list);
router.put("/update", auth.verifyAdministradora, userController.update);
router.delete("/remove", auth.verifyAdministradora, userController.remove);
router.put("/activate", auth.verifyAdministradora, userController.activate);
router.put("/deactivate", auth.verifyAdministradora, userController.deactivate);
router.post("/login", userController.login);

export default router;
