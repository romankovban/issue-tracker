'use client';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, Flex, Grid, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateIssueDto, createIssueDto } from '@/app/api/issues/dto';
import { ErrorMessage, Spinner } from '@/app/components';
import { useTheme } from '@/app/hooks/use-theme';
import clsx from 'clsx';
import IssueStatusSelect from '@/app/issues/[id]/_components/issue-status-select.component';

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueDto>({
    resolver: zodResolver(createIssueDto),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        router.push(`/issues/${issue.id}`);
      } else {
        await axios.post('/api/issues', data);
        router.push('/issues/list');
      }
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  const textareaClasses = clsx(
    `rounded-xl [&_.editor-toolbar]:border-none [&_*.CodeMirror]:!border-none `,
    {
      '[&_*.CodeMirror]:bg-[#E2E8F0] [&_*.CodeMirror]:!text-[#262626] bg-[#262626] !text-[#E2E8F0]':
        theme === 'dark',
      '[&_*.CodeMirror]:bg-zinc-100 [&_*.CodeMirror]:!text-[#0a0a0a] bg-[#E2E8F0] !text-[#262626]':
        theme === 'light',
    }
  );

  const inputClasses = clsx('!py-5 !px-2 !text-lg', {
    '!text-[#262626] placeholder:!text-[#909398] !bg-[#E2E8F0]':
      theme === 'dark',
    '!bg-[#F4F4F5]': theme === 'light',
  });

  return (
    <Flex className="flex-col md:flex-row" gap="4" justify="between">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="w-full space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            className={inputClasses}
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              className={textareaClasses}
              placeholder="Description"
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {issue ? (
          <Box className="block md:hidden">
            <IssueStatusSelect issue={issue} />
          </Box>
        ) : null}
        <Button
          className="!cursor-pointer w-full sm:w-auto"
          size="3"
          disabled={isSubmitting}
        >
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
      {issue ? (
        <Box className="hidden md:block">
          <IssueStatusSelect issue={issue} />
        </Box>
      ) : null}
    </Flex>
  );
};

export default IssueForm;
