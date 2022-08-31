import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, DialogContent } from '@mui/material';
import { useSharedModal } from '../SharedModalContext';
import logo from '../../../assets/images/send.webp';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const PREFIX = 'SharedSentModal';

const classes = {
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  icon: `${PREFIX}-icon`
};

const StyledDialogContent = styled(DialogContent)((
  {
    theme
  }
  : any
) => ({
  [`&.${classes.content}`]: {
    padding: '40px 80px',
  },

  [`& .${classes.text}`]: {
    color: theme.custom.title,
  },

  [`& .${classes.icon}`]: {
    marginTop: '20px',
    marginBottom: '20px',
  }
}));

export default function SharedSentModal() {
  const { t } = useTranslation('common')
  const { modal, onClose } = useSharedModal();


  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [modal]);

  return (
    <StyledDialogContent className={classes.content}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image
          className={classes.icon}
          src={logo}
          alt="send"
          height="61"
          width="61"
        />
        <Box className={classes.text}>{t('success_sent')}</Box>
      </Box>
    </StyledDialogContent>
  );
}
