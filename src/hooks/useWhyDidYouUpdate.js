import * as React from 'react';
import { isEqual } from 'lodash';

// Usage
// useWhyDidYouUpdate('ComponentName', props);

export default function useWhyDidYouUpdate(name, props) {
  const prevProps = React.useRef(props);

  React.useEffect(() => {
    if (__PROD__) return;

    const allKeys = Object.keys({ ...prevProps.current, ...props });
    const changesObj = {};

    allKeys.forEach(key => {
      if (!isEqual(prevProps.current[key] !== props[key])) {
        changesObj[key] = prevProps.current[key];
      }
    });

    const primaryStyle = 'color: grey; font-weight: lighter;';
    const titleStyle = style => `${style} font-weight: bold;`;

    Object.keys(changesObj).map(key => {
      const now = new Date();

      console.group(
        `%cwhyDidYouUpdate %c@@${name}--${key} %c@${now.toLocaleTimeString()}`,
        primaryStyle,
        titleStyle(),
        primaryStyle
      );

      console.log('%cprev state', titleStyle('color: #9e9393;'), changesObj[key]);
      console.log('%cnext state', titleStyle('color: #4caf50;'), props[key]);

      console.groupEnd();
    });

    prevProps.current = props;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
}
