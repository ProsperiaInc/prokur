import uischema from 'forms/login/uischema';
import schema from 'forms/login/schema';
import Form from 'components/Form';
import { Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'next-i18next';
import { useForm } from 'hooks/form';
import { KeyboardEvent } from 'react';
const FORM_NAME = 'login'

const LoginForm = ({ isLoading, onSubmit, ...props }: any) => {
  const { t } = useTranslation('common');
  const form = useForm(FORM_NAME)
  const { data, errors = [] } = form || {}
  const isDisabled = !data || !!errors.length || isLoading
  const onKeyPressed = (e: KeyboardEvent<HTMLDivElement>) => e.code === 'Enter' && onSubmit(data)

  return (
    <Box 
      tabIndex={0}
      onKeyDown={onKeyPressed}
    >
      <Form
        name={FORM_NAME}
        schema={schema}
        uischema={uischema}
        {...props}
      />
      {isLoading && (
        <LoadingButton
          loading
          variant="contained"
          sx={{ mt: '8px' }}
        >
          {t('common.continue')}
        </LoadingButton>
      )}
      {!isLoading && (
        <Button
          onClick={() => !isDisabled && onSubmit(data)}
          disabled={isDisabled}
          variant="contained"
          sx={{ mt: '8px' }}
        >
          {t('common.continue')}
        </Button>
      )}
    </Box>
  )
}

export default LoginForm