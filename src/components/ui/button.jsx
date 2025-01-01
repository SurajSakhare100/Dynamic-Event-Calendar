import React from 'react';
import clsx from 'clsx';

const Button = ({
  variant = 'primary', // primary, secondary, danger
  size = 'md', // sm, md, lg
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  const baseStyles = `inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition`;

  const variantStyles = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400`,
    secondary: `bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400`,
    disabled: `bg-gray-400 text-gray-200 cursor-not-allowed`,
  };

  const sizeStyles = {
    sm: `px-3 py-1 text-sm`,
    md: `px-4 py-2 text-base`,
    lg: `px-6 py-3 text-lg`,
  };

  const computedStyles = clsx(
    baseStyles,
    disabled ? variantStyles.disabled : variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={computedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
