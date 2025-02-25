import { Image as ExpoImage, ImageProps } from 'expo-image';
import { cssInterop } from 'nativewind';

const StyledImage = cssInterop(ExpoImage, {
  className: 'style',
});

export default function Image(props: ImageProps & { className?: string }) {
  return <StyledImage {...props} />;
}
