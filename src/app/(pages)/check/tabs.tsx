// tabs.tsx

"use client";


import {  useEffect, useState } from "react";



export const Tabs = () => {
  // STEP 1: useState declarations
  const [promiseResolved, setPromiseResolved] = useState(false);
  
 
  
  
  // STEP 3: useEffect hooks
  useEffect(() => {
    const asyncFunctionCheck = async () => {
      await new Promise((resolve,reject)=>{
        setTimeout(() => {
          resolve(true);
          setPromiseResolved(true);
        }, 10000);
      })
    }
  }, []);


  promiseResolved && (
    <h1 className="font-bold text-6xl text-center">Promise Resolved</h1>
  )
  return (
    <div>
      <p></p>
    </div>
  )
}