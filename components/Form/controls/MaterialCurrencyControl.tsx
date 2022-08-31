/*
  The MIT License

  Copyright (c) 2018-2019 EclipseSource Munich
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
import React from 'react';
import {
  isStringControl,
  rankWith,
  scopeEndsWith
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import CurrencyTextField from '../mui-controls/MuiInputCurrency';
import merge from 'lodash/merge';

export const MaterialCurrencyControl = (props: any) => {
  const {
    data,
    config,
    id,
    enabled,
    uischema,
    schema,
  } = props
  const maxLength = schema.maxLength;
  const [value, setValue] = React.useState(data);
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const onChange = (ev: any) => {
    setValue(ev.target.value.replace(',', ''));
    props.handleChange(props.path, ev.target.value.replace(',', ''));
  }
  
  return (
    <CurrencyTextField
      {...props}
      variant='outlined'
      name='price'
      currencySymbol='$'
      minimumValue='0'
      outputFormat='number'
      decimalCharacter='.'
      margin='dense'
      digitGroupSeparator=','
      modifyValueOnWheel={false}
      value={value}
      onBlur={onChange}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      multiline={appliedUiSchemaOptions.multi}
      rows={appliedUiSchemaOptions.rows}
      fullWidth={!appliedUiSchemaOptions.trim || maxLength === undefined}
    />
  )
};

export const materialCurrencyControlTester = rankWith(
  3, // increase rank as needed
  scopeEndsWith('Currency')
);
export default withJsonFormsControlProps(MaterialCurrencyControl);
