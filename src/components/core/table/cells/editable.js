import * as React from 'react';
import PropTypes from 'prop-types';

export default function EditableCell({ value: initialValue, row: { index }, column: { id }, updateData }) {
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

EditableCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.shape({
    index: PropTypes.number,
  }),
  column: PropTypes.shape({
    id: PropTypes.string,
  }),
  updateData: PropTypes.func,
};
