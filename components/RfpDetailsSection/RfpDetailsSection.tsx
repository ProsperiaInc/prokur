import React from 'react';
import parseDate from 'utils/dateHelper';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@mui/material';
import classes from './RfpDetailsSection.module.css';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import { upperFirst, words } from 'lodash';

const SubmitProposalButton = styled(Button)(({ theme }: any) => ({
  marginRight: '15px',
  marginTop: '8px',
  // width: '100%',
  textTransform: 'none',
  padding: '14px 55.5px',
  fontSize: '18px',
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  }
}))

const ViewButton = styled(Button)(({ theme }: any) => ({
  marginTop: '8px',
  textTransform: 'none',
  padding: '14px 55.5px',
  fontSize: '18px',
  borderRadius: '8px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  }
}))

export default function RfpDetailsSection({
  rfp,
  rfpDetails,
  onViewResponses,
  onViewRfp,
}: any) {
  const { t } = useTranslation()

  const statusBatch = () => (
    <p className={clsx([classes['rfp-details-row-status'], classes[rfp.status]])}>
      {t(
        (rfp.status?.toLowerCase() === 'active'
          || rfp.status?.toLowerCase() === 'closed')
          ? rfp.status : 'draft',
      )}
    </p>
  );

  const renderRowItem = (label: any, value: any) => !!value && (
    <div key={label} className={classes["rfp-details-section-table-row"]}>
      <div className={classes["rfp-details-section-table-row-left"]}>
        {words(label).map(item => upperFirst(item)).join(' ')}
      </div>
      <div className={classes["rfp-details-section-table-row-right"]}>
        {value}
      </div>
    </div>
  );

  const renderRow = ({ label, value }: { label: string, value: any }) => {
    if (label && value) {
      return (
        renderRowItem(label, value)
      );
    }
    return <></>;
  };

  return (
    <div className={classes['rfp-details-section']}>
      <div className={classes["rfp-details-section-top"]}>
        <h3>
          {rfp.name}
        </h3>
      </div>
      <div className={classes["rfp-details-section-status"]}>
        {statusBatch()}
      </div>
      <div className={classes["rfp-details-section-table"]}>
        {Object.keys(rfpDetails).map(item => renderRow({ label: item, value: rfpDetails[item] }))}
          {/* // .slice(1, rfpDetails.length - 1) */}
          {/* .map((item: any) => renderRow(item)) */}
      </div>
      {(onViewResponses)
        && (
        <div className={classes["rfp-details-section-footer"]}>
          {onViewResponses && (
            <SubmitProposalButton
              onClick={onViewResponses}
              variant="contained"
              color="primary"
            >
              {t('view_responses')}
            </SubmitProposalButton>
          )}
          {onViewRfp && (
            <ViewButton
              onClick={onViewRfp}
              variant="outlined"
              color="primary"
            >
              {t('view_rfp')}
            </ViewButton>
          )}
        </div>
        )}
    </div>
  );
}
