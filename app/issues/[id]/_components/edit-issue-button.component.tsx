import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    // <Button className="!cursor-pointer">
    //   <Pencil2Icon />
    //   <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    // </Button>

    <Link href={`/issues/edit/${issueId}`} className="!h-fit ">
      <Button size="3" className="!cursor-pointer w-full">
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};
