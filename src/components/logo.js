import React from 'react';
import useSiteSettings from '../hooks/useSiteSettings';

export default function Logo() {
  const { logo } = useSiteSettings();

  if (!logo?.fixed?.src) return null;

  return (
    <img
      src={logo?.fixed?.src}
      alt={logo?.title}
      srcSet={logo?.fixed?.srcSet}
      width={logo?.fixed?.width}
      height={logo?.fixed?.height}
    />
  );
}
