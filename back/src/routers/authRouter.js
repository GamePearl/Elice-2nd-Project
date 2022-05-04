import { Router } from "express";
import { GithubService } from "../services/githubService";

const AuthRouter = Router();

AuthRouter.get("/github", async (req, res, next) => {
  try {
    const code = req.query.code;
    const user = await GithubService.getToken({ code });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export { AuthRouter };
