'use client';

import Image from 'next/image';
import PropTypes from 'prop-types';

import { ASKCODER_LOGO_URL, logoSize } from '../../../config/logo';

const AskCoderLogo = ({
  width,
  height,
  className = '',
  priority = false,
  alt = 'AskCoder',
}) => {
  const dimensions = height ? { width, height } : logoSize(width);

  return (
    <Image
      src={ASKCODER_LOGO_URL}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      priority={priority}
    />
  );
};

AskCoderLogo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  priority: PropTypes.bool,
  alt: PropTypes.string,
};

export default AskCoderLogo;
