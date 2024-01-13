import { NextResponse } from 'next/server';
import { prisma } from '@/app/core/prisma';
import { createIssueDto } from './dto';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/core/auth-options';

export async function GET(req: Request) {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const bodyRaw = await req.json();
  const validateBody = createIssueDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const { title, description } = validateBody.data;

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(newIssue);
}
