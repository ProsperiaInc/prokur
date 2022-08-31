import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box, Button, Switch, Typography, TextField
} from '@mui/material';
import { useSharedModal } from '../SharedModalContext';
import { useTranslation } from 'next-i18next';

const PREFIX = 'SwitchPassword';

const classes = {
  passwordArea: `${PREFIX}-passwordArea`,
  input: `${PREFIX}-input`,
  applyButton: `${PREFIX}-applyButton`,
  passText: `${PREFIX}-passText`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  } 
  :
  any
) => ({
  [`& .${classes.passwordArea}`]: {
    paddingLeft: '12px',
    '& .text-field-label-wrapper-label-container': {
      display: 'none',
    },
  },

  [`& .${classes.input}`]: {
    width: '180px',
    height: '35px',
    marginTop: '0',
  },

  [`& .${classes.applyButton}`]: {
    alignSelf: 'flex-end',
    padding: '12px 32px 11px 33px',
    bottom: 24,
    right: 24,
    position: 'absolute',
    maxHeight: '40px',
    maxWidth: '100px',
    '&.Mui-disabled': {
      color: theme.custom.disabledButtonColor,
      backgroundColor: theme.custom.disabledButtonBackgroundColor,
    },
  },

  [`& .${classes.passText}`]: {
    fontSize: '12px',
    marginTop: '16px',
    marginBottom: '8px',
    color: theme.custom.cellTextColor,
  }
}));

// const validationSchema = Yup.object({
//   password: Yup
//     .string()
//     .required('Password is required')
//     .test(
//       'strongPassword',
//       'shared_password_error_description',
//       (value) => value && validator.isStrongPassword(value, {
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 0,
//       }),
//     ),
// });

export default function SwitchPassword() {
  const { t } = useTranslation('common')
  const { setSharedLinkPassword, sharedLinkPassword: initialPassword } = useSharedModal();
  // const { newSnackbar } = useSnackbar();

  const [state, setState] = useState(!!initialPassword);

  const handleResponse = (response, remove) => {
    // if (response === true) {
    //   newSnackbar({
    //     type: 'success',
    //     title: I18n.t('apply_alert_title'),
    //     caption: I18n.t(remove ? 'apply_alert_body_removed' : 'apply_alert_body'),
    //     isModal: true,
    //   });
    // } else if (response === false) {
    //   newSnackbar({
    //     type: 'error',
    //     title: 'Error',
    //     caption: I18n.t('error_apply_alert_title'),
    //     isModal: true,
    //   });
    // }
  };

  const initialValues = useMemo(() => ({
    password: initialPassword || '',
  }), [initialPassword]);

  // const formik = useFormik({
  //   validateOnMount: state,
  //   initialValues,
  //   validationSchema,
  //   enableReinitialize: true,
  //   onSubmit: async (value) => handleResponse(await setSharedLinkPassword(value.password)),
  // });

  const handleChange = async () => {
    if (state) {
      // formik.setFieldError('password', undefined);
      // await formik.setFieldValue('password', '');
      setState(false);
      handleResponse(await setSharedLinkPassword(''), true);
    } else {
      setState(true);
    }
  };

  return (
    (<Root>
      <Box display="flex" alignItems="center" position="relative">
        <Switch
          checked={state}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        {t('add_password')}
      </Box>
      {state && (
        <form 
        // onSubmit={formik.handleSubmit}
        >
          <Box
            className={classes.passwordArea}
            display="flex"
            flexDirection="column"
            alignItems="start"
          >
            <Typography className={classes.passText}>
              {t('password_field')}
            </Typography>
            <TextField
              className={classes.input}
              id="password"
              name="password"
              type="text"
              // value={formik.values.password}
              // onChange={formik.handleChange}
            />
            {/* <Typography color="error" variant="subtitle2">
              {!!formik.errors.password
                && t('shared_password_error_title')}
            </Typography>
            <Typography color="error" variant="subtitle2">
              {!!formik.errors.password
                && t('shared_password_error_description')}
            </Typography> */}
            <Button
              className={classes.applyButton}
              type="submit"
              color="secondary"
              // disabled={!!formik.errors.password}
              variant="contained"
            >
              {t('apply')}
            </Button>
          </Box>
        </form>
      )}
    </Root>)
  );
}
