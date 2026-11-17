import type { ReactNode } from 'react';

// Props this component accepts
interface ContainerProps {
  children: ReactNode; // anything placed inside
  as?: 'div' | 'main'; // which HTML tag to use (default div)
  id?: string; // optional id
  className?: string; // optional extra CSS class
}

// Centers content and limits its width
export function Container({ children, as: Tag = 'div', id, className = '' }: ContainerProps) {
  return (
    <Tag id={id} className={`container ${className}`.trim()}>
      {children}
    </Tag>
  );
}
