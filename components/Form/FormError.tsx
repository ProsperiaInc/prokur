import { useTranslation } from "next-i18next";

const FormError = ({ error }: { error: any }) => {
  const { t } = useTranslation('common')
  return error && <div>{t(`login.${(error as any)?.data?.error}`)}</div>
}

export default FormError