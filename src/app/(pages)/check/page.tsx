// no "use client" here
import dynamic from 'next/dynamic';
import BlogInfoClient from './bloginfo';

// dynamically import your Server Component
const Tabs = dynamic(
  () => import('./tabs').then((mod) => mod.Tabs),
  { ssr: true }
);

export default function BlogEditorPage() {
  return (
    // render your Client Component, passing <Tabs /> as its child
    <BlogInfoClient>
      <Tabs />
    </BlogInfoClient>
  );
}
