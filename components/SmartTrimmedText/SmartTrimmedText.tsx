import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import I18n from 'i18n-js';
import styles from './SmartTrimmedText.module.css';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function SmartTrimmedText({
  text,
  limit,
  seeMoreLink,
  classes,
} : any) {
  const { t } = useTranslation('common')
  const trimmed = useMemo(() => {
    if (text.length > limit) {
      let description = text.slice(0, limit - 3) || '';
      description = description.split(' ');
      description.pop();
      description = description.join(' ');
      description += '...';
      return description;
    }
    return text;
  }, [text]);

  return (
    <>
      <p className={clsx(
        styles['smart-trimmed-text'],
        classes.text,
      )}
      >
        {trimmed}
      </p>
      { text.length > limit
        && (
        <Link
          href={seeMoreLink}
          className={clsx(
            styles['smart-trimmed-text-more'],
            classes.button,
          )}
        >
          {t('see_more')}
        </Link>
        )}
    </>
  );
}