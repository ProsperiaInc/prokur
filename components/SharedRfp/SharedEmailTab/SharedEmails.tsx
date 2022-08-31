import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MdCancel } from 'react-icons/md';
import React from 'react';
import { useSharedModal } from '../SharedModalContext';

const PREFIX = 'SharedEmails';

const classes = {
  list: `${PREFIX}-list`,
  itemList: `${PREFIX}-itemList`,
  item: `${PREFIX}-item`,
  text: `${PREFIX}-text`,
  iconButton: `${PREFIX}-iconButton`,
  icon: `${PREFIX}-icon`
};

const StyledList = styled(List)((
  {
    theme
  }
) => ({
  [`&.${classes.list}`]: {
    padding: '10px 0',
    paddingLeft: '70px',
    height: '126px',
    overflow: 'auto',
    borderBottom: `1px solid ${theme.custom.borderColor}`,
  },

  [`& .${classes.itemList}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },

  [`& .${classes.item}`]: {
    // minWidth: '200px',
    width: 'fit-content',
    height: '20px',
    margin: '11px 194px 10px 0',
    padding: '9px 15px 10px',
    borderRadius: '4px',
    position: 'relative',
    color: theme.custom.cellTextColor,
    marginTop: '5px',
    marginBottom: '5px',
    '& .MuiIconButton-edgeEnd': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: theme.custom.cellHoverColor,
      color: theme.palette.secondary.main,
      '& .MuiIconButton-edgeEnd': {
        display: 'flex',
      },
    },
  },

  [`& .${classes.text}`]: {
    margin: '0 12px 0 0',
    fontSize: '14px',
  },

  [`& .${classes.iconButton}`]: {
    padding: 0,
    marginRight: 0,
  },

  [`& .${classes.icon}`]: {
    fontSize: '14px',
  }
}));

export default function SharedEmails() {
  const { emails, setEmails } = useSharedModal();


  const onRemove = (event, email) => setEmails(emails.filter((item) => item !== email));

  return (
    <StyledList className={classes.list}>
      {emails.map((email) => (
        <ListItem
          key={email}
          className={classes.itemList}
          ContainerProps={{ className: classes.item }}
        >
          <ListItemText className={classes.text} primary={email} />
          <ListItemSecondaryAction>
            <IconButton
              className={classes.iconButton}
              onClick={(e) => onRemove(e, email)}
              edge="end"
              aria-label="delete"
              size="large">
              <MdCancel className={classes.icon} color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </StyledList>
  );
}
