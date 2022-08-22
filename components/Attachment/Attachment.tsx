import React from 'react';
import PropTypes from 'prop-types';
import classes from './Attachment.module.css';

function Attachment({ src, name, size }: any) {
  return (
    <div className={classes["MultiAttachment-single-file-title-container"]}>
      <img 
       className={classes["MultiAttachment-file-icon"]}
       aria-label="file icon"
       src={src}
      />
      <div>
        <p className={classes["MultiAttachment-single-file-name"]}>{name}</p>
        {size && <p className={classes["MultiAttachment-single-file-size"]}>{size}</p>}
      </div>
    </div>
  );
}

Attachment.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Attachment;
