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
import { Button, Card, CardContent, CardHeader, Grid, Hidden } from '@mui/material';
import { withJsonFormsContext, withJsonFormsLayoutProps } from '@jsonforms/react';
import { composePaths, createDefaultValue, getFirstPrimitiveProp, rankWith, Resolve, uiTypeIs, update, withIncreasedRank } from '@jsonforms/core';
import { MaterialLayoutRenderer } from '@jsonforms/material-renderers';
import { get, merge } from 'lodash';

export interface DispatchPropsOfArrayControl {
  addItem(to: string, from: string, value: any): () => void;
}

export const ctxDispatchToArrayProps: (dispatch: any) => DispatchPropsOfArrayControl = dispatch => ({
  addItem: (to: string, from: string, value: any) => () => {
    dispatch(
      update(to, array => {
        if (array === undefined || array === null) {
          return [value];
        }
        array.push(value);
        return array;
      })
    );
    dispatch(
      update(from, () => ({}))
    )
  }
});

export const withContextToArrayProps = (Component: any): any => ({ ctx, props }: any) => {
  const dispatchProps = ctxDispatchToArrayProps(ctx.dispatch);  
  const { childLabelProp, schema, path, index, uischemas } = props;
  const childPath = composePaths(path, `${index}`);
  const childData = Resolve.data(ctx.core.data, childPath);
  const childLabel = childLabelProp
    ? get(childData, childLabelProp, '')
    : get(childData, getFirstPrimitiveProp(schema), '');

  return (
    <Component
      {...props}
      {...dispatchProps}
      childLabel={childLabel}
      childPath={childPath}
      uischemas={uischemas}
    />
  );
};

export const withJsonFormsArrayProps = (
  Component: any
): any =>
  withJsonFormsContext(
    withContextToArrayProps(Component));

export const groupTester = rankWith(1, uiTypeIs('Group'));
const style = { marginBottom: '10px', border: '0', display: 'flex', width: '100%' };

const GroupComponent = React.memo(({ visible, enabled, schema, uischema, config, path, label, data, ...props }: any) => {
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const addItem = () => appliedUiSchemaOptions.addTo && appliedUiSchemaOptions.addFrom && props.addItem(appliedUiSchemaOptions.addTo, appliedUiSchemaOptions.addFrom, data[appliedUiSchemaOptions.addFrom])

  const groupLayout = uischema;
  return (
    <Hidden xsUp={!visible}>
      <Card style={style} variant='outlined'>
        <Grid container>
          <Grid item xs={12} lg={4}>
            {!isEmpty(label) && (
              <CardHeader title={label} />
            )}
          </Grid>
          <Grid item xs={12} lg={8}>
            <CardContent>
              <MaterialLayoutRenderer {...props} visible={visible} enabled={enabled} elements={groupLayout.elements} />
              {!!appliedUiSchemaOptions.showAddButton ? (
                <Button
                  variant="outlined"
                  onClick={addItem()}
                  // color="primary"
                  // disabled={activeCategory >= categories.length - 1}
                  // onClick={() => handleStep(activeCategory + 1)}
                >
                  Add member
                </Button>
              ) : (<></>)}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Hidden>
  );
});

export const MaterializedGroupLayoutRenderer = ({ uischema, schema, path, visible, enabled, renderers, cells, direction, addItem, label, data } : any) => {
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
      addItem={addItem}
      data={data}
    />
  );
};

export default withJsonFormsLayoutProps(withJsonFormsContext(withContextToArrayProps(MaterializedGroupLayoutRenderer)));

export const materialGroupTester = withIncreasedRank(
  1,
  groupTester
);
