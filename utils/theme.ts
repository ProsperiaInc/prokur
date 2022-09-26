import { formControlClasses, formControlLabelClasses, formLabelClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    secondary: {
      light: '#E3E6EB',
      main: '#E3E6EB',
      dark: '#6980A5',
      contrastText: '#E3E6EB'
    },
    success: {
      main: '#27AE60'
    },
    warning: {
      main: '#E2B93B'
    },
    error: {
      main: '#F96A10'
    }
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
    // fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAFAFA'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          padding: '18px 40px',
          fontSize: '18px',
          borderRadius: '8px',
          height: 'fit-content',
          textTransform: 'none',
        },
      }
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'error' },
          style: {
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            minHeight: '237px',
            position: 'relative',
            ['& .MuiButton-root']: {
              padding: 0,
            },
            ['&:before']: {
              content: '" "',
              background: '#F96A10',
              width: '100%',
              height: '5px',
              position: 'absolute',
            }
          },
        },
        {
          props: { variant: 'warning' },
          style: {
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            minHeight: '237px',
            position: 'relative',
            ['& .MuiButton-root']: {
              padding: 0,
            },
            ['&:before']: {
              content: '" "',
              background: '#E2B93B',
              width: '100%',
              height: '5px',
              position: 'absolute',
            }
          },
        },
        {
          props: { variant: 'primary' },
          style: {
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            minHeight: '237px',
            position: 'relative',
            ['& .MuiButton-root']: {
              padding: 0,
            },
            ['&:before']: {
              content: '" "',
              background: '#1976d2',
              width: '100%',
              height: '5px',
              position: 'absolute',
            }
          },
        },
      ]
    },
    MuiAppBar: {
      boxShadow: 'none'
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '5px'
        },
      }
    }
  },
  custom: {
    helpIcon: {
      color: '#787878',
    },
    // publishModal: {
    //   titleIconBackgroundColor: '#15355a',
    //   titleIconColor: '#fff',
    // },
    // outlineButton: {
    //   color: '#1c3557',
    //   backgroundColor: '#fff',
    //   shadow: '0 2px 5px 0 rgba(43, 43, 43, 0.3)',
    // },
    menuButton: {
      backgroundColor: '#e0e0e0',
      color: 'rgba(0, 0, 0, 0.87);',
      backgroundColorHover: '#d5d5d5',
    },
    // tableHeadBackgroundColor: '#f4f5f7',
    // textArea: {
    //   border: '1px solid rgba(0, 0, 0, 0.23)',
    // },
    // helpIcon: {
    //   color: '#787878',
    // },
    // tableHeaderCell: '#a1a1a1',
    // tableCellBorder: 'solid 1px #e3e3e3',
    borderColor: '#e5e5e5',
    // helperError: '#dc1f3f',
    // cellTextColor: '#6c6c6c',
    // cellHoverColor: '#c8cfd8',
    // disabledInputColor: '#464646',
    // disabledButtonColor: '#f7f7f7',
    // disabledButtonBackgroundColor: '#bdbdbd',
    // title: '#494949',
    tooltip: {
      backgroundColor: '#555',
      color: '#fff',
    },
    // account: {
    //   editButton: {
    //     color: '#1d3659',
    //   },
    // },
    // pickImage: {
    //   editButton: {
    //     backgroundColor: '#15355a',
    //     color: '#fff',
    //     hover: {
    //       backgroundColor: '#15355a',
    //     },
    //     upload: {
    //       fill: '#363741',
    //     },
    //     delete: {
    //       fill: '#e63846',
    //     },
    //   },
    // },
    // alert: {
    //   success: {
    //     color: '#028480',
    //     backgroundColor: '#f2fbfa',
    //     borderColor: '#add6aa',
    //   },
    //   error: {
    //     color: '#dc1f3f',
    //     backgroundColor: '#fdf3f5',
    //     borderColor: 'rgba(220, 31, 63, 0.3)',
    //   },
    // },
    // modalAlert: {
    //   fontColor: '#383838',
    //   delete: {
    //     primary: '#e63846',
    //     secondary: '#b7b7b7',
    //     dark: '#ba000d',
    //     contrastFontColor: 'white',
    //   },
    // },
  },
});

const dark = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: 'rgb(201, 21, 63)',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});

export { dark, light };
