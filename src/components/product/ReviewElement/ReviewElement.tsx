import React from "react";
import { Box, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { Review } from "store/product/types";
import { Rating } from 'components/common';

type ReviewProps = {
  review: Review;
};

export const ReviewElement = ({ review }: ReviewProps): JSX.Element => {
  const theme = useTheme();
  const notSmall = useMediaQuery(theme.breakpoints.up('sm'));
  return (
  <Paper
    sx={{
      display: "grid",
      gridTemplateRows: "repeat(3)",
      mt: 2,
      mb: 2,
      p: 3,
      rowGap: 1,
    }}
    data-testid="review-element"
  >
    <Box display="flex" alignItems="center" flexWrap={notSmall ? 'nowrap' : 'wrap'}>
      <Typography variant="h6" component="h6" mr={2}>
        {`${review.firstName} ${review.firstName[0].toUpperCase()}.`}
      </Typography>
      <Rating value={review.rating} readOnly />
    </Box>

    <Typography variant="caption" display="block" gutterBottom>
      {review.createdDate}
    </Typography>

    <Typography variant="body1" gutterBottom>
      {review.comment}
    </Typography>
  </Paper>
)};
