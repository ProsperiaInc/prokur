import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, DialogActions } from '@mui/material';
import { useSharedModal } from '../SharedModalContext';
import { useTranslation } from 'next-i18next';

const PREFIX = 'SharedModalActions';

const classes = {
  sendButton: `${PREFIX}-sendButton`
};

const StyledDialogActions = styled(DialogActions)((
  {
    theme
  }
  :
  any
) => ({
  [`& .${classes.sendButton}`]: {
    padding: '12px 32px 11px 33px',
    marginRight: '19px',
    maxHeight: '40px',
    maxWidth: '100px',
    marginTop: '25px',
    '&.Mui-disabled': {
      color: theme.custom.disabledButtonColor,
      backgroundColor: theme.custom.disabledButtonBackgroundColor,
    },
  }
}));

export default function SharedModalActions() {
  const { t } = useTranslation('common')
  const { setSuccess, shareRfpToEmail, emails } = useSharedModal();
  // const { newSnackbar } = useSnackbar();


  const handleClose = async (event) => {
    if (await shareRfpToEmail(emails)) {
      setSuccess(true);
    } else {
      // newSnackbar({
      //   type: 'error',
      //   Error: t('error_share_alert_title'),
      //   title: t('error_share_alert_title'),
      //   isModal: true,
      // });
    }
  };

  return (
    <StyledDialogActions>
      <Button
        className={classes.sendButton}
        onClick={handleClose}
        color="primary"
        variant="contained"
        disabled={emails.length === 0}
      >
        {t('send')}
      </Button>
    </StyledDialogActions>
  );
}
