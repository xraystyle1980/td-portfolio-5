import { Icon } from './Icon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function ArrowRight({ size = 24, ...props }: IconProps) {
  return <Icon name="arrow-right-box" size={size} {...props} />;
} 