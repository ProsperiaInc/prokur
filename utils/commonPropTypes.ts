import PropTypes from 'prop-types';

export const fieldValue = PropTypes.any;
export const fieldOnChange = PropTypes.func;
export const fieldName = PropTypes.string;
export const fieldError = PropTypes.bool;
export const fieldHelperText = PropTypes.string;

export const fieldType = PropTypes.shape({
  label: PropTypes.string,
  description: PropTypes.string,
  field_only: PropTypes.bool,
  name: PropTypes.string,
  value: fieldValue,
  column: PropTypes.number,
  meta: PropTypes.shape({
    type: PropTypes.string,
    multiple: PropTypes.bool,
    source: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    helper_text: PropTypes.string,
  }),
  custom: PropTypes.shape({
    suggested_tags: PropTypes.arrayOf(PropTypes.string),
    add_button_icon: PropTypes.string,
    add_button_text: PropTypes.string,
  }),
  validation: PropTypes.shape({
    required: PropTypes.bool,
  }),
});

export default {
  fieldType,
};
