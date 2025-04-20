"use client";
// dynamically import the tabs component
import dynamic from "next/dynamic";
import { useState } from "react";
const Tabs = dynamic(() => import("./tabs").then((mod) => mod.Tabs), {
  ssr: false,
});




const BlogEditor = () => {

  const [showTabs, setShowTabs] = useState(false);
 
  return (
   
    <div className="flex flex-col gap-y-4">
      <h1 className="font-bold text-6xl text-center">Welcome to the Blog Editor</h1>
      <button className="btn-primary" onClick={() => setShowTabs(true)}>View tabs</button>
      {showTabs && <Tabs />}


    </div>
  );
};
export default BlogEditor;
