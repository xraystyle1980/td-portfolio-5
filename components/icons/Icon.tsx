interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const ICONS = {
  'arrow-right-box': 'M3 21V3h18v18H3zM19 5H5v14h14V5zM7 13v-2h6V9h2v2h2v2h-2v2h-2v-2H7zm4 2h2v2h-2v-2zm0-8v2h2V7h-2z',
  'arrow-right': 'M4 11v2h12v2h2v-2h2v-2h-2V9h-2v2H4zm10-4h2v2h-2V7zm0 0h-2V5h2v2zm0 10h2v-2h-2v2zm0 0h-2v2h2v-2z',
  'arrow-up-box': 'M3 21V3h18v18H3zm16-2V5H5v14h14zM11 7h2v6h2v-2h2v2h-2v2h-2v2h-2v-2H9v-2H7v-2h2v2h2V7z',
  'chevron-right': 'M10 6h2v2h-2V6zm2 2h2v2h-2V8zm2 2h2v4h-2v-4zm-2 4h2v2h-2v-2zm-2 2h2v2h-2v-2z',
  'plus': 'M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z'
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