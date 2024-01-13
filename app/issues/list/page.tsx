import {
  IssueActions,
  IssueTable,
  Pagination,
  columnNames,
} from '@/app/components';
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

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}
