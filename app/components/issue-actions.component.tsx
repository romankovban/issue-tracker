import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

export const IssueActions = () => {
  return (
    <Flex justify="between">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};
