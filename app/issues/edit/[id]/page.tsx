import { prisma } from '@/app/core/prisma';
import IssueFormSkeleton from '@/app/issues/_components/issue-form-skeleton.component';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/issue-form.component'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

interface IssueDetailsProps {
  params: {
    id: string;
  };
}

export default async function IssueDetailsPage({ params }: IssueDetailsProps) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
}
