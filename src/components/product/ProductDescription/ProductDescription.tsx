import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Rating } from 'components/common/Rating/Rating';

type ProductDescriptionProps = {
  name: string;
  seller: string;
  description: string;
  averageRating: number;
  stock: number;
};

export const ProductDescription = ({
  name,
  seller,
  description,
  stock,
  averageRating,
}: ProductDescriptionProps): JSX.Element => (
  <Box
    sx={{ display: "grid", gridTemplateRows: "repeat(5)", color: "white" }}
    rowGap={3}
  >
    <Typography variant="h2" component="div" >
      {name}
    </Typography>
    <Typography variant="subtitle1" component="div">
      {seller}
    </Typography>
    <Typography variant="body1" component="div">
      {description}
    </Typography>
    <Box
      sx={{
        width: 200,
      }}
    >
      <Rating
        value={averageRating}
        readOnly
        precision={0.1}
      />
      </Box>
    <Button variant="contained" fullWidth disabled={stock < 1} size="large">
      {stock > 0 ? "BUY NOW" : "SOLD OUT"}
    </Button>
  </Box>
);
