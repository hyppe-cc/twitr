import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { P } from '~/components/ui/typography';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <P>hola</P>
      </Container>
    </>
  );
}
