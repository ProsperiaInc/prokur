import React from 'react';
import styled from '@emotion/styled';
import { Box, DialogTitle, IconButton } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { useSharedModal } from '../SharedModalContext';
import logo from '../../../assets/images/send-contained.webp';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const PREFIX = 'SharedModalTitle';

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  dialogTitle: `${PREFIX}-dialogTitle`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`
};

const StyledDialogTitle = styled(DialogTitle)((
  {
    theme
  }
  :
  any
) => ({
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: '5px',
  },

  [`&.${classes.dialogTitle}`]: {
    padding: 0,
    position: 'relative',
    '& > h2': {
      display: 'flex',
    },
  },

  [`& .${classes.title}`]: {
    fontSize: '24px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    // color: theme.custom.title,
    margin: '35px 0 25px 35px',
  },

  [`& .${classes.icon}`]: {
    marginRight: '15px',
  }
}));

export default function SharedModalTitle() {
  const { t } = useTranslation('common')
  const { onClose } = useSharedModal();

  return (
    <StyledDialogTitle className={classes.dialogTitle} id="alert-dialog-title">
      <Box display="flex" alignItems="center" className={classes.title}>
        <Box className={classes.icon}>
          <Image
            src={logo}
            alt="send"
            height="36"
            width="36"
          />
        </Box>
        {t('share_modal_title')}
      </Box>

      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
        size="large">
        <MdClose />
      </IconButton>
    </StyledDialogTitle>
  );
}
