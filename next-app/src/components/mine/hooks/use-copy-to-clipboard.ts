'use client';

import { useCallback, useRef, useState } from "react";
import { useCopyToClipboard as useHooksUseCopyToClipboard } from 'usehooks-ts';


const useCountdown = () => {
  const [isActive, setIsActive] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(
    (timeInMs: number, cb?: () => void) => {
      setIsActive(true);
      timeoutId.current = setTimeout(() => {
        setIsActive(false);
        cb?.();
      }, timeInMs);
    },
    []
  );

  return {
    isActive,
    startTimer,
  };

};

export const useCopyToClipboard = () => {
  const [_, copyToClipboard] = useHooksUseCopyToClipboard();
  const countdown = useCountdown();
  const [status, setStaus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopy = useCallback(
    async (text: string) => {
      countdown.startTimer(4000, () => setStaus('idle'));
      return copyToClipboard(text)
        .then(() => setStaus('success'))
        .catch(() => setStaus('error'));
    },
    [copyToClipboard, countdown]
  );

  return {
    status,
    copyText: handleCopy,
  };
}

