'use client';

import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const page = () => {
    const router = useRouter();

  useEffect(() => {
    (async () => {
      toast.error('Session Expired');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/signin');
    //   await signOut({
    //     callbackUrl: '/signin',
    //   });
    })();
  }, []);

  return (
    <div>
      <h1>Invalid Session</h1>
    </div>
  );
};

export default page;