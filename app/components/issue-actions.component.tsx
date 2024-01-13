import IssueStatusFilter from '@/app/components/issue-status-filter.component';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

export const IssueActions = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button className="!cursor-pointer" size="3">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};
