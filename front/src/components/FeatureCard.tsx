import React from 'react';
import '../styles/FeatureCard.css';

interface FeatureCardProps {
  text: string;
  icon: string;
}

export function FeatureCard({ text, icon }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <p className="feature-card-text">{text}</p>
      <div className="feature-card-icon">
        <img src={icon} alt="" />
      </div>
    </div>
  );
}