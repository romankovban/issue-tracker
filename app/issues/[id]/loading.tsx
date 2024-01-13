import { Skeleton } from '@/app/components';
import { Box, Card, Flex } from '@radix-ui/themes';

export default function LoadingIssueDetailsPage() {
  return (
    <Box className="max-w-xl">
      <Skeleton duration={3} />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" duration={3} />
        <Skeleton width="8rem" duration={3} />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} duration={3} />
      </Card>
    </Box>
  );
}
