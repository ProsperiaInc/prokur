import React from 'react';
import parseDate from 'utils/dateHelper';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@mui/material';
import classes from './RfpDetailsSection.module.css';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';

const SubmitProposalButton = styled(Button)(({ theme }) => `margin-right: 15px;`)

const ViewButton = styled(Button)(({ theme }) => ``)

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
        {label}
      </div>
      <div className={classes["rfp-details-section-table-row-right"]}>
        {value}
      </div>
    </div>
  );

  const renderRow = (item: any) => {
    if (item) {
      const label = item.label || item.meta?.labels;
      let { value } = item;

      if (item.meta?.type === 'datetime') value = parseDate(value);
      if (item.meta?.type === 'currency') value = !!value && `$${value}`;

      if (typeof label === 'object' && typeof value === 'object') {
        return Object
          .keys(value)
          .map((key) => renderRowItem(label[key], value[key]));
      }

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
        {rfpDetails
          .slice(1, rfpDetails.length - 1)
          .map((item: any) => renderRow(item))}
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
