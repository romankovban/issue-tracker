import { prisma } from '@/app/core/prisma';
import { IssueDetails } from '@/app/issues/[id]/_components/issue-details.component';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface IssueDetailsProps {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export default async function IssueDetailPage({ params }: IssueDetailsProps) {
  const issue = await fetchIssue(params.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
    </Grid>
  );
}

export async function generateMetadata({ params }: IssueDetailsProps) {
  const issue = await fetchIssue(params.id);

  return {
    title: issue?.title,
    description: `Details of issue${issue?.id}`,
  };
}
