'use client';

// import { Skeleton } from '@/app/components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import clsx from 'clsx';
// import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import { useTheme } from '@/app/hooks/use-theme';
import { ThemeSwitch } from '@/app/components/theme-switch.component';

export const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="mb-5 px-5 py-4 bg-slate-200 shadow-lg dark:bg-[#1B1B1D]">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="8">
            <Link href="/">
              <AiFillBug
                size="1.5rem"
                className="cursor-pointer"
                color={theme}
              />
            </Link>
            <NavLinks theme={theme} />
          </Flex>
          <Flex align="center" gap="9">
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = ({ theme }: { theme: string }) => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={clsx('text-lg font-semibold text transition-colors', {
              'text-zinc-700 hover:text-zinc-500': theme === 'light',
              'text-zinc-100 hover:text-zinc-400': theme === 'dark',
              '!text-zinc-400 dark:text-zinc-400 underline':
                link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  // const { status, data: session } = useSession();

  // if (status === 'loading') return <Skeleton width="3rem" />;

  // if (status === 'unauthenticated')
  //   return (
  //     <Link className="nav-link" href="/api/auth/signin">
  //       Login
  //     </Link>
  //   );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            // src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            {/* <Text size="2">{session!.user!.email}</Text> */}
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
