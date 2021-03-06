import { ReviewModel } from "../index";

const Review = {
  create: async ({ newReview }) => {
    const createdNewReview = await ReviewModel.create(newReview);
    return createdNewReview;
  },

  findById: async ({ reviewId }) => {
    const review = await ReviewModel.findOne({ reviewId }).populate("writer");
    return review;
  },

  findAllByGame: async ({ gameId }) => {
    const reviews = await ReviewModel.find({ gameId }).populate("writer");
    return reviews;
  },

  findAllByUser: async ({ writer }) => {
    const reviews = await ReviewModel.find({ writer });
    return reviews;
  },

  update: async ({ reviewId, toUpdate }) => {
    const filter = { reviewId };
    const update = toUpdate;
    const option = { returnOriginal: false };
    const updateReview = await ReviewModel.findOneAndUpdate(
      filter,
      update,
      option
    ).populate("writer");

    return updateReview;
  },

  delete: async ({ reviewId }) => {
    await ReviewModel.deleteOne({ reviewId });
  },
};

export { Review };
