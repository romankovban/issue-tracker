import { Table } from '@radix-ui/themes';
import { IssueActions, Skeleton } from '../../components';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface" size="3">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row
              key={issue}
              className="[&_*.react-loading-skeleton]:!bg-gray-200"
            >
              <Table.Cell>
                <Skeleton duration={3} />
                <div className="block md:hidden">
                  <Skeleton duration={3} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton duration={3} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton duration={3} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
