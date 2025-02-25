import { Ionicons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '~/lib/utils';
import { useClassName } from '~/providers/classname-privider';

const StyledIcon = cssInterop(Ionicons, {
  className: 'style',
});

export default function Icon({ size = 18, ...props }: ComponentPropsWithoutRef<typeof StyledIcon>) {
  const { className } = useClassName();

  return <StyledIcon size={size} {...props} className={cn(className)} />;
}
