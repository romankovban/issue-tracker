import { IssueActions, IssueTable, columnNames } from '@/app/components';
import { IssueQuery } from '@/app/components/issue-table.component';
import { prisma } from '@/app/core/prisma';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';

interface IssuesPageProps {
  searchParams: IssueQuery;
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
    </Flex>
  );
}
