import { cva, VariantProps } from 'class-variance-authority';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Color from '~/components/ui/color';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'hover:text-accent-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants>, TouchableOpacityProps {}

export default function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity className={buttonVariants({ variant, size, className })} {...props}>
      <Color className={textVariants({ variant, className })}>{children}</Color>
    </TouchableOpacity>
  );
}
