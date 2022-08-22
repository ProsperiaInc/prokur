import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@mui/material';
import Attachment from 'components/Attachment/Attachment';
import CustomIcon from 'components/CustomIcon/CustomIcon';
// import api from 'api';
import pdfImage from 'assets/images/pdf-file.png';
import classes from './MultiAttachment.module.css';
import { useTranslation } from 'next-i18next';

const fileIconMapping = {
  pdf: pdfImage,
};

export default function MultiAttachment({ sectionIndex, rfpId, sectionToggled }: any = {}) {
  const [files, setFiles] = React.useState([]);
  const { t } = useTranslation('common');

  const onFileAdd = async (e) => {
    const filesToAdd = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < e.length; index++) {
      const element = e[index];
      // eslint-disable-next-line no-await-in-loop
      // const attachment = await api.Rfp.uploadRfpAttachement({ rfpId, sectionIndex }, element);
      // filesToAdd.push(attachment);
    }

    const fil = [...files, ...filesToAdd];
    setFiles(fil);
  };

  // const fetchRfpAttachments = async () => {
  //   if (+rfpId === 0) {
  //     return;
  //   }

  //   const attachments = await api.Rfp.getRfpAttachement({ rfpId, sectionIndex });
  //   setFiles([...files, ...attachments]);
  // };

  // useEffect(() => {
  //   fetchRfpAttachments();
  // }, []);

  const onDelete = async (index, file) => {
    const fil = files.find((_, idx) => idx === index);
    // await api.Rfp.deleteRfpAttachement({ rfpId, sectionIndex, fileId: fil.id });

    setFiles(files.filter((f) => f.id !== fil.id));
  };

  const renderFile = (file, index) => (
    <div key={`${file.name}_${index}`} className={classes["MultiAttachment-single-file-container"]}>
      <Attachment src={fileIconMapping.pdf} name={file?.name} />
      <Button onClick={() => onDelete(index, file)}>
        <CustomIcon name="trash" color="disabled" />
      </Button>
    </div>
  );

  const chooseFile = () => (
    <span>
      {/* {I18n.t('dropzone_area_text')} */}
      Drop files here to upload or&nbsp;
      <span className={classes["MultiAttachment-link"]}>
        Chose file
        {/* {I18n.t('dropzone_area_choose_file')} */}
      </span>
    </span>
  );

  return (
    <div className={classes["MultiAttachment-container"]}>
      {+rfpId !== 0 ? (
        !sectionToggled && (
          <DropzoneArea
            onAdd={onFileAdd}
            onDrop={onFileAdd}
            dropzoneParagraphClass={classes["MultiAttachment-text"]}
            dropzoneText={chooseFile()}
            acceptedFiles={['.pdf']}
            showAlerts={false}
            showPreviews={false}
            showPreviewsInDropzone={false}
            clearOnUnmount
            Icon={() => <CustomIcon name="upload" />}
            classes={{
              root: classes['MultiAttachment-container-component'],
              textContainer: classes['MultiAttachment-container-text'],
            }}
          />
        )
      ) : (
        <div className={classes["MultiAttachment-container-subtext"]}>
          {/* {t('dropzone_area_text_before_upload')} */}
        </div>
      )}
      <div>{files.map(renderFile)}</div>
    </div>
  );
}

MultiAttachment.propTypes = {
  rfpId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  sectionIndex: PropTypes.number.isRequired,
  sectionToggled: PropTypes.bool,
};

MultiAttachment.defaultProps = {
  sectionToggled: false,
};
