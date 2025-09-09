"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Key, Shield, ShieldOff } from "lucide-react";
import MyButton from "../ui/MyButton";
import PasswordConfirmModal from "@/components/ui/PasswordConfirmModal";
import useTwoFactor from "@/hooks/user/useTwoFactor";
import { useAppSelector } from "@/hooks/redux";

export default function TwoFactorSection() {
  const [showModal, setShowModal] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");
  const [modalType, setModalType] = useState<"enable" | "disable">("enable");

  const { enable2FA, disable2FA, isLoading } = useTwoFactor();
  const user = useAppSelector((state) => state.user.user);

  const isTwoFactorEnabled = user?.twoFactorEnabled || false;

  const handleEnable2FA = async (password: string): Promise<boolean> => {
    const response = await enable2FA(password);

    if (response?.data) {
      setShowModal(false);
      setTwoFactorError("");
      return true;
    } else if (response?.error) {
      setTwoFactorError(response?.error.message || "Please try again later");
      return false;
    }
    return false;
  };

  const handleDisable2FA = async (password: string): Promise<boolean> => {
    const response = await disable2FA(password);

    if (response?.data) {
      setShowModal(false);
      setTwoFactorError("");
      return true;
    } else if (response?.error) {
      setTwoFactorError(response?.error.message || "Please try again later");
      return false;
    }
    return false;
  };

  const openEnableModal = () => {
    setModalType("enable");
    setTwoFactorError("");
    setShowModal(true);
  };

  const openDisableModal = () => {
    setModalType("disable");
    setTwoFactorError("");
    setShowModal(true);
  };

  const handleModalConfirm = (password: string): Promise<boolean> => {
    return modalType === "enable"
      ? handleEnable2FA(password)
      : handleDisable2FA(password);
  };

  const getModalConfig = () => {
    if (modalType === "enable") {
      return {
        title: "Enable Two-Factor Authentication",
        description:
          "Please enter your password enable two-factor authentication.",
        buttonText: "Enable 2FA",
      };
    } else {
      return {
        title: "Disable Two-Factor Authentication",
        description:
          "Please enter your password to disable two-factor authentication for your account.",
        buttonText: "Disable 2FA",
      };
    }
  };

  return (
    <>
      <motion.div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`sm:w-10 sm:h-10 w-9 h-9 rounded-full flex items-center justify-center bg-ocean-blue/10
            `}
          >
            <Key className="w-5 h-5 text-midnight-blue" />
          </div>
          <div>
            <h2 className="sm:text-xl text-lg font-bold text-midnight-blue font-raleway">
              Two-Factor Authentication
            </h2>
            <p className="sm:text-sm text-xs text-charcoal font-geist">
              {isTwoFactorEnabled
                ? "Your account is protected with two-factor authentication"
                : "Add an extra layer of security to your account"}
            </p>
          </div>
        </div>

        <div className="rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {isTwoFactorEnabled ? (
            <>
              <div className="mb-4 sm:mb-0">
                <p className="sm:text-sm text-[14px] text-charcoal font-geist">
                  Your account is protected. You can disable it if needed.
                </p>
              </div>
              <MyButton
                text="Disable 2FA"
                variant="secondary"
                className="font-geist relative sm:top-[-5px] sm:w-[210px] "
                onClick={openDisableModal}
                disabled={isLoading}
              />
            </>
          ) : (
            <>
              <p className="sm:text-sm text-[14px] text-charcoal mb-4 text-left sm:mb-0 font-geist">
                Two-factor authentication is currently disabled. Enable it to
                add an extra layer of security to your account.
              </p>
              <MyButton
                text="Enable 2FA"
                className="font-geist relative sm:top-[-5px] sm:w-[210px]"
                onClick={openEnableModal}
                disabled={isLoading}
              />
            </>
          )}
        </div>
      </motion.div>

      <PasswordConfirmModal
        isOpen={showModal}
        onConfirm={handleModalConfirm}
        error={twoFactorError}
        onClose={() => setShowModal(false)}
        title={getModalConfig().title}
        description={getModalConfig().description}
        loading={isLoading}
        buttonText={getModalConfig().buttonText}
        setError={setTwoFactorError}
      />
    </>
  );
}
