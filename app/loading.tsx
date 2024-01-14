import { Flex, Grid } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <Flex direction="row" justify="start" gap="4" align="center">
          <Skeleton className="animate-pulse" height="80px" width="120px" />
          <Skeleton className="animate-pulse" height="80px" width="120px" />
          <Skeleton className="animate-pulse" height="80px" width="120px" />
        </Flex>
        {/* </Grid> */}
        <Skeleton className="animate-pulse" height="20rem" />
      </Flex>
      <Skeleton className="animate-pulse" height="27rem" />
    </Grid>
  );
}
