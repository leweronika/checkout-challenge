import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Product, ProductChartData, Review } from "store/product/types";
import { ChartData, ProductData } from "store/product/dummyData";

type ProductState = {
  product: Product;
  productChartData: ProductChartData[]; // assumption, reviews already sorted in date order
}

const initialState: ProductState = {
  product: ProductData,
  productChartData: ChartData,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.product?.reviews.unshift(action.payload);
      const { product } = state;
      const average =
        state.product.reviews.reduce((a, b) => a + b.rating, 0) /
        state.product.reviews.length;
      product.averageRating = average;
      state.productChartData.push({
        x: action.payload.createdDate,
        y: average,
      });
    },
  },
});

export const { addReview } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.product;
export const selectProductChartData = (state: RootState) =>
  state.product.productChartData;

export default productSlice.reducer;
