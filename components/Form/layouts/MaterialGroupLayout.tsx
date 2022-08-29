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
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Card, CardContent, CardHeader, Grid, Hidden } from '@mui/material';
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  withIncreasedRank,
} from '@jsonforms/core';
import {
  MaterialLabelableLayoutRendererProps,
  MaterialLayoutRenderer,
} from '../util/layout';
import { withJsonFormsLayoutProps } from '@jsonforms/react';

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));
const style: { [x: string]: any } =  { marginBottom: '10px', border: '0', display: 'flex', width: '100%' };

const GroupComponent = React.memo(({ visible, enabled, uischema, label, ...props }: MaterialLabelableLayoutRendererProps) => {
  const groupLayout = uischema as GroupLayout;
  return (
    <Hidden xsUp={!visible}>
      <Card style={style} variant='outlined'>
        <Grid item xs={4}>
          {!isEmpty(label) && (
            <CardHeader title={label} />
          )}
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <MaterialLayoutRenderer {...props} visible={visible} enabled={enabled} elements={groupLayout.elements} />
          </CardContent>
        </Grid>
      </Card>
    </Hidden>
  );
});

export const MaterializedGroupLayoutRenderer = ({ uischema, schema, path, visible, enabled, renderers, cells, direction, label }: LayoutProps) => {
  const groupLayout = uischema;

  return (
    <GroupComponent
      elements={groupLayout.elements}
      schema={schema}
      path={path}
      direction={direction}
      visible={visible}
      enabled={enabled}
      uischema={uischema}
      renderers={renderers}
      cells={cells}
      label={label}
    />
  );
};

export default withJsonFormsLayoutProps(MaterializedGroupLayoutRenderer);

export const materialGroupTester: RankedTester = withIncreasedRank(
  1,
  groupTester
);
