import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CodeInput from 'react-verification-input';
import { userLogout } from 'store/features/auth/authSlice';
import { useTranslation } from 'next-i18next';
const linkStyle = {
  fontWeight: 'bold',
  fontSize: '14px',
  padding: 4,
};
const VerificationForm = ({ verifyEmail, resendEmail }: any) => {
  const { t } = useTranslation('common')
  const [completeCode, setCompleteCode] = useState(false);
  const [codeValue, setCodevalue] = useState('');
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(userLogout());

  const onSubmit = async (e: any) => {
    e.preventDefault();
    verifyEmail(codeValue);
  };

  const onChange = (value: any) => {
    if (value.length > 5) {
      setCompleteCode(true);
      setCodevalue(value);
    } else {
      setCompleteCode(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="verify-form-input-container">
        <p className="verify-form-title">{t('verification.verification_field')}</p>
        <p className="verify-form-subtext">{t('verification.verification_subtext')}</p>
        <div className="verify-form-code-container">
          <CodeInput
            id="verificationCode"
            removeDefaultStyles
            validChars="\d"
            placeholder=""
            fields={6}
            autoFocus
            onChange={onChange}
            classNames={{
              container: 'verify-form-code-input',
              character: 'character',
              characterSelected: 'character--selected',
            }}
          />
        </div>
        <Button
          className="verify-form-button"
          variant="contained"
          type="submit"
          size="large"
          disabled={!completeCode}
        >
          {t('verification.verify_button')}
        </Button>
        <div className="verify-form-link-container">
          <span>
            {t('verification.resend_message')}
          </span>
          <Button
            variant="text"
            style={linkStyle}
            onClick={() => resendEmail('resend')}
          >
            {t('verification.resend_code')}
          </Button>
        </div>
        <div className="verify-form-return-container">
          <Button
            className="verify-form--link-button"
            variant="text"
            style={linkStyle}
            onClick={logoutUser}
          >
            {t('verification.return_link')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VerificationForm;
