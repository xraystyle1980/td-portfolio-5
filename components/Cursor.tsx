import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div 
      className={styles.cursor}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  );
} 