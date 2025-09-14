"use client";

import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchUser } from "@/lib/redux/slices/user";
import { fetchExchangeRates } from "@/lib/redux/slices/currencySlice";
import { useAppSelector } from "@/hooks/redux";
export default function FetchUserFromClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    dispatch(fetchExchangeRates(selectedCurrency.code));
    
  }, [selectedCurrency]);

  return <>{children}</>;
}
