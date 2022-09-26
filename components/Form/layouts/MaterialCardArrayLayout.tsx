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
import range from 'lodash/range';
import React, { useState, useCallback, ComponentType, Dispatch, Fragment, ReducerAction, useMemo, useEffect } from 'react';
import {
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
  ControlElement,
  findUISchema,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  moveDown,
  moveUp,
  Resolve,
  update,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  getFirstPrimitiveProp,
  createId,
  removeId
} from '@jsonforms/core';
import get from 'lodash/get';
import map from 'lodash/map';
import merge from 'lodash/merge';
import { JsonFormsStateContext, withJsonFormsContext } from '@jsonforms/react';
import {
  Avatar,
  Paper,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Stack
} from '@mui/material';
import {
  MdDelete,
  MdArrowUpward,
  MdArrowDownward
} from 'react-icons/md'

export interface ArrayLayoutToolbarProps {
  label: string;
  errors: string;
  path: string;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
}
export const ArrayLayoutToolbar = React.memo(
  ({ label }: ArrayLayoutToolbarProps) => {
    return (
      <Toolbar disableGutters={true}>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item>
            <Typography variant={'h6'}>{label}</Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography>Remove</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
);
const iconStyle: any = { float: 'right' };

interface OwnPropsOfExpandPanel {
  index: number;
  path: string;
  uischema: ControlElement;
  schema: JsonSchema;
  expanded: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  uischemas?: JsonFormsUISchemaRegistryEntry[];
  rootSchema: JsonSchema;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
  config: any;
  childLabelProp?: string;
  handleExpansion(panel: string): (event: any, expanded: boolean) => void;
}
interface StatePropsOfExpandPanel extends OwnPropsOfExpandPanel {
  childLabel: string;
  childPath: string;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
}
/**
 * Dispatch props of a table control
 */
export interface DispatchPropsOfExpandPanel {
  removeItems(path: string, toDelete: number[]): (event: any) => void;
  moveUp(path: string, toMove: number): (event: any) => void;
  moveDown(path: string, toMove: number): (event: any) => void;
}

export interface ExpandPanelProps extends StatePropsOfExpandPanel, DispatchPropsOfExpandPanel {}

const ExpandPanelRendererComponent = (props: ExpandPanelProps) => {
  const [labelHtmlId] = useState<string>(createId('expand-panel'));
  useEffect(() => { return () => { removeId(labelHtmlId) }}, [labelHtmlId]);
  let {
    childTitle,
    childSubtitle,
    childPath,
    index,
    expanded,
    moveDown,
    moveUp,
    enableMoveDown,
    enableMoveUp,
    handleExpansion,
    removeItems,
    path,
    rootSchema,
    schema,
    uischema,
    uischemas,
    showSortButtons,
    showArrayLayoutSortButtons,
    renderers,
    cells,
    config
  } = props;

  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );
  // const appliedUiSchemaOptions = merge({}, config, uischema.options);
  showSortButtons = showSortButtons || showArrayLayoutSortButtons;
  return (
    <Grid container justifyContent='space-between'>
      <Grid item sx={{ width: '83%' }}>
        <Paper
          variant="outlined"
          sx={{ padding: '18px', marginY: '5px' }}
          // aria-labelledby={labelHtmlId}
          // expanded={expanded}
          // onChange={handleExpansion(childPath)}
        >
          <Grid>
            <Grid container alignItems={'center'}>
              <Grid item xs={7} md={9}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar aria-label='Index'>{index + 1}</Avatar>
                  <Stack>
                    <strong id={labelHtmlId}>{childTitle}</strong>
                    <span>{childSubtitle}</span>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={5} md={3}>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Grid
                      container
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                    >
                      {showSortButtons ? (
                        <Fragment>
                          <Grid item>
                            <IconButton
                              onClick={moveUp(path, index)}
                              style={iconStyle}
                              disabled={!enableMoveUp}
                              aria-label={`Move up`}
                              size='large'>
                              <MdArrowUpward />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton
                              onClick={moveDown(path, index)}
                              style={iconStyle}
                              disabled={!enableMoveDown}
                              aria-label={`Move down`}
                              size='large'>
                              <MdArrowDownward />
                            </IconButton>
                          </Grid>
                        </Fragment>
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <AccordionDetails>
            <JsonFormsDispatch
              schema={schema}
              uischema={foundUISchema}
              path={childPath}
              key={childPath}
              renderers={renderers}
              cells={cells}
            />
          </AccordionDetails> */}
        </Paper>
      </Grid>
      <Grid item alignItems='center' display='flex'>
        <IconButton
          color='error'
          onClick={removeItems(path, [index])}
          style={iconStyle}
          aria-label={`Delete`}
          size='large'>
          <MdDelete />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const ExpandPanelRenderer = React.memo(ExpandPanelRendererComponent);

/**
 * Maps state to dispatch properties of an expand pandel control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an expand panel control
 */
export const ctxDispatchToExpandPanelProps: (
  dispatch: Dispatch<ReducerAction<any>>
) => DispatchPropsOfExpandPanel = dispatch => ({
  removeItems: useCallback((path: string, toDelete: number[]) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        toDelete
          .sort()
          .reverse()
          .forEach(s => array.splice(s, 1));
        return array;
      })
    );
  }, [dispatch]),
  moveUp: useCallback((path: string, toMove: number) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        moveUp(array, toMove);
        return array;
      })
    );
  }, [dispatch]),
  moveDown: useCallback((path: string, toMove: number) => (event: any): void => {
    event.stopPropagation();
    dispatch(
      update(path, array => {
        moveDown(array, toMove);
        return array;
      })
    );
  }, [dispatch])
});

/**
 * Map state to control props.
 * @param state the JSON Forms state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const withContextToExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> => ({
  ctx,
  props
}: JsonFormsStateContext & ExpandPanelProps) => {
  const dispatchProps = ctxDispatchToExpandPanelProps(ctx.dispatch);
  const { title, subtitle, schema, path, index, uischemas } = props;
  const childPath = composePaths(path, `${index}`);
  const childData = Resolve.data(ctx.core.data, childPath);
  const childTitle = title ? get(childData, title, '') : get(childData, getFirstPrimitiveProp(schema), '');
  const childSubtitle = subtitle ? get(childData, subtitle, '') : get(childData, getFirstPrimitiveProp(schema), '');

  return (
    <Component
      {...props}
      {...dispatchProps}
      childSubtitle={childSubtitle}
      childTitle={childTitle}
      childPath={childPath}
      uischemas={uischemas}
    />
  );
};

export const withJsonFormsExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  withJsonFormsContext(
    withContextToExpandPanelProps(Component));

const ExpandPanelRendererWrapper =  withJsonFormsExpandPanelProps(ExpandPanelRenderer);


const MaterialCardArrayLayoutComponent = (props: ArrayLayoutProps)=> {
  const [expanded, setExpanded] = useState<string|boolean>(false);
  const innerCreateDefaultValue = useCallback(() => createDefaultValue(props.schema), [props.schema]);
  const handleChange = useCallback((panel: string) => (_event: any, expandedPanel: boolean) => {
    setExpanded(expandedPanel ? panel : false)
  }, []);
  const isExpanded = (index: number) => 
    expanded === composePaths(props.path, `${index}`);
  
  const {
    data,
    path,
    schema,
    uischema,
    errors,
    addItem,
    renderers,
    cells,
    label,
    required,
    rootSchema,
    config,
    uischemas
  } = props;
  const appliedUiSchemaOptions = merge(
    {},
    config,
    props.uischema.options
  );

  return (
    <div>
      <ArrayLayoutToolbar
        label={computeLabel(
          label,
          required,
          appliedUiSchemaOptions.hideRequiredAsterisk
        )}
        errors={errors}
        path={path}
        addItem={addItem}
        createDefault={innerCreateDefaultValue}
      />
      <div>
        {data > 0 ? (
          map(range(data), index => {
            return (
              <ExpandPanelRendererWrapper
                index={index}
                expanded={isExpanded(index)}
                schema={schema}
                path={path}
                handleExpansion={handleChange}
                uischema={uischema}
                renderers={renderers}
                cells={cells}
                key={index}
                rootSchema={rootSchema}
                enableMoveUp={index != 0}
                enableMoveDown={index < data - 1}
                config={config}
                {...appliedUiSchemaOptions}
                // .elementLabelProp}
                uischemas={uischemas}
              />
            );
          })
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export const MaterialCardArrayLayout = React.memo(MaterialCardArrayLayoutComponent);
