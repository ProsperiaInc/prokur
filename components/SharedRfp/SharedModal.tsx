import React, {
  useState, useEffect,
} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import { SharedModalTitle, SharedModalContent } from './SharedModalParts';
import SharedSentModal from './SharedSentModal/SharedSentModal';
import { SharedModalContext } from './SharedModalContext';

const PREFIX = 'SharedModal';

const classes = {
  dialog: `${PREFIX}-dialog`
};

const StyledSharedModalContextProvider = styled(SharedModalContext.Provider)((
  {
    theme
  }
) => ({
  [`& .${classes.dialog}`]: {
    overflow: 'initial',
  }
}));

export default function SharedModal({
  modal,
  onClose,
  sharedLink,
  shareRfpToEmail,
  sharedLinkPassword,
  setSharedLinkPassword,
} : any) {
  const [emails, setEmails] = useState([]);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    if (!modal) {
      setSuccess(false);
    }
  }, [modal]);

  return (
    <StyledSharedModalContextProvider
      value={{
        modal,
        emails,
        onClose,
        setEmails,
        setSuccess,
        sharedLink,
        shareRfpToEmail,
        sharedLinkPassword,
        setSharedLinkPassword,
      }}>
      <Dialog
        transitionDuration={0}
        open={modal}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: classes.dialog,
        }}
      >
        {!success ? (
          <>
            <SharedModalTitle />
            <SharedModalContent />
          </>
        ) : (
          <SharedSentModal />
        )}
      </Dialog>
    </StyledSharedModalContextProvider>
  );
}

SharedModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sharedLink: PropTypes.string.isRequired,
  shareRfpToEmail: PropTypes.func.isRequired,
  sharedLinkPassword: PropTypes.string.isRequired,
  setSharedLinkPassword: PropTypes.func.isRequired,
};
