interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function ArrowRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 5h2v2h-2V5zm2 2h2v2h-2V7zm2 2h2v6h-2V9zm-2 6h2v2h-2v-2zm-2 2h2v2h-2v-2zM4 11h12v2H4v-2z"
        fill="currentColor"
      />
    </svg>
  );
} 