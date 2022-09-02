import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@mui/material';
import Attachment from 'components/Attachment/Attachment';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import pdfImage from 'assets/images/pdf-file.png';
import classes from './MultiAttachment.module.css';
import { useTranslation } from 'next-i18next';
import { useUploadRfpAttachementMutation } from 'services/rfp';

const fileIconMapping = { pdf: pdfImage }
export default function MultiAttachment({ sectionIndex, rfpId, sectionToggled }: any = {}) {
  const [files, setFiles] = useState<any[]>([]);
  const { t } = useTranslation('common');
  const [uploadRfpAttachement] = useUploadRfpAttachementMutation()

  const onFileAdd = async (e: any) => {
    const filesToAdd: any[] = [];
    for (let index = 0; index < e.length; index++) {
      const element = e[index];

      const attachment = uploadRfpAttachement({ rfpId, sectionIndex, element });
      // filesToAdd.push(attachment);
    }

    const file = [...files, ...filesToAdd];
    setFiles(file);
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

  const onDelete = async (index: any, file: any) => {
    const fil = files.find((_, idx) => idx === index);
    // await api.Rfp.deleteRfpAttachement({ rfpId, sectionIndex, fileId: fil.id });

    setFiles(files.filter((f) => f.id !== fil.id));
  };

  const renderFile = (file: any, index: any) => (
    <div key={`${file.name}_${index}`} className={classes["MultiAttachment-single-file-container"]}>
      <Attachment src={fileIconMapping.pdf} name={file?.name} />
      <Button onClick={() => onDelete(index, file)}>
        <CustomIcon name="trash" color="disabled" />
      </Button>
    </div>
  );

  const chooseFile = () => (
    <span>
      {t('dropzone.dropzone_area_text')}&nbsp;
      <span className='MultiAttachment-link'>
        {t('dropzone.dropzone_area_choose_file')}
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
          Drop files here to upload
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
