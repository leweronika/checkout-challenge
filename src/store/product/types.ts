export type Product = {
  name: string;
  seller: string;
  description: string;
  averageRating: number;
  price: number; // currency?
  stock: number;
  reviews: Review[];
};

export type Review = {
  firstName: string;
  lastName: string; // capitalise when entered in form
  email: string; // validation on this
  rating: number;
  comment: string;
  createdDate: string; // date library?
};

export type ProductChartData = {
  x: string;
  y: number;
};
