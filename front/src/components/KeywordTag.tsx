import React from 'react';
import '../styles/KeywordTag.css';

interface KeywordTagProps {
  children: React.ReactNode;
  isAddButton?: boolean;
  onClick?: () => void;
}

export function KeywordTag({ children, isAddButton = false, onClick }: KeywordTagProps) {
  
  const classNames = [
    'keyword-tag',
    isAddButton ? 'keyword-tag--add' : ''
  ].filter(Boolean).join(' ');

  const TagType = onClick ? 'button' : 'div';

  return (
    <TagType className={classNames} onClick={onClick} type={TagType === 'button' ? 'button' : undefined}>
      {children}
    </TagType>
  );
}