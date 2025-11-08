import React from 'react';
import '../styles/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'secondary' | 'neutral';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'solid',
  color = 'primary',
  iconLeft,
  iconRight,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${color}`,
    fullWidth ? 'btn--fullWidth' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} {...props}>
      {iconLeft && <span className="btn-icon btn-icon--left">{iconLeft}</span>}
      <span className="btn-text">{children}</span>
      {iconRight && <span className="btn-icon btn-icon--right">{iconRight}</span>}
    </button>
  );
}