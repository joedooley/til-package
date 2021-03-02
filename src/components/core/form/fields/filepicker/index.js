import React from 'react';
import PropTypes from 'prop-types';

export default function FilePicker(props) {
  const inputRef = React.useRef();

  const onFilesPicked = () => {
    const files = inputRef.current.files;
    if (!files || files.length === 0) return;
    (props.onLoadStart || (() => {}))();
    props.onLoad(files);
    inputRef.current.value = null;
  };

  const clickHandler = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div
      style={{
        fontSize: 'medium',
        padding: '0.5rem',
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: '0.25rem',
        boxShadow: '-1px -1px 3px rgba(0, 0, 0, 0.1), 1px 1px 3px rgba(0, 0, 0, 0.1)',
        ...props.style,
      }}
      onClick={clickHandler}
    >
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        tabIndex="-1"
        accept=".doc, .docx, .pdf, .ppt, .pptx, .csv, .xls, .xlsx, .gif, .jpg, .png"
        multiple
        onChange={onFilesPicked}
      />
      {props.children}
    </div>
  );
}

FilePicker.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  onLoadStart: PropTypes.func,
  onLoad: PropTypes.func,
};
