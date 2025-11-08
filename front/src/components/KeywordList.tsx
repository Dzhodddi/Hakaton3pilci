import React from 'react';
import { KeywordTag } from './KeywordTag';
import '../styles/KeywordList.css';

interface KeywordListProps {
  keywords: string[];
  onAddClick: () => void;
}

export function KeywordList({ keywords, onAddClick }: KeywordListProps) {
  return (
    <div className="keyword-list">
      {keywords.map((keyword) => (
        <KeywordTag key={keyword}>
          {keyword}
        </KeywordTag>
      ))}
      <KeywordTag isAddButton={true} onClick={onAddClick}>
        +
      </KeywordTag>
    </div>
  );
}