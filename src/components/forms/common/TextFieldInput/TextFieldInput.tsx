import React from "react";
import { TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";

type TextFieldInputProps = {
  name: string;
  control: Control<any>;
  label?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
};

export const TextFieldInput = ({
  name,
  control,
  label,
  multiline,
  rows = 4,
  required,
}: TextFieldInputProps): JSX.Element => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        required={required}
        multiline={multiline}
        rows={rows}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
);
