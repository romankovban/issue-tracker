'use client';

import { IssueStatusBadge } from '@/app/components';
import { useTheme } from '@/app/hooks/use-theme';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface IssueDetailsProps {
  issue: Issue;
}

export const IssueDetails: FC<IssueDetailsProps> = ({ issue }) => {
  const { theme } = useTheme();

  const textareaClasses = clsx(
    `rounded-xl [&_.editor-toolbar]:border-none [&_*.CodeMirror]:!border-none `,
    {
      '!text-[#E2E8F0]': theme === 'dark',
      '!text-[#262626]': theme === 'light',
    }
  );

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown className={textareaClasses}>
          {issue.description}
        </ReactMarkdown>
      </Card>
    </>
  );
};
