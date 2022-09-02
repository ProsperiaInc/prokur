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
import React, { useEffect } from 'react';
import {
  isStringControl,
  rankWith,
  scopeEndsWith
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import MuiInputTags from '../mui-controls/MuiTagField/MuiTagField';

export const MaterialTagsControl = (props: any) => {
  const [value, setValue] = React.useState<any>();
  const onChange = (ev: any) => {
    const updatedValue = [...(Array.isArray(props.value) ? props.value: !!props.value ? [props.value]: []), ...ev.target.value]
    setValue(updatedValue)
    props.handleChange(props.path, updatedValue);
  }

  useEffect(() => {
    if(props.data !== undefined && value === undefined) {
      setValue(props.data)
    }
  }, [props.data])

  console.warn({ data: props.data, value });
  

  return (
    <MuiInputTags
      {...props}
      field={{
        label: props.label,
        name: props.name,
      }}
      value={value || []}
      onChange={onChange}
    />
  )
};

export const materialTagsControlTester = rankWith(
  3, // increase rank as needed
  scopeEndsWith('Tags')
);
export default withJsonFormsControlProps(MaterialTagsControl);
