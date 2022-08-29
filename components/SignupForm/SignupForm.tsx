import uischema from 'forms/signup/uischema';
import schema from 'forms/signup/schema';
import Form from 'components/Form';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'next-i18next';
import { useForm } from 'hooks/form';
const FORM_NAME = 'signup'

const SignupForm = ({ isLoading, onSubmit, ...props }: any) => {
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
          onClick={() => !isDisabled && onSubmit({
            ...data,
            usage_type: 'buyer'
          })}
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

export default SignupForm