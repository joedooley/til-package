import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Flex, Text, Button, Heading } from '@components/core/html';

const Panel = React.forwardRef(({ children, onCancel, onSave, width, ...rest }, ref) => {
  const handleCancel = React.useCallback(() => {
    console.log(`handleCancel`);

    onCancel();
  }, [onCancel]);

  const handleSave = React.useCallback(() => {
    console.log(`handleSave cb:`);

    onSave();
  }, [onSave]);

  return (
    <>
      <div
        css={css`
          background-color: rgba(0, 0, 0, 0.5);
          bottom: 0;
          left: 0;
          opacity: 0.5;
          position: fixed;
          right: 0;
          top: 0;
        `}
      />
      <Flex
        {...rest}
        ref={ref}
        direction="column"
        css={theme => css`
          background-color: ${theme.colors.black[400]};
          height: 100vh;
          position: fixed;
          right: 0;
          top: 0;
          width: ${width ?? '50%'};
          z-index: 99999;
          & > * {
            width: 100%;
          }
        `}
      >
        <Flex
          as="header"
          hAlign="space-between"
          css={theme => css`
            border-bottom: 1px solid ${theme.colors.black[700]};
            padding: ${theme.space[3]};
          `}
        >
          <Button variant="warning" ariaLabel="Click to close panel" onClick={handleCancel}>
            Cancel
          </Button>

          <Button ariaLabel="Click to save changes" onClick={handleSave}>
            Save
          </Button>
        </Flex>

        <Flex
          vAlign="flex-start"
          direction="column"
          css={theme => css`
            padding: ${theme.space[3]};
          `}
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
});

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  width: PropTypes.string,
};

Panel.displayName = 'Panel';

export default Panel;
