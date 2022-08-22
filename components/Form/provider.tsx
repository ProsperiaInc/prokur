import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectForms, setForm } from "store/features/forms/formsSlice";
import FormContext from "./context"

type IForm = {
  data: any;
  errors: any[];
}

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const forms = useSelector(selectForms)
  const setFormValue = (data: any) => dispatch(setForm(data));

  return (
    <FormContext.Provider value={{ forms, setForm: setFormValue }}>
      {children}
    </FormContext.Provider>
  )
}
