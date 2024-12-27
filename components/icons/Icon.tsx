interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const ICONS = {
  'arrow-right-box': 'M3 21V3h18v18H3zM19 5H5v14h14V5zM7 13v-2h6V9h2v2h2v2h-2v2h-2v-2H7zm4 2h2v2h-2v-2zm0-8v2h2V7h-2z'
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