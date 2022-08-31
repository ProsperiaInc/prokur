import React from 'react';
import parseDate from 'utils/dateHelper';
import PropTypes from 'prop-types';
import classes from './RfpCard.module.css';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function RfpCard({ logoUrl, rfp, href }: any) {
  const { t } = useTranslation('common')

  return (
    <div key={`${rfp.id} - ${rfp.name}`} className={classes["rfp-card"]}>
      <Link href={href}>
        <a>
          <figure>{logoUrl && <img src={logoUrl} alt="logo" />}</figure>
          <span className={classes["rfp-card-name"]}>{rfp.name}</span>
          <p className={classes["rfp-card-published"]}>{t('published_at', { date: parseDate(rfp.created_at) })}</p>
          <p className={classes["rfp-card-deadline"]}>{t('deadline_at', { date: parseDate(rfp.deadline_date) })}</p>
        </a>
      </Link>
    </div>
  );
}

RfpCard.defaultProps = {
  logoUrl: '',
};

RfpCard.propTypes = {
  logoUrl: PropTypes.string,
  href: PropTypes.string.isRequired,
  rfp: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    deadlineDate: PropTypes.string,
  }).isRequired,
};
