"use client";

import { useEffect, useState } from "react";

import { ImageModal } from "@/components/modals/ImageModal";
import { SettingsModal } from "@/components/modals/SettingsModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <ImageModal />
    </>
  );
};