import { DialogContent, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import SharedAddEmail from '../SharedEmailTab/SharedAddEmail';
import SharedEmails from '../SharedEmailTab/SharedEmails';
import SharedModalActions from './SharedModalActions';
import SharedLink from '../SharedLinkTab/SharedLink';
import SwitchPassword from '../SharedLinkTab/SwitchPassword';
import { useTranslation } from 'next-i18next';

const PREFIX = 'SharedModalContent';

const classes = {
  content: `${PREFIX}-content`,
  tablist: `${PREFIX}-tablist`,
  tab: `${PREFIX}-tab`,
  panelEmail: `${PREFIX}-panelEmail`,
  panel: `${PREFIX}-panel`
};

const StyledDialogContent = styled(DialogContent)((
  {
    theme
  }
) => ({
  [`&.${classes.content}`]: {
    padding: 0,
  },

  [`& .${classes.tablist}`]: {
    position: 'relative',
    '& .MuiTabs-indicator': {
      zIndex: 2,
    },
    '&::after': {
      height: '1px',
      content: '""',
      bottom: 0,
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      transform: 'translateY(-0.5px)',
      backgroundColor: '#e5e5e5',
    },
    paddingLeft: '46px',
    '& .Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.tab}`]: {
    minWidth: '64px',
    fontSize: '16px',
  },

  [`& .${classes.panelEmail}`]: {
    padding: 0,
    height: '330px',
  },

  [`& .${classes.panel}`]: {
    height: '330px',
  }
}));

export default function SharedModalContent() {
  const { t } = useTranslation('common')
  const [value, setValue] = useState('1');

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <StyledDialogContent className={classes.content}>
      <TabContext value={value}>
        <TabList
          className={classes.tablist}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab
            className={classes.tab}
            label={t('email_field')}
            value="1"
          />
          <Tab className={classes.tab} label={t('link')} value="2" />
        </TabList>

        <TabPanel className={classes.panelEmail} value="1">
          <SharedAddEmail />
          <SharedEmails />
          <SharedModalActions />
        </TabPanel>
        <TabPanel className={classes.panel} value="2">
          <SharedLink />
          <SwitchPassword />
        </TabPanel>
      </TabContext>
    </StyledDialogContent>
  );
}
