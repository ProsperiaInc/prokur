import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from '@mui/material';
import classes from './TextFieldLabelWrapper.module.css';

export default function TextFieldLabelWrapper({ children, label, required }: any) {
  return (
    <>
      <div className={label ? '' : classes['text-field-label-wrapper-label-container']}>
        <InputLabel required={required}>{label}</InputLabel>
      </div>
      {children}
    </>
  );
}

TextFieldLabelWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

TextFieldLabelWrapper.defaultProps = {
  required: false,
};
