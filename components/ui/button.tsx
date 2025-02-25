import { cva, VariantProps } from 'class-variance-authority';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Color from '~/components/ui/color';

const buttonVariants = cva('flex flex-row gap-1 items-center justify-center p-2.5 rounded-md', {
  variants: {
    variant: {
      default: 'border border-gray-300 dark:border-zinc-500',
      desctructive: 'bg-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-gray-950 dark:text-gray-50',
      desctructive: 'text-zinc-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants>, TouchableOpacityProps {}

export default function Button({ className, variant, children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity className={buttonVariants({ variant, className })} {...props}>
      <Color className={textVariants({ variant, className })}>{children}</Color>
    </TouchableOpacity>
  );
}
