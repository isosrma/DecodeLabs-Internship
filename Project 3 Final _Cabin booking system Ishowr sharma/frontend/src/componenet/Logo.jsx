import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../../public/logo.png'; // replace with your logo path

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-4 z-10">
      <img
        src={logoSrc}
        alt="The Wild Oasis logo"
        width={60}
        height={60}
        className="object-contain"
      />
      <span className="text-xl font-semibold text-(--color-primary-100)">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
