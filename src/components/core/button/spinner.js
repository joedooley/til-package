import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function Spinner({ fill = 'white' }) {
  const pathVariants = {
    hidden: {
      rotate: 0,
    },
    visible: {
      rotate: 360,
      transition: { loop: Infinity, ease: 'linear', duration: 1 },
    },
  };

  return (
    <motion.svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="loading animation"
    >
      <motion.path
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.86049 17.7714C0.616393 15.8591 -0.0308337 13.62 0.00112936 11.3389L0.01514 10.339L3.39639 10.3864L3.38238 11.3863C3.35981 12.9966 3.81672 14.5773 4.69499 15.9273C5.57326 17.2772 6.83321 18.3355 8.31457 18.9674C9.79593 19.5993 11.4318 19.7763 13.014 19.476C14.5963 19.1756 16.0535 18.4115 17.2002 17.2807C18.347 16.1499 19.1315 14.7035 19.454 13.1256C19.7765 11.5477 19.6224 9.90957 19.0113 8.4195C18.4002 6.92943 17.3597 5.65479 16.0222 4.75769C14.6846 3.86059 13.1105 3.38158 11.5 3.38158L10.5 3.38158L10.5 1.25211e-07L11.5 1.37136e-07C13.7813 1.64341e-07 16.0111 0.678539 17.9058 1.94931C19.8004 3.22007 21.2743 5.02564 22.14 7.13638C23.0056 9.24711 23.2239 11.5676 22.7671 13.8028C22.3103 16.0379 21.199 18.0867 19.5746 19.6885C17.9501 21.2903 15.886 22.3728 13.6447 22.7982C11.4034 23.2237 9.08614 22.9729 6.98774 22.0778C4.88934 21.1826 3.10459 19.6836 1.86049 17.7714Z"
        fill={fill}
      />
    </motion.svg>
  );
}

Spinner.propTypes = {
  fill: PropTypes.string,
};
