import React from "react";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <React.Fragment>
      <label>{label}</label>
      <input {...otherProps} />
    </React.Fragment>
  );
};

export default FormInput;
