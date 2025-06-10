
// components/SocialIcon.tsx
import React from 'react';

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  color?: string; // Optional color override
  size?: number | string; // Optional size
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  children,
  color = '', // Default color
  size = 24, // Default size
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} opacity-70 cursor-pointer transition-transform duration-300 hover:scale-105`}
      style={{ color, fontSize: size }}
    >
      {children}
    </a>
  );
};

export default SocialIcon;
