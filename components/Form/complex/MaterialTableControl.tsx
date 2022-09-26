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
import union from 'lodash/union';
import { useJsonForms } from '@jsonforms/react';
import startCase from 'lodash/startCase';
import range from 'lodash/range';
import React, { Fragment, useMemo } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  Hidden,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  Typography
} from '@mui/material';
import {
  errorsAt,
  formatErrorMessage,
  Paths,
  Resolve,
  encode,
  createDefaultValue
} from '@jsonforms/core';

import {
  MdArrowDownward,
  MdArrowUpward,
  MdAdd,
  MdDelete
} from 'react-icons/md'

import { WithDeleteDialogSupport } from './DeleteDialog';
import NoBorderTableCell from './NoBorderTableCell';
import TableToolbar from './TableToolbar';
import { ErrorObject } from 'ajv';
import merge from 'lodash/merge';
import { DispatchCell } from './DispatchCell';
import styled from '@emotion/styled';

const BorderlessTableCell = styled(TableCell)((
  {
    theme
  }
) => ({
  [`&.${tableCellClasses.root}`]: {
    borderBottom: 0,
    paddingLeft: 0
  }
  // [`& .${classes.textField}`]: {
  //   minHeight: 35,
  // }
}));

// we want a cell that doesn't automatically span
const styles = {
  fixedCell: {
    width: '150px',
    height: '50px',
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center'
  },
  fixedCellSmall: {
    width: '50px',
    height: '50px',
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center'
  }
};

const generateCells = (
  Cell: any,
  schema: any,
  rowPath: any,
  enabled: any,
  cells: any,
) => {
  if (schema.type === 'object') {
    return getValidColumnProps(schema).map(prop => {
      const cellPath = Paths.compose(rowPath, prop);
      const props = {
        propName: prop,
        schema,
        title: schema.properties?.[prop]?.title ?? startCase(prop),
        rowPath,
        cellPath,
        enabled,
        cells
      };
      return <Cell key={cellPath} {...props} />;
    });
  } else {
    // primitives
    const props = {
      schema,
      rowPath,
      cellPath: rowPath,
      enabled
    };
    return <Cell key={rowPath} {...props} />;
  }
};

const getValidColumnProps = (scopedSchema: any) => {
  if (scopedSchema.type === 'object' && typeof scopedSchema.properties === 'object') {
    return Object.keys(scopedSchema.properties).filter(
      prop => scopedSchema.properties[prop].type !== 'array'
    );
  }
  // primitives
  return [''];
};

const EmptyTable = ({ numColumns }: any) => (
  <TableRow>
    <NoBorderTableCell colSpan={numColumns}>
      <Typography align='center'>No data</Typography>
    </NoBorderTableCell>
  </TableRow>
);


const TableHeaderCell = React.memo(({ title }: any) => (
  <BorderlessTableCell sx={{ borderBottom: 0 }} >{title}</BorderlessTableCell>
));

const ctxToNonEmptyCellProps = (
  ctx: any,
  ownProps: any
) => {
  const path =
    ownProps.rowPath +
    (ownProps.schema.type === 'object' ? '.' + ownProps.propName : '');
  const errors = formatErrorMessage(
    union(
      (
        errorsAt(
          path as any,
          ownProps.schema as any,
          p => p === path
        )(ctx.core.errors) as any).map((error: any) => error.message)
    )
  );
  return {
    rowPath: ownProps.rowPath,
    propName: ownProps.propName,
    schema: ownProps.schema,
    rootSchema: ctx.core.schema,
    errors,
    path,
    enabled: ownProps.enabled,
    cells: ownProps.cells || ctx.cells,
    renderers: ownProps.renderers || ctx.renderers
  };
};

const controlWithLabel = (scope: any) => ({
  type: 'Control',
  scope: scope,
  variant: 'outlined'
})

const NonEmptyCellComponent = React.memo(({ path, propName, schema, rootSchema, errors, enabled, renderers, cells, isValid }: any) => {
  return (
    <NoBorderTableCell sx={{ paddingLeft: '0px', paddingTop: '16px', paddingBottom: '0' }}>
      {schema.properties ? (
        <DispatchCell
          schema={Resolve.schema(
            schema,
            `#/properties/${encode(propName)}`,
            rootSchema
          )}
          uischema={controlWithLabel(`#/properties/${encode(propName)}`) as any}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ) : (
        <DispatchCell
          schema={schema}
          uischema={controlWithLabel('#') as any}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      )}
      <FormHelperText error={!isValid}>{!isValid && errors}</FormHelperText>
    </NoBorderTableCell>
  );
});

const NonEmptyCell = (ownProps: any) => {
  const ctx = useJsonForms();
  const emptyCellProps = ctxToNonEmptyCellProps(ctx, ownProps);

  const isValid = isEmpty(emptyCellProps.errors);
  return <NonEmptyCellComponent {...emptyCellProps} isValid={isValid}/>
};


const NonEmptyRowComponent = 
  ({
    childPath,
    schema,
    rowIndex,
    openDeleteDialog,
    moveUpCreator,
    moveDownCreator,
    enableUp,
    enableDown,
    showSortButtons,
    enabled,
    cells,
    path
  }: any) => {
    const moveUp = useMemo(() => moveUpCreator(path, rowIndex),[moveUpCreator, path, rowIndex]);
    const moveDown = useMemo(() => moveDownCreator(path, rowIndex),[moveDownCreator, path, rowIndex]);
    return (
      <TableRow key={childPath}>
        {generateCells(NonEmptyCell, schema, childPath, enabled, cells)}
        {enabled ? (
          <NoBorderTableCell
            style={showSortButtons ? styles.fixedCell : styles.fixedCellSmall}
          >
            <Grid
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
            >
              {showSortButtons ? (
                <Fragment>
                  <Grid item>
                    <IconButton aria-label={`Move up`} onClick={moveUp} disabled={!enableUp} size='large'>
                      <MdArrowUpward />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label={`Move down`}
                      onClick={moveDown}
                      disabled={!enableDown}
                      size='large'>
                      <MdArrowDownward />
                    </IconButton>
                  </Grid>
                </Fragment>
              ) : null}
              <Grid item>
                <IconButton
                  aria-label={`Delete`}
                  onClick={() => openDeleteDialog(childPath, rowIndex)}
                  size='large'
                  color='error'
                >
                  <MdDelete />
                </IconButton>
              </Grid>
            </Grid>
          </NoBorderTableCell>
        ) : null}
      </TableRow>
    );
  };
export const NonEmptyRow = React.memo(NonEmptyRowComponent);

const TableRows = ({
  data,
  path,
  schema,
  openDeleteDialog,
  moveUp,
  moveDown,
  uischema,
  config,
  enabled,
  cells
}: any) => {
  const isEmptyTable = data === 0;

  if (isEmptyTable) {
    return <EmptyTable numColumns={getValidColumnProps(schema).length + 1} />;
  }

  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <React.Fragment>
      {range(data).map((index) => {
        const childPath = Paths.compose(path, `${index}`);

        return (
          <NonEmptyRow
            key={childPath}
            childPath={childPath}
            rowIndex={index}
            schema={schema}
            openDeleteDialog={openDeleteDialog}
            moveUpCreator={moveUp}
            moveDownCreator={moveDown}
            enableUp={index !== 0}
            enableDown={index !== data - 1}
            showSortButtons={appliedUiSchemaOptions.showSortButtons || appliedUiSchemaOptions.showArrayTableSortButtons}
            enabled={enabled}
            cells={cells}
            path={path}
          />
        );
      })}
    </React.Fragment>
  );
};

export class MaterialTableControl extends React.Component {
  addItem = (path: any, value: any) => (this.props as any).addItem(path, value);
  render() {
    const {
      label,
      path,
      schema,
      rootSchema,
      required,
      uischema,
      errors,
      openDeleteDialog,
      visible,
      enabled,
      cells,
      id,
      config
    } = this.props as any;

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const controlElement = uischema;
    const isObjectSchema = schema.type === 'object';
    const headerCells = isObjectSchema
      ? generateCells(TableHeaderCell, schema, path, enabled, cells)
      : undefined;
    const isValid = errors.length === 0;

    return (
      <Hidden xsUp={!visible}>
        <Table sx={{ marginTop: '10px' }}>
          {/* <TableHead>
            <TableToolbar
              errors={errors}
              label={label}
              addItem={this.addItem}
              numColumns={isObjectSchema ? headerCells.length : 1}
              path={path}
              uischema={controlElement}
              schema={schema}
              rootSchema={rootSchema}
              enabled={enabled}
            />
          </TableHead> */}
            {isObjectSchema && (
              <TableRow>
                {headerCells}
                {enabled ? <BorderlessTableCell /> : null}
              </TableRow>
            )}
          {/* <InputLabel
            htmlFor={id + '-input'}
            error={!isValid}
            required={showAsRequired(required, appliedUiSchemaOptions.hideRequiredAsterisk)}
          >
            {label}
          </InputLabel> */}
          <TableBody>
            <TableRows openDeleteDialog={openDeleteDialog} {...this.props} />
            {/* <IconButton
              aria-label={`Add to ${label}`}
              onClick={this.addItem(path, createDefaultValue(schema))}
              size='large'>
              <AddIcon />
            </IconButton> */}
          </TableBody>
        </Table>
        <Button
          color="primary"
          onClick={this.addItem(path, createDefaultValue(schema))}
          startIcon={<MdAdd />}
          size='small'
          sx={{ width: { sx: '100%', lg: 'initial' }, px: 0 }}
        >
          Add requirement
        </Button>
      </Hidden>
    );
  }
}
