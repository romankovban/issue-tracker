import { updateIssueDto } from '@/app/api/issues/dto';
import { prisma } from '@/app/core/prisma';
import { NextResponse } from 'next/server';

interface IssueProps {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: IssueProps) {
  const { id } = params;

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  return NextResponse.json(issue);
}

export async function PATCH(request: Request, { params }: IssueProps) {
  const { id } = params;
  const bodyRaw = await request.json();

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const validateBody = updateIssueDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id,
    },
    data: {
      ...validateBody.data,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: Request, { params }: IssueProps) {
  const { id } = params;

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
