import { prisma } from '@/app/core/prisma';
import DeleteIssueButton from '@/app/issues/[id]/_components/delete-issue-button.component';
import { EditIssueButton } from '@/app/issues/[id]/_components/edit-issue-button.component';
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
    <Grid columns={{ initial: '1', sm: '5' }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="md:col-span-1 space-y-3">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
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
