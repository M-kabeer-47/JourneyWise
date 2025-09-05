"use client";
import React from "react";
import ChangePasswordSection from "./ChangePasswordSection";
import TwoFactorSection from "./TwoFactorSection";

export default function SecurityTab() {
  return (
    <div className="space-y-8">
      <ChangePasswordSection />
      <TwoFactorSection />
    </div>
  );
}
