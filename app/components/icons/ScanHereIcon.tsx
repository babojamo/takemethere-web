import * as React from 'react';

type ScanHereProps = {
  /** "icon" = 128×128, "labeled" = 128×160 with text */
  variant?: 'icon' | 'labeled';
  /** Width/height of the SVG (number = px or CSS string) */
  size?: number | string;
  /** Stroke/text color. Defaults to currentColor so you can style via CSS. */
  color?: string;
  /** Label text (only used in "labeled" variant). Set to "" to hide text. */
  label?: string;
  /** Adds a subtle navy gradient background behind the icon */
  withBackground?: boolean;
  /** Accessible title (sets <title> and aria-label). */
  title?: string;
  className?: string;
};

export default function ScanHereIcon({
  variant = 'icon',
  size = 128,
  color = 'currentColor',
  label = 'Scan here',
  withBackground = false,
  title = 'Scan here',
  className
}: ScanHereProps) {
  const id = React.useId();
  const viewBox = variant === 'icon' ? '0 0 128 128' : '0 0 128 160';
  const width = typeof size === 'number' ? `${size}px` : size;
  const height = typeof size === 'number' ? `${size * (variant === 'icon' ? 1 : 160 / 128)}px` : size;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width} height={height} role="img" aria-label={title} className={className}>
      <title>{title}</title>

      <defs>
        <clipPath id={`leftClip-${id}`}>
          {/* show only the left ~60% so the circles appear as arcs */}
          <rect x="0" y="0" width="78" height="128" />
        </clipPath>

        {withBackground && (
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050a26" />
            <stop offset="100%" stopColor="#0c1b8a" />
          </linearGradient>
        )}
      </defs>

      {/* Optional background */}
      {withBackground && <rect x="0" y="0" width="128" height={variant === 'icon' ? 128 : 160} fill={`url(#bg-${id})`} />}

      {/* Icon strokes */}
      <g fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round">
        <g clipPath={`url(#leftClip-${id})`}>
          <circle cx="44" cy="44" r="32" />
          <circle cx="44" cy="44" r="22" />
          <circle cx="44" cy="44" r="12" />
        </g>

        {/* Scanner square */}
        <rect x="68" y="56" width="40" height="40" rx="8" ry="8" />
        {/* Inner window */}
        <rect x="84" y="72" width="8" height="8" />
      </g>

      {/* Label for "labeled" variant */}
      {variant === 'labeled' && label !== '' && (
        <text x="64" y="150" fontFamily="Inter,Segoe UI,Roboto,Arial,sans-serif" fontSize="14" textAnchor="middle" fill={color}>
          {label}
        </text>
      )}
    </svg>
  );
}
