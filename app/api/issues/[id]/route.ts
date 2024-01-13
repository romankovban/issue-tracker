import { updateIssueDto } from '@/app/api/issues/dto';
import authOptions from '@/app/core/auth-options';
import { prisma } from '@/app/core/prisma';
import { getServerSession } from 'next-auth';
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = params;
  const bodyRaw = await request.json();

  const validateBody = updateIssueDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const { assignedToUserId, title, description, status } = validateBody.data;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: Request, { params }: IssueProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

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

  return NextResponse.json({});
}
