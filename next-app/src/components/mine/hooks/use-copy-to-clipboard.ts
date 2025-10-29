'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  // on unmount -> clear timeout if present
  useEffect(
    () => {
      if (null !== timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    },
    []
  );

  return useMemo(() => ({
    isActive,
    startTimer,
  }),
    [isActive, startTimer]
  );

};

/**
 * React Hook that allows to copy text to clipboard.  
 * When you copy to clipboard, the status is set to 'success'   
 * and a timer of 4 seconds will set the status to 'idle'.
 */
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

  return useMemo(() => ({
    status,
    copyText: handleCopy,
  }),
    [status, handleCopy]
  );
}

