import React from 'react';
import PropTypes from 'prop-types';
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { MdMoreHoriz } from 'react-icons/md';

export default function MenuButton({
  menuIcon,
  list,
  name,
  classes,
  placement,
}: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (list.filter(Boolean).length === 0) return null;

  return (
    <div className={classes.container}>
      <IconButton className={classes.button} aria-controls={name} aria-haspopup="true" onClick={handleClick}>
        {menuIcon ?? <MdMoreHoriz />}
      </IconButton>
      <Popper
        placement={placement}
        sx={{
          zIndex: 1000
        }}
        id={name}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
          >
            <Paper elevation={2}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.list}
                  onClick={handleClose}
                >
                  {list.map((listItem: any, index: any) => (
                    <MenuItem
                      className={listItem.className}
                      key={`${listItem.label}_${index + 1}`}
                      onClick={listItem.onClick}
                    >
                      {listItem.icon && listItem.icon}
                      {listItem.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

MenuButton.defaultProps = {
  menuIcon: null,
  classes: {
    list: '',
    button: '',
    container: '',
  },
  placement: 'bottom',
};

MenuButton.propTypes = {
  menuIcon: PropTypes.node,
  name: PropTypes.string.isRequired,
  placement: PropTypes.string,
  classes: PropTypes.shape({
    list: PropTypes.string,
    button: PropTypes.string,
    container: PropTypes.string,
  }),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      className: PropTypes.string,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ).isRequired,
};
