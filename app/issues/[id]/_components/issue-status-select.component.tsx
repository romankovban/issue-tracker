'use client';

import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '@/app/core/api';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const updateStatus = async (status: string) => {
    await api
      .patch(`/api/issues/${issue.id}`, {
        status: status,
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
    router.refresh();
  };

  return (
    <>
      <Select.Root
        size="3"
        defaultValue={issue.status}
        onValueChange={updateStatus}
      >
        <Select.Trigger
          className="min-w-44 !cursor-pointer w-full sm:w-auto"
          variant="soft"
        />
        <Select.Content position="popper">
          {statuses.map((status) => (
            <Select.Item
              className="!cursor-pointer"
              key={`filter-status-${status.value}`}
              value={status.value!}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default IssueStatusSelect;
