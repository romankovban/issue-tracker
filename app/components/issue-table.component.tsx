import { IssueStatusBadge } from '@/app/components/issue-status-badge.component';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';

interface ColumnValue {
  label: string;
  value: keyof Issue;
  className?: string;
}

const columns: ColumnValue[] = [
  { label: 'Issue', value: 'title' },
  {
    label: 'Status',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map((column) => column.value);

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface IssueTableProps {
  searchParams: IssueQuery;
  issues: Issue[];
}

export const IssueTable = ({ searchParams, issues }: IssueTableProps) => {
  return (
    <Table.Root variant="surface" size="3">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </Link>
              {column.value === searchParams?.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
