import { useWindowDimensions, View, ViewProps } from 'react-native';

export const Container = ({ style, ...props }: ViewProps) => {
  const { width, height } = useWindowDimensions();

  return <View style={[{ position: 'absolute', width, height }, style]} {...props} />;
};
