import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { IconButton } from '@material-ui/core';
import { MdClose } from 'react-icons/md'
import CustomIcon from '../CustomIcon/CustomIcon';
import { fieldType } from 'utils/commonPropTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'next-i18next';

export default function SwipeableAttachment({
    acceptedFiles, field, value, valueFile, required, name, error, onChange, label, type
} : any) {
  const { t } = useTranslation('common')
  const handleChange = (newValue: any) => {
    let values = [];
    if (!!valueFile && valueFile.length) {
      values = [...valueFile]
    }

    if (value && valueFile && value.length > valueFile.length) {
      values = new Array(value.length);
    }

    values.push(newValue)

    onChange({
      target: {
        name: `${name}_file`,
        value: values,
      },
    });
  };

  const handleChangeValue = (newValue: any) => {
    let values: any[] = [];
    if (!!value && value.length) {
      values = [...value]
    }

    values.push(newValue)

    onChange({
      target: {
        name,
        value: values,
      },
    });
  }

  const handleDelete = (index: any) => {
    const values = [...value];
    values.splice(index, 1)
    let valuesFile = [];
    if (!valueFile || !valueFile.length) {
      valuesFile = new Array(value.length)
    }
    valuesFile.splice(index, 1)

    onChange({
      target: {
        name: `${name}`,
        value: values,
      },
    });

    onChange({
      target: {
        name: `${name}File`,
        value: valuesFile,
      },
    });
  }

  const onFileAdd = (files: any) => {
    const file = files[0];
    handleChange(file);
    const url = URL.createObjectURL(file);
    handleChangeValue(url);
  };

  const chooseFile = () => (
    <>
      {t('dropzone_area_text')}
      <span className="MultiAttachment-link">{t('dropzone_area_choose_file')}</span>
    </>
  );

  const renderValue = (el: any, index: any) => (
    <SwiperSlide key={el}>
      <IconButton color="secondary" onClick={() => handleDelete(index)}>
        <MdClose />
      </IconButton>
      {type === 'image' && <img src={el} alt="thumbail" />}
      {type === 'video' && (
        <video controls muted>
          <source src={el} type="video/mp4" />
        </video>
      )}
    </SwiperSlide>
  )

  return (
    <div className="swipeable-attachment">
      <h2>{label}</h2>
      <div className="swipeable-attachment-wrapper">
        <DropzoneArea
          onAdd={onFileAdd}
          onDrop={onFileAdd}
          dropzoneText={chooseFile()}
          acceptedFiles={acceptedFiles}
          showAlerts={false}
          showPreviews={false}
          showPreviewsInDropzone={false}
          clearOnUnmount
          filesLimit={10}
          Icon={() => <CustomIcon name="upload" />}
        />
         <Swiper grabCursor slidesPerView="auto" spaceBetween={14}>
          {!!value && value.map(renderValue)}
         </Swiper>
      </div>
    </div>
  )
}

SwipeableAttachment.defaultProps = {
  required: false,
  value: [],
  valueFile: [],
  name: '',
  label: '',
  error: '',
}

SwipeableAttachment.propTypes = {
  acceptedFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
  field: fieldType.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  valueFile: PropTypes.arrayOf(PropTypes.any),
  required: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}
