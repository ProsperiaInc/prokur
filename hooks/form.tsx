import { useContext } from "react"
import FormContext from "components/Form/context"

export const useForm = (name: string) => {
  const context = useContext(FormContext)
  return context?.forms?.[name]
}
