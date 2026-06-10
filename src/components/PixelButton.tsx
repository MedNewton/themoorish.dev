import type { ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { sfx } from '@/world/sound';
import styles from './PixelButton.module.css';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
  variant?: 'gold' | 'ghost' | 'teal';
  size?: 'md' | 'lg';
  external?: boolean;
  ariaLabel?: string;
}

export default function PixelButton({
  children,
  href,
  onClick,
  variant = 'gold',
  size = 'md',
  external,
  ariaLabel,
}: Props) {
  const cls = clsx(styles.btn, styles[variant], size === 'lg' && styles.lg);
  const common = {
    className: cls,
    onMouseEnter: () => sfx.hover(),
    onClick: (e: React.MouseEvent) => {
      sfx.click();
      onClick?.(e);
    },
    'aria-label': ariaLabel,
  };
  if (href) {
    return (
      <a
        href={href}
        {...common}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        <span className={styles.inner}>{children}</span>
      </a>
    );
  }
  return (
    <button type="button" {...common}>
      <span className={styles.inner}>{children}</span>
    </button>
  );
}
