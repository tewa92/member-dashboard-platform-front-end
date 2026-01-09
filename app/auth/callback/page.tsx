'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setToken(token);
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [searchParams, setToken, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-violet-500" />
        <p className="mt-4 text-slate-400">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
