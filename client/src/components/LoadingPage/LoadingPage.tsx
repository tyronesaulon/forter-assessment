import { Center, Container, Loader } from '@mantine/core';
import { ReactElement } from 'react';
import classes from './LoadingPage.module.css';

export function LoadingPage(): ReactElement {
  return (
    <Container className={classes.wrapper}>
      <Center className={classes.center}>
        <Loader size="xl" />
      </Center>
    </Container>
  );
}
