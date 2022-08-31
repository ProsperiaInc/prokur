import {
  Box, Button, Typography, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import copy from 'copy-to-clipboard';
import I18n from 'i18n-js';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSharedModal } from '../SharedModalContext';

const PREFIX = 'SharedLink';

const classes = {
  input: `${PREFIX}-input`,
  button: `${PREFIX}-button`,
  copyArea: `${PREFIX}-copyArea`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.input}`]: {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      width: '420px',
    },
    '& .MuiInputBase-root.Mui-disabled': {
      color: theme.custom.disabledInputColor,
      fontSize: '14px',
    },
  },

  [`& .${classes.button}`]: {
    height: '40px',
    padding: '12px 26px 11px 27px',
    fontWeight: '600',
  },

  [`& .${classes.copyArea}`]: {
    padding: '12px 0',
    '& .text-field-label-wrapper-label-container': {
      display: 'none',
    },
  }
}));

export default function SharedLink() {
  const { sharedLink } = useSharedModal();
  const { t } = useTranslation('common');


  const handleCopy = () => {
    copy(sharedLink);
    // newSnackbar({
    //   type: 'success',
    //   title: t('copy_alert_title'),
    //   caption: t('copy_alert_body'),
    //   isModal: true,
    // });
  };

  return (
    (<Root>
      <Typography>{t('link')}:</Typography>
      <Box display="flex" alignItems="center" className={classes.copyArea}>
        <TextField value={sharedLink} disabled className={classes.input} />
        <Box width={15} />
        <Button
          onClick={handleCopy}
          color="secondary"
          variant="text"
          className={classes.button}
        >
          {t('copy_link')}
        </Button>
      </Box>
    </Root>)
  );
}
