"use client";

import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchUser } from "@/lib/redux/slices/user";

export default function FetchUserFromClient({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return children;
}