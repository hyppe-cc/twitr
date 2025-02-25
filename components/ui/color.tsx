import { ReactNode } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { cn } from '~/lib/utils';
import ClassNameProvider, { useClassName } from '~/providers/classname-privider';

export const Text = ({ className, ...props }: TextProps) => {
  const { className: parentClass } = useClassName();

  return <RNText className={cn(parentClass, className)} {...props} />;
};

export default function Color({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <ClassNameProvider className={className}>{children}</ClassNameProvider>;
}
