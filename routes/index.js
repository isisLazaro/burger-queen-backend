import routerx from "express-promise-router";
import dishCardRouter from "./dishCard";
import dishTypeRouter from "./dishType";
import userRouter from "./user";

const router = routerx();

router.use("/dishcard", dishCardRouter);
router.use("/user", userRouter);
router.use("/dishtype", dishTypeRouter);

export default router;
