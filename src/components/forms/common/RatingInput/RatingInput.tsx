import React, { useState } from "react";
import { Box, FormHelperText } from "@mui/material";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import { Rating } from 'components/common';

type RatingInputProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  label?: string;
};

export const RatingInput = ({
  name,
  control,
  setValue,
  label,
}: RatingInputProps): JSX.Element => {
  const [ratingValue, setRatingValue] = useState<number>();

  const onRatingChange = (_event: React.SyntheticEvent, newValue: null | number) => {
    const value = typeof newValue === "number" ? newValue : 0;
    setRatingValue(value);
    setValue("rating", value);
  }; 
  return (
    <Box sx={{ display: 'grid'}} rowGap={1}>
      <div>{label}</div>
      <Controller
        name={name}
        control={control}
        render={({ fieldState }) => (
          <>
            <Rating onChange={onRatingChange} value={ratingValue} /> 
            {!!fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
          </>
        )}
      />
      </Box>
  );
};
