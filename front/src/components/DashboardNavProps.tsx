import React from 'react';
import '../styles/DashboardNav.css';

type NavView = 'Profile' | 'Instances' | 'Training';

interface DashboardNavProps {
  activeView: NavView;
  onNavClick: (view: NavView) => void;
}

export function DashboardNav({ activeView, onNavClick }: DashboardNavProps) {
  const navItems: NavView[] = ['Profile', 'Instances', 'Training'];

  const getClassName = (item: NavView) => {
    return `dashboard-nav-item ${activeView === item ? 'active' : ''}`;
  };

  return (
    <nav className="dashboard-nav-container">
      {navItems.map((item) => (
        <button
          key={item}
          className={getClassName(item)}
          onClick={() => onNavClick(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}