import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MdCancel } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { useSharedModal } from '../SharedModalContext';
import { useTranslation } from 'next-i18next';

const PREFIX = 'SharedAddEmail';

const classes = {
  textField: `${PREFIX}-textField`,
  input: `${PREFIX}-input`,
  start: `${PREFIX}-start`,
  helper: `${PREFIX}-helper`,
  add: `${PREFIX}-add`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.textField}`]: {
    [theme.breakpoints.up('md')]: {
      width: '600px',
    },
    position: 'relative',
    margin: 0,
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.custom.borderColor}`,
    width: '100%',
    '& fieldset': {
      display: 'none',
    },
  },

  [`& .${classes.input}`]: {
    padding: '20px 35px',

    '&::after, &::before': {
      display: 'none',
    },
  },

  [`& .${classes.start}`]: {
    marginRight: '30px',
  },

  [`& .${classes.helper}`]: {
    top: '8px',
    transform: 'translateX(50px)',
    position: 'absolute',
    color: theme.custom.helperError,
    fontSize: '14px',
  },

  [`& .${classes.add}`]: {
    fontWeight: '600',
  }
}));

export default function SharedAddEmail() {
  const { t } = useTranslation('common')
  const { emails, setEmails } = useSharedModal();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);


  const onChange = (event: any) => {
    if (error) {
      setError(false);
    }
    setValue(event.target.value);
  };

  const clearValue = () => {
    setError(false);
    setValue('');
  };

  const addValue = (event: any) => {
    const values = value.split(', ');
    // const err = !values.every((email) => validator.isEmail(email)
    //   && !emails.includes(email)
    //   && values.filter((item) => item === email).length === 1);

    // if (err) {
    //   setError(err);
    // }

    // if (value && !err) {
    //   setEmails([...emails, ...value.split(', ')]);
    //   clearValue();
    // }
  };

  useEffect(() => {
    clearValue();
  }, []);

  return (
    <Root>
      <TextField
        value={value}
        className={classes.textField}
        onChange={onChange}
        placeholder={t('add_email_placeholder')}
        InputProps={{
          id: 'add-email',
          fullWidth: true,
          className: classes.input,

          startAdornment: (
            <InputAdornment className={classes.start} position="start">
              To:
              {error && (
                <Typography className={classes.helper}>
                  Invalid entry
                </Typography>
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {error ? (
                <IconButton onClick={clearValue} size="large">
                  <MdCancel color="error" />
                </IconButton>
              ) : (
                value && (
                  <Button
                    className={classes.add}
                    onClick={addValue}
                    variant="text"
                    color="secondary"
                  >
                    {t('add')}
                  </Button>
                )
              )}
            </InputAdornment>
          ),
        }}
      />
    </Root>
  );
}
