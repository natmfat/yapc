import { ToastContext } from "natmfat/components/Toast";
import { FormEvent, useCallback, useContext, useState } from "react";
import { StandardResponse } from "remix-endpoint";

/**
 * Submit with fetch instead of Remix fetcher to avoid redirects
 * Technically diverges from non-JS enabled, but I could not care less
 */
export const useBypassForm = ({
  onComplete = () => {},
}: {
  onComplete?: () => void;
} = {}) => {
  const { addToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      const form = e.target as HTMLFormElement;
      e.preventDefault();
      setLoading(true);
      const { success, message }: StandardResponse = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      })
        .then((res) => res.json())
        .catch(() => ({
          success: false,
          message: "internal server error",
        }));
      addToast({ type: success ? "success" : "error", message: message });
      setLoading(false);
      onComplete();
      form.reset();
    },
    [addToast, onComplete]
  );

  return {
    onSubmit,
    loading,
  };
};
