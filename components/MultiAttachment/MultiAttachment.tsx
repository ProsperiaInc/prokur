import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'packages/material-ui-dropzone';
import { Box, CircularProgress, Fab } from '@mui/material';
import Attachment from 'components/Attachment/Attachment';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import pdfImage from 'assets/images/pdf-file.png';
import classes from './MultiAttachment.module.css';
import { useTranslation } from 'next-i18next';
import { useDeleteRfpAttachementMutation, useLazyGetRfpAttachmentQuery, useUploadRfpAttachementMutation } from 'services/rfp';
import { useRouter } from 'next/router';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

const fileIconMapping = { pdf: pdfImage }
export default function MultiAttachment({ sectionIndex, sectionToggled }: any = {}) {
  const router = useRouter();
  const rfpId = router.query.id
  const [files, setFiles] = useState<any[]>([]);
  const [fileToBeDeleted, setFileToBeDeleted] = useState<string | undefined>();
  const { t } = useTranslation('common');
  const [uploadRfpAttachement, { data: attachment, isLoading: isUploadLoading }] = useUploadRfpAttachementMutation()
  const [getRfpAttachement, { data: attachments, isLoading }] = useLazyGetRfpAttachmentQuery()
  const [deleteRfpAttachement, { status: fileDeleteStatus, isLoading: fileDeleteLoading }] = useDeleteRfpAttachementMutation()

  const onFileAdd = async (e: any) => {
    const filesToAdd: any[] = [];
    for (let index = 0; index < e.length; index++) uploadRfpAttachement({ rfpId, sectionIndex, file: e[index] })
    const file = [...files, ...filesToAdd];
    setFiles(file);
  };

  const fetchRfpAttachments = async () => {
    if (!rfpId) return
    getRfpAttachement({ rfpId, sectionIndex });
  };
  
  useEffect(() => { fetchRfpAttachments()}, [])
  useEffect(() => { if(attachments && attachments.length) { setFiles([...files, ...attachments]) }}, [attachments]);
  useEffect(() => { 
    if(attachment && !files.find((item: any) => item.uri_path === attachment.uri_path)) {
      setFiles([...files, attachment]) 
    }
  }, [attachment])
  useEffect(() => {
    if(fileDeleteStatus === QueryStatus.fulfilled && fileToBeDeleted) {
      setFiles(files.filter((f) => f.id !== fileToBeDeleted));
      setFileToBeDeleted(undefined)
    }
  }, [fileDeleteStatus])

  const onDelete = async (index: any, file: any) => {
    const fil = files.find((_, idx) => idx === index);
    deleteRfpAttachement({ rfpId, sectionIndex, fileId: fil.id });
    setFileToBeDeleted(fil.id)
  };

  const renderFile = (file: any, index: any) => {
    return (
      <div key={`${file.name}_${index}`} className={classes["MultiAttachment-single-file-container"]}>
        <Attachment src={fileIconMapping.pdf} name={file?.name} />
        {fileToBeDeleted === file.id && fileDeleteLoading && <CircularProgress />}
        {fileToBeDeleted !== file.id && <Fab className={classes["MultiAttachment-remove-fab"]} disabled={fileToBeDeleted !== file.id && fileDeleteLoading} onClick={() => onDelete(index, file)}><CustomIcon name="trash" /></Fab>}
      </div>
    );
  }

  const chooseFile = () => {
    if(isLoading || isUploadLoading) {
      return (
        <Box className={classes['MultiAttachment-single-file-container-loading']}>
          <CircularProgress /> 
        </Box>
      )
    }
    
    return (
      <span>
        {t('dropzone.dropzone_area_text')}
        <span className='MultiAttachment-link'>
          {t('dropzone.dropzone_area_choose_file')}
        </span>
      </span>
    );
  }

  return (
    <div className={classes["MultiAttachment-container"]}>
      {rfpId ? (
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
            Icon={() => (isLoading || isUploadLoading) ? null : <CustomIcon name="upload" />}
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
