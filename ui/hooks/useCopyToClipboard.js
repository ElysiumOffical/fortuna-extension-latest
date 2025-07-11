import { useState, useCallback } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { MINUTE } from '../../shared/constants/time';
import { COPY_OPTIONS } from '../../shared/constants/copy';
import { useTimeout } from './useTimeout';

/**
 * useCopyToClipboard
 *
 * @param {number} [delay=3000] - delay in ms
 * @returns {[boolean, Function]}
 */
const DEFAULT_DELAY = MINUTE;

/**
 * @param delay - delay in ms
 * @param opts - clipboard options
 * @param opts.expireClipboard - expires clipboard after delay
 * @returns {[boolean, (text: string) => void, () => void]}
 */
export function useCopyToClipboard(
  delay = DEFAULT_DELAY,
  opts = { expireClipboard: true },
) {
  const [copied, setCopied] = useState(false);
  const startTimeout = useTimeout(
    () => {
      if (copied === true) {
        if (opts.expireClipboard) {
          copyToClipboard(' ', COPY_OPTIONS);
        }
        setCopied(false);
      }
    },
    delay,
    false,
  );

  const handleCopy = useCallback(
    (text) => {
      setCopied(true);
      startTimeout();
      copyToClipboard(text, COPY_OPTIONS);
    },
    [startTimeout],
  );

  const resetState = useCallback(() => {
    setCopied(false);
  }, []);

  return [copied, handleCopy, resetState];
}
