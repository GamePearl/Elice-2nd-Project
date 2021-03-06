import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { PointService } from "../services/pointService";

const PointRouter = Router();
PointRouter.use(loginRequired);

PointRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { route, point } = req.body;

    const newPoint = { userId, route, point };

    await PointService.addPoint({ newPoint });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

PointRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const route = req.query.route;

    const point = await PointService.checkPoint({
      userId,
      route,
    });
    res.status(200).json(point);
  } catch (error) {
    next(error);
  }
});

export { PointRouter };
