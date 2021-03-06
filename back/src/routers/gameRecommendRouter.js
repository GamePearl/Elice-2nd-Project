import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import is from "@sindresorhus/is";
import { GameRecommendService } from "../services/gameRecommendService";
import { GameRecommendCacheService } from "../services/gameRecommendCacheService";

const GameRecommendRouter = Router();
GameRecommendRouter.use(loginRequired);

GameRecommendRouter.get("/results/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const data = await GameRecommendCacheService.getRecommendData({ userId });
  const games = await GameRecommendService.getRecommendGames({ data });
  //find gameRecommendData with 3 genres
  //filter by tags
  //get random 5 ->
  res.status(200).send(games);
});

GameRecommendRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, genre, answer } = req.body;
    // 위 데이터를 유저 db에 추가하기
    const recommendData = await GameRecommendCacheService.addRecommendData({
      userId,
      genre,
      answer,
    });
    res.status(201).send(recommendData);
  } catch (error) {
    next(error);
  }
});

GameRecommendRouter.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await GameRecommendCacheService.deleteRecommendData({
      userId,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { GameRecommendRouter };
