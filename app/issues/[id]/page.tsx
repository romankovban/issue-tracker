import authOptions from '@/app/core/auth-options';
import { prisma } from '@/app/core/prisma';
import AssigneeSelect from '@/app/issues/[id]/_components/assignee-select.component';
import DeleteIssueButton from '@/app/issues/[id]/_components/delete-issue-button.component';
import { EditIssueButton } from '@/app/issues/[id]/_components/edit-issue-button.component';
import { IssueDetails } from '@/app/issues/[id]/_components/issue-details.component';
import { Box, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
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
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(params.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="md:col-span-1 space-y-3">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
          <AssigneeSelect issue={issue} />
        </Box>
      )}
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
