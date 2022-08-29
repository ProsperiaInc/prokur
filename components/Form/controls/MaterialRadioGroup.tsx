/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import merge from 'lodash/merge';
import React from 'react';
import {
  ControlProps,
  showAsRequired,
  isDescriptionHidden,
  OwnPropsOfEnum
} from '@jsonforms/core';
import {
  Box,
  FormControl,
  FormControlLabel,
  formControlLabelClasses,
  FormHelperText,
  FormLabel,
  Grid,
  Hidden,
  Radio,
  radioClasses,
  RadioGroup,
  Typography,
  typographyClasses
} from '@mui/material';
import { useFocus } from '../util';
import styled from '@emotion/styled';

const StyledRadioGroup = styled(RadioGroup)(({ theme, checked }: any) => ({
  paddingTop: '10px',
  paddingBottom: '10px',
  flexDirection: 'row',
  [theme.breakpoints.down('lg')]: {
    flexWrap: 'wrap'
  },
  flexWrap: 'initial'
}))

const StyledTypography = styled(Typography)(({ theme, checked }: any) => ({
  [`&.${typographyClasses.root}`]: {
    marginTop: '-25px',
    position: 'absolute',
    color: checked ? theme.palette.primary.main : theme.palette.secondary.dark,
    fontWeight: '700',
    left: '0',
    width: '100%',
    textAlign: 'center'
  }
}))


const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }: any) => ({
  [`&.${formControlLabelClasses.root}`]: {
    height: '115px',
    minWidth: '140px',
    border: checked ? `3px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.secondary.dark}`,
    background: checked ? 'rgba(25, 118, 210, 0.2)' : '#fff',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    marginLeft: 0,
    marginRight: 0,
    transition: '.5s border, .5s background',
    [`&:hover`]: {
      border: `3px solid ${theme.palette.primary.main}`,
      background: 'rgba(25, 118, 210, 0.2)'
    },
    [`& .${formControlLabelClasses.label}`]: {
      fontSize: '32px',
      fontWeight: '700',
      color: checked ? theme.palette.primary.main : theme.palette.secondary.dark
    },
    [`& .${radioClasses.control}`]: {
      display: 'none'
    }
  },
}));

export const MaterialRadioGroup = (props: ControlProps & OwnPropsOfEnum) => {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    config,
    id,
    label,
    required,
    description,
    errors,
    data,
    visible,
    options,
    handleChange,
    path,
    enabled
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge(
    {},
    config,
    props.uischema.options
  );
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );
  const onChange = (_ev:any, value:any) => handleChange(path, value);

  return (
    <Hidden xsUp={!visible}>
      <FormControl
        component={'fieldset'}
        fullWidth={!appliedUiSchemaOptions.trim}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <FormLabel
          htmlFor={id}
          error={!isValid}
          component={'legend'}
          required={showAsRequired(required, appliedUiSchemaOptions.hideRequiredAsterisk)}
        >
          {label}
        </FormLabel>

        <Grid container>
          <StyledRadioGroup
            value={props.data}
            onChange={onChange}
          >
            {options.map((option, idx) => (
              <Box component='span' sx={{ position: 'relative', marginRight: '10px' }}>
                <StyledFormControlLabel
                  value={option.value}
                  key={option.label}
                  checked={data === option.value}
                  control={<Radio checked={data === option.value} sx={{ display: 'none' }} />}
                  label={option.label}
                  disabled={!enabled}
                />
                <StyledTypography variant='caption' checked={data === option.value}>{appliedUiSchemaOptions?.enum_titles?.[idx]}</StyledTypography>
              </Box>
            ))}
          </StyledRadioGroup>
        </Grid>
        <FormHelperText error={!isValid}>
          {!isValid ? errors : showDescription ? description : null}
        </FormHelperText>
      </FormControl>
    </Hidden>
  );
};
