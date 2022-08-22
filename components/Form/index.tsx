import { JsonForms, JsonFormsInitStateProps } from '@jsonforms/react';
import { JsonFormsCellRendererRegistryEntry, JsonFormsCore, JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import {
  materialAllOfControlTester,
  MaterialAllOfRenderer,
  materialAnyOfControlTester,
  MaterialAnyOfRenderer,
  MaterialArrayControlRenderer,
  materialArrayControlTester,
  materialObjectControlTester,
  MaterialObjectRenderer,
  materialOneOfControlTester,
  MaterialOneOfRenderer,
  MaterialEnumArrayRenderer,
  materialEnumArrayRendererTester
} from './complex';
import {
  MaterialLabelRenderer,
  materialLabelRendererTester,
  MaterialListWithDetailRenderer,
  materialListWithDetailTester
} from './additional';
import {
  MaterialAnyOfStringOrEnumControl,
  materialAnyOfStringOrEnumControlTester,
  MaterialBooleanControl,
  materialBooleanControlTester,
  MaterialBooleanToggleControl,
  materialBooleanToggleControlTester,
  MaterialDateControl,
  materialDateControlTester,
  MaterialDateTimeControl,
  materialDateTimeControlTester,
  MaterialTimeControl,
  materialTimeControlTester,
  MaterialEnumControl,
  materialEnumControlTester,
  MaterialIntegerControl,
  materialIntegerControlTester,
  MaterialNativeControl,
  materialNativeControlTester,
  MaterialNumberControl,
  materialNumberControlTester,
  MaterialOneOfEnumControl,
  materialOneOfEnumControlTester,
  MaterialRadioGroupControl,
  materialRadioGroupControlTester,
  MaterialSliderControl,
  materialSliderControlTester,
  MaterialTextControl,
  materialTextControlTester,
  MaterialOneOfRadioGroupControl,
  materialOneOfRadioGroupControlTester,
  MaterialCurrencyControl, 
  materialCurrencyControlTester,
  MaterialTagsControl, 
  materialTagsControlTester,
  MaterialFileUploadControl,
  materialFileUploadControlTester
} from './controls';
import {
  MaterialArrayLayout,
  materialArrayLayoutTester,
  MaterialCategorizationLayout,
  materialCategorizationTester,
  MaterialGroupLayout,
  materialGroupTester,
  MaterialHorizontalLayout,
  materialHorizontalLayoutTester,
  MaterialVerticalLayout,
  materialVerticalLayoutTester
} from './layouts';
import {
  MaterialBooleanCell,
  materialBooleanCellTester,
  MaterialBooleanToggleCell,
  materialBooleanToggleCellTester,
  MaterialDateCell,
  materialDateCellTester,
  MaterialEnumCell,
  materialEnumCellTester,
  MaterialIntegerCell,
  materialIntegerCellTester,
  MaterialNumberCell,
  materialNumberCellTester,
  MaterialNumberFormatCell,
  materialNumberFormatCellTester,
  MaterialOneOfEnumCell,
  materialOneOfEnumCellTester,
  MaterialTextCell,
  materialTextCellTester,
  MaterialTimeCell,
  materialTimeCellTester
} from './cells';
import MaterialCategorizationStepperLayout, { materialCategorizationStepperTester } from './layouts/MaterialCategorizationStepperLayout';
import { JsonFormsReactProps } from '@jsonforms/react';
import FormContext from './context';
import { Provider } from './provider'
import { selectForms } from 'store/features/forms/formsSlice';
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next';
import { Alert } from '@mui/material';

const renderers: JsonFormsRendererRegistryEntry[] = [
  // controls
  { tester: materialArrayControlTester, renderer: MaterialArrayControlRenderer },
  { tester: materialBooleanControlTester, renderer: MaterialBooleanControl },
  { tester: materialBooleanToggleControlTester, renderer: MaterialBooleanToggleControl },
  { tester: materialNativeControlTester, renderer: MaterialNativeControl },
  { tester: materialEnumControlTester, renderer: MaterialEnumControl },
  { tester: materialIntegerControlTester, renderer: MaterialIntegerControl },
  { tester: materialNumberControlTester, renderer: MaterialNumberControl },
  { tester: materialTextControlTester, renderer: MaterialTextControl },
  { tester: materialDateTimeControlTester, renderer: MaterialDateTimeControl },
  { tester: materialDateControlTester, renderer: MaterialDateControl },
  { tester: materialTimeControlTester, renderer: MaterialTimeControl }, 
  { tester: materialSliderControlTester, renderer: MaterialSliderControl },
  { tester: materialObjectControlTester, renderer: MaterialObjectRenderer },
  { tester: materialAllOfControlTester, renderer: MaterialAllOfRenderer },
  { tester: materialAnyOfControlTester, renderer: MaterialAnyOfRenderer },
  { tester: materialOneOfControlTester, renderer: MaterialOneOfRenderer },
  { tester: materialRadioGroupControlTester, renderer: MaterialRadioGroupControl },
  { tester: materialOneOfRadioGroupControlTester, renderer: MaterialOneOfRadioGroupControl },
  { tester: materialOneOfEnumControlTester, renderer: MaterialOneOfEnumControl },
  // layouts
  { tester: materialGroupTester, renderer: MaterialGroupLayout },
  { tester: materialHorizontalLayoutTester, renderer: MaterialHorizontalLayout },
  { tester: materialVerticalLayoutTester, renderer: MaterialVerticalLayout },
  { tester: materialCategorizationTester, renderer: MaterialCategorizationLayout },
  { tester: materialCategorizationStepperTester, renderer: MaterialCategorizationStepperLayout },
  { tester: materialArrayLayoutTester, renderer: MaterialArrayLayout },
  // additional
  { tester: materialLabelRendererTester, renderer: MaterialLabelRenderer },
  { tester: materialListWithDetailTester, renderer: MaterialListWithDetailRenderer },
  { tester: materialAnyOfStringOrEnumControlTester, renderer: MaterialAnyOfStringOrEnumControl },
  { tester: materialEnumArrayRendererTester, renderer: MaterialEnumArrayRenderer },
  { tester: materialCurrencyControlTester, renderer: MaterialCurrencyControl },
  { tester: materialTagsControlTester, renderer: MaterialTagsControl },
  { tester: materialFileUploadControlTester, renderer: MaterialFileUploadControl },
];

export const materialCells: JsonFormsCellRendererRegistryEntry[] = [
  { tester: materialBooleanCellTester, cell: MaterialBooleanCell },
  { tester: materialBooleanToggleCellTester, cell: MaterialBooleanToggleCell },
  { tester: materialDateCellTester, cell: MaterialDateCell },
  { tester: materialEnumCellTester, cell: MaterialEnumCell },
  { tester: materialIntegerCellTester, cell: MaterialIntegerCell },
  { tester: materialNumberCellTester, cell: MaterialNumberCell },
  { tester: materialNumberFormatCellTester, cell: MaterialNumberFormatCell },
  { tester: materialOneOfEnumCellTester, cell: MaterialOneOfEnumCell },
  { tester: materialTextCellTester, cell: MaterialTextCell },
  { tester: materialTimeCellTester, cell: MaterialTimeCell }
];


function Form(
  props: Omit<JsonFormsInitStateProps, "renderers" | "cells" | "data"> & 
  JsonFormsReactProps & 
  { initialData?: Pick<JsonFormsCore, 'data'>, name: string }
) {
  
  const { t } = useTranslation('common')
  const forms = useSelector(selectForms)
  const error = forms?.[props.name]?.formError

  return (
    <FormContext.Consumer>
      {({ forms, setForm }) => (
        <>
          <JsonForms
            data={forms?.[props.name]?.data || props.initialData}
            renderers={renderers}
            cells={materialCells}
            onChange={({ errors, data: cellsData } : { errors: any, data: any }) => {
              setForm({
                [props.name]: {
                  data: cellsData,
                  errors
                }
              })
            }}
            {...props}
          />
          {error && <Alert variant="standard" severity="error">{t(`${props.name}.${(error as any)?.data?.error}`)}</Alert>}
        </>
      )}
    </FormContext.Consumer>
  )
}

Form.Provider = Provider;
export default Form