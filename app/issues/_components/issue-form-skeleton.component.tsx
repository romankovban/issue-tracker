'use client';

import { Box } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/app/components';
import { useTheme } from '@/app/hooks/use-theme';
import clsx from 'clsx';

const IssueFormSkeleton = () => {
  const { theme } = useTheme();
  const textareaClasses = clsx({
    'bg-[#262626]': theme === 'dark',
    'bg-[#E2E8F0]': theme === 'light',
  });

  return (
    <Box className="max-w-4xl space-y-2">
      <Skeleton height="2.5rem" />
      <Skeleton className={textareaClasses} height="22rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
