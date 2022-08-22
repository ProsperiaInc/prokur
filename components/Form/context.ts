import React from "react";

type ISetForm = {
  [x: string]: {
    data: any,
    errors: any[],
  }
}

type IFormData = {
  forms?: ISetForm,
  setForm: (form: ISetForm) => any
}

const initialData: IFormData = {
  setForm: () => {},
}

const FormContext = React.createContext(initialData);

export default FormContext;