import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "utils/hooks";
import { addReview } from "store/product/productSlice";
import { Review } from "store/product/types";
import { RatingInput, TextFieldInput } from "components/forms/common";
import { FeedbackFormFields, defaultValues } from "./constants";

type FeedbackFormProps = {
  open: boolean;
  onClose: (submit?: boolean) => void;
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Surname is required"),
    email: yup.string().email("Invalid email").required("Email required "),
    rating: yup.number().moreThan(0, "Rating must be greater than 0"),
    comment: yup.string().required("Feedback required"),
  })
  .required();

export const FeedbackForm = ({
  open,
  onClose,
}: FeedbackFormProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { handleSubmit, control, setValue, reset } =
    useForm<FeedbackFormFields>({
      defaultValues,
      resolver: yupResolver(schema),
    });

  const onCancel = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FeedbackFormFields> = (data) => {
    const newReview: Review = {
      ...data,
      createdDate: new Date().toDateString(),
    };

    dispatch(addReview(newReview));
    reset();
    onClose(true);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="feedback-dialog-title" 
    >
      <DialogTitle id="feedback-dialog-title">
        Please submit your feedback for us here
      </DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          rowGap={2}
          component="form"
          aria-label="feedback-form"
          mt={2}
        >
          <Grid container flexWrap="nowrap" gap={2}>
            <Grid item xs={6}>
              <TextFieldInput
                name="firstName"
                control={control}
                label="First Name"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldInput
                name="lastName"
                control={control}
                label="Surname"
                required
              />
            </Grid>
          </Grid>
          <TextFieldInput
            name="email"
            control={control}
            label="Email Address"
            required
          />
          <RatingInput
            label="Rating"
            name="rating"
            control={control}
            setValue={setValue}
          />
          <TextFieldInput
            name="comment"
            control={control}
            label="Feedback"
            multiline
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onCancel}
          variant="contained"
          sx={{
            bgcolor: theme.palette.secondary.light
          }}
          color="secondary"
        >
          Discard
        </Button>
        <Button onClick={handleSubmit(onSubmit)} autoFocus variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
