import React, { useState } from "react";
import { Button, Snackbar, Alert, Grid } from "@mui/material";
import { Review } from "store/product/types";
import { FeedbackForm } from "components/forms";
import { ReviewElement, ReviewChart } from "components/product";

type ReviewContainerProps = {
  reviews?: Review[];
};

export const ReviewContainer = ({
  reviews,
}: ReviewContainerProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = (submit?: boolean) => {
    setOpen(false);
    submit && setShowAlert(true);
  };

  const handleCloseAlert = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
  };
  return (
    <>
      <Snackbar open={showAlert} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Feedback submitted!
        </Alert>
      </Snackbar>
      <FeedbackForm open={open} onClose={handleCloseDialog} />
      {reviews && (
        <Grid container rowGap={4}>
          <Grid item xs={10} md={6}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              fullWidth
              size="large"
              color="secondary"
            >
              Leave Review
            </Button>
          </Grid>
          <Grid item xs={12} height="300px">
            <ReviewChart />
          </Grid>
          <Grid item >
            {reviews.map((review) => (
              <ReviewElement
                key={review.email + review.createdDate}
                review={review}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};
