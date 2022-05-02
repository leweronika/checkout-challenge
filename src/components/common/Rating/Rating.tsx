import React from "react";
import { Box, Rating as MuiRating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type RatingProps = {
  value?: number;
  onChange?: (_event: any, newValue: null | number) => void;
  readOnly?: boolean;
  precision?: number;
};

export const Rating = ({
  value,
  readOnly,
  ...props
}: RatingProps): JSX.Element => (
    <Box
        sx={{
        display: "flex",
        alignItems: "center",
        }}
    >
    <MuiRating size="large" value={readOnly ? value : undefined} readOnly={readOnly} {...props} emptyIcon={<StarIcon style={{ opacity: 0.35, color: 'gray' }} fontSize="inherit" />}/> 
    {!!value && (
        <Box sx={{ ml: 1.5 }} data-testid="rating-value">
        {+value.toFixed(1)}
        </Box>
    )}
    </Box>
);