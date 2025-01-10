interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const ICONS = {
  'arrow-right-box': 'M3 3h18v18H3V3zm16 16V5H5v14h14zm-6-8h4v2h-4v4h-2v-4H7v-2h4V7h2v4z',
  'arrow-right': 'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z',
  'arrow-up-box': 'M3 3h18v18H3V3zm16 16V5H5v14h14zm-8-4V9H7v2h2v2h2v2h2v-2h2v-2h2V9h-4v6h-2z',
  'chevron-right': 'M10 6h2v2h-2V6zm2 2h2v2h-2V8zm2 2h2v4h-2v-4zm-2 4h2v2h-2v-2zm-2 2h2v2h-2v-2z',
  'plus': 'M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z',
  'chart-up': 'M3 3h2v16h16v2H3V3zm4 8v6h2v-6H7zm4-4v10h2V7h-2zm4-2v12h2V5h-2z',
  'target': 'M12 2h-2v2H8v2H6v2H4v2H2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h-2V8h-2V6h-2V4h-2V2zm0 4h2v2h2v2h2v4h-2v2h-2v2h-4v-2H8v-2H6v-4h2V8h2V6h2z',
  'grid': 'M3 3h8v8H3V3zm6 6V5H5v4h4zm9 4h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3zM15 3h6v8h-8V3h2zm4 6V5h-4v4h4zM5 13h6v8H3v-8h2zm4 6v-4H5v4h4z',
  'lightbulb': 'M12 2h-2v2H8v4H6v4h2v2h2v2h4v-2h2v-2h2V8h-2V4h-2V2h-2zm0 12h-2v-2H8V8h2V4h2v4h2v4h-2v2z'
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  const path = ICONS[name as keyof typeof ICONS];
  
  if (!path) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
} 