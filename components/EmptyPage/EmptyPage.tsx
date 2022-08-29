import React from 'react'
import { styled } from '@mui/material/styles';
import { Button, SvgIcon } from '@mui/material';
import emptyPageClasses from './EmptyPage.module.css';

const PREFIX = 'EmptyPage';

const classes = {
  imageIcon: `${PREFIX}-imageIcon`,
  button: `${PREFIX}-button`
};

const Root = styled('div')(() => ({
  [`& .${classes.imageIcon}`]: {
    paddingTop: '84px',
    width: '100%',
    height: '100%',
    maxWidth: '322px',
    maxHeight: '322px'
  },

  [`& .${classes.button}`]: {
    fontSize: '15px',
    borderRadius: '4px'
  }
}));

export default function EmptyPage({ pageTitle, mainText, subText, buttonText, handleButtonClick, icon } : any = {}) {

  const renderEmptyIcon = () => (
    <SvgIcon className={classes.imageIcon} viewBox="0 0 322 322">
      {icon}
    </SvgIcon>
  );

  return (
    <Root className={emptyPageClasses['empty-page-container']}>
      <div className={emptyPageClasses['empty-page-title']}>
        <p className={emptyPageClasses['empty-page-title-text']}>{pageTitle}</p>
      </div>
      <div className={emptyPageClasses['empty-page']}>
        {renderEmptyIcon()}
        <span className={emptyPageClasses['empty-page-main-text']}>{mainText}</span>
        <span className={emptyPageClasses['empty-page-sub-text']}>{subText}</span>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </Root>
  );
}