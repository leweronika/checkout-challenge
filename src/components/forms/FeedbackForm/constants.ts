import { Review } from "store/product/types";

export type FeedbackFormFields = Omit<Review, "id" | "createdDate">;

export const defaultValues: FeedbackFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  comment: "",
  rating: 0,
};
