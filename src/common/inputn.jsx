import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";
//import "./Input.scss";

// Material-ui overides
// https://v4-5-2.material-ui.com/api/input/

export default function Input({
  id,
  name,
  isInvalid,
  handleIsInvalid,
  ...other
}) {
  return (
    <TextField
      {...other}
      id={id}
      name={name}
      aria-describedby={`This is the ${name} input field`}
      variant="outlined"
      error={isInvalid}
      onBlur={handleIsInvalid}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isInvalid !== null && !isInvalid}
          </InputAdornment>
        ),
      }}
    />
  );
}

Input.propTypes = {
  /**
   * The id of the input element is required. Use this prop to make label and helperText accessible for screen readers.
   */
  id: PropTypes.string,
  /**
   * Name attribute of the input element. The name is used in announcing the form control to screen readers.
   */
  name: PropTypes.string,
  /**
   * If true, the label will be displayed in an error state.
   */
  isInvalid: PropTypes.bool,
  /**
   *
   */
  handleIsInvalid: PropTypes.func,
};

Input.defaultProps = {
  isInvalid: null,
  handleIsInvalid: null,
};
