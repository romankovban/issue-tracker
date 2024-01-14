import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface ContainerValues {
  label: string;
  value: number;
  status: Status;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: ContainerValues[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    {
      label: 'In-progress Issues',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Link
          className="text-sm font-medium"
          href={`/issues/list?status=${container.status}`}
        >
          <Card key={container.label}>
            <Flex direction="column" gap="1">
              {container.label}
              <Text size="5" className="font-bold text-center">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
