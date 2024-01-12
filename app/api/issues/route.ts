import { NextResponse } from 'next/server';
import { prisma } from '@/app/core/prisma';
import { createIssueDto } from './dto';

export async function GET(req: Request) {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues);
}

export async function POST(req: Request) {
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
