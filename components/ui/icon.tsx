import { Ionicons } from '@expo/vector-icons';
import { ComponentPropsWithoutRef } from 'react';

export default function Icon({ size = 18, ...props }: ComponentPropsWithoutRef<typeof Ionicons>) {
  return <Ionicons size={size} {...props} />;
}
