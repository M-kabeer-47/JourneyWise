'use client';

import { ReactNode, useState } from 'react';

export default function BlogInfoClient({ children }: { children: ReactNode }) {
  const [showTabs, setShowTabs] = useState(false);

  return (
    <div className="flex flex-col gap-y-4 h-[1000px]">
      <h1 className="font-bold text-6xl text-center">Welcome to the Blog Editor</h1>
      <button
        className="btn-primary max-w-[300px]"
        onClick={() => setShowTabs(true)}
      >
        View tabs
      </button>
      {showTabs && children}
    </div>
  );
}
