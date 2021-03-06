import { LikeModel } from "../schemas/like";

const Like = {
  create: async ({ newLike }) => {
    await LikeModel.create(newLike);
  },

  findByFilter: async (filter) => {
    const like = await LikeModel.findOne(filter);
    return like;
  },

  findAllByUser: async ({ userId }) => {
    const likes = await LikeModel.find({ userId });
    return likes;
  },

  delete: async (filter) => {
    await LikeModel.deleteOne(filter);
  },

  deleteAllByArticle: async ({ articleId }) => {
    await LikeModel.deleteMany({ articleId });
  },

  deleteAllByUser: async ({ userId }) => {
    await LikeModel.deleteMany({ userId });
  },
};
export { Like };
