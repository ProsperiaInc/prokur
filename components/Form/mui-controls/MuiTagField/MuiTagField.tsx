import { Button, FormHelperText, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextFieldLabelWrapper from 'components/TextFieldLabelWrapper/TextFieldLabelWrapper';
import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';
import { fieldName, fieldOnChange, fieldType, fieldValue } from 'utils/commonPropTypes';
import { MAX_RFP_TAGS } from 'utils/constants';
import tagClasses from './MuiTagField.module.css';

const PREFIX = 'TagField';
const classes = {
  helpIcon: `${PREFIX}-helpIcon`,
  helpTooltip: `${PREFIX}-helpTooltip`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }: any
) => ({
  [`& .${classes.helpIcon}`]: {
    fontSize: 11,
    fontWeight: 500,
    color: theme.custom.helpIcon.color,
    marginLeft: 5,
  },

  [`& .${classes.helpTooltip}`]: {
    boxSizing: 'border-box',
    maxWidth: 215,
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    backgroundColor: theme.custom.tooltip.backgroundColor,
    color: theme.custom.tooltip.color,
  }
}));

export default function MuiTagField({ field, name, onChange, value, error, required }: any) {
  const {
    maxText,
    max,
    tooltip,
    subTitle,
    suggestedTags
  } = {
    maxText: 'rfp_editor.tags_max_text',
    max: MAX_RFP_TAGS,
    tooltip: 'rfp_editor.tooltip_title',
    subTitle: 'tag_suggestion',
    ...(field.custom || {}),
  };


  const onAddition = (e) => {
    if (value.includes(e.name)) {
      return;
    }

    const tags = new Set([
      ...value,
      ...e.name
        .split(',')
        .map((el) => el.trim())
        .filter((el) => !!el),
    ]);

    onChange({
      target: {
        value: [...tags],
        name,
      },
    });
  };

  const onDelete = (index) => {
    const newTags = value.filter((_, idx) => idx !== index);
    onChange({
      target: {
        value: newTags,
        name,
      },
    });
  };

  const renderTag = (tag, index) => (
    <Button
      color="secondary"
      key={`tagfield_single_tag_${index + 1}`}
      onClick={() => onAddition({ name: tag })}
    >
      {tag}
    </Button>
  );

  const tagsBuild = value.map((option, index) => ({
    id: index,
    name: option,
  }));

  return (
    (<Root>
      <InputLabel required={required}>
        {field.label}
        {/* <span>{I18n.t(maxText, { max })}</span>
        {tooltip && (
          <Tooltip
            arrow
            title={I18n.t(tooltip)}
            placement='top'
            classes={{
              tooltip: classes.helpTooltip
            }}
          >
            <HelpRounded className={classes.helpIcon} />
          </Tooltip>
        )} */}
      </InputLabel>
      {/* {subTitle && <span className="tag-suggestion">{I18n.t(subTitle)}</span>} */}
      <ReactTags
        classNames={{
          root: tagClasses['tagfield-main'],
          selectedTag: tagClasses['react-tags__selected-tag'],
          searchInput: tagClasses['tagfield-input'],
        }}
        placeholderText=""
        tags={tagsBuild}
        allowNew={value.length < max}
        onDelete={onDelete}
        onAddition={onAddition}
      />
      {!!suggestedTags && !!suggestedTags.length && (
        <div className={tagClasses['tagfield-suggested-tags-container']}>
          <TextFieldLabelWrapper label='SUGGESTED TAGS'>
            {suggestedTags.filter((el) => !value.includes(el)).map(renderTag)}
          </TextFieldLabelWrapper>
        </div>
      )}
      <FormHelperText error={!!error}>{error || ' '}</FormHelperText>
    </Root>)
  );
}

MuiTagField.defaultProps = {
  required: false,
  error: '',
};

MuiTagField.propTypes = {
  field: fieldType.isRequired,
  name: fieldName.isRequired,
  onChange: fieldOnChange.isRequired,
  value: fieldValue.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};
