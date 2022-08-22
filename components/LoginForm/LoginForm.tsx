import uischema from 'forms/login/uischema.json';
import schema from 'forms/login/schema.json';
import Form from 'components/Form';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'next-i18next';
import { useForm } from 'hooks/form';
const FORM_NAME = 'login'

const LoginForm = ({ isLoading, onSubmit, ...props }: any) => {
  const { t } = useTranslation('common');
  const form = useForm(FORM_NAME)
  const { data, errors = [] } = form || {}
  const isDisabled = !data || !!errors.length || isLoading

  return (
    <>
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
    </>
  )
}

export default LoginForm