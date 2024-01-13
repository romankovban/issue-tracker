import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Container } from '@radix-ui/themes';
import ThemeProvider from '@/app/providers/theme-provider';
import { NavBar } from '@/app/components/navbar.component';
import AuthProvider from '@/app/providers/auth-provider';
import QueryClientProvider from '@/app/providers/react-query-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker with Next.js and Radix UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
