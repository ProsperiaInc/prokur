const { default: styled } = require("@emotion/styled");

const PREFIX = 'dataTable'

const classes = {
  columnHeaders: `${PREFIX}-columnHeaders`,
  root: `${PREFIX}-root`,
  columnSeparator: `${PREFIX}-columnSeparator`,
  columnHeader: `${PREFIX}-columnHeader`,
  columnHeaderTitle: `${PREFIX}-columnHeaderTitle`,
  columnHeaderSorted: `${PREFIX}-columnHeaderSorted`,
  cellContent: `${PREFIX}-cellContent`,
  cell: `${PREFIX}-cell`,
  row: `${PREFIX}-row`,
}

const Root = styled('div')(({ theme, sortedCell }: any) => {
  return {
    height: 400,
    width: '100%',
    [`& .${classes.root}`]: {
      border: 'none',
      ...(sortedCell ? {
        [`& .${classes.cell}[data-field="${sortedCell}"]`]: {
          [`& .${classes.cellContent}`]: {
            fontWeight: 600
          }
        }
      } : {}),
      [`& .${classes.cell}`]: {
        ['&:focus']: {
          outline: 'none'
        }
      },
      [`& .${classes.cellContent}`]: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#333',
      },
      [`& .${classes.columnHeaderTitle}`]: {
        color: theme.palette.grey[400],
        fontStyle: 'normal',
        fontSize: '12px',
      },
      [`& .${classes.columnHeaderSorted}`]: {
        [`& .${classes.columnHeaderTitle}`]: {
          color: '#333',
          fontWeight: 700,
        },
      },
      [`& .${classes.columnHeader}`]: {
        '&:focus, &:focus-within': {
          outline: 'none'
        }
      },
      [`& .${classes.columnSeparator}`]: {
        display: 'none'
      },
      [`& .${classes.row}`]: {
        [`&:hover, &.Mui-selected, &.Mui-selected:hover`]: {
          backgroundColor: 'initial',
          boxShadow: '0px 4px 18px rgba(9, 44, 76, 0.1)',
          cursor: 'pointer'
        }
      }
    }
  }
})

export {
  Root,
  classes
}