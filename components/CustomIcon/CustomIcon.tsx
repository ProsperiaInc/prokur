import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdDelete, MdCloudUpload } from 'react-icons/md'

function CustomIcon({ name = '', ...props } = {}) {
  const iconMap: { [x: string]: any } = {
    plus: MdAdd,
    trash: MdDelete,
    upload: MdCloudUpload,
  };

  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : <div />;
}

CustomIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomIcon;
