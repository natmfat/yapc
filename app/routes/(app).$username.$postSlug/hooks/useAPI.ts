import { useCallback, useState } from "react";
import { StandardResponse } from "remix-endpoint";
import { z } from "zod";
import { Nullable } from "~/lib/types";

const schema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.nullable(z.unknown()),
});

export function useAPI<T extends Record<string, unknown>>({
  route,
  revalidate = false,
}: {
  /** API route to fetch from, should return a standard response */
  route: string;
  /** Do we refetch if data already exists? Defaults to false */
  revalidate?: boolean;
}) {
  const [data, setData] = useState<Nullable<T>>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);

  const _fetch = useCallback(async () => {
    if (loading || (data && !revalidate)) {
      return;
    }

    setLoading(true);

    // fetch data
    let nextData: unknown;
    try {
      nextData = await fetch(route).then((res) => res.json());
    } catch (error) {
      setError(`Failed to parse JSON for route ${route}`);
      setLoading(false);
      return;
    }

    // validate data
    const result = await schema.safeParseAsync(nextData);
    if (!result.success) {
      setError(`Route ${route} did not return a standard response`);
      setLoading(false);
      return;
    } else if (!result.data.success) {
      setError(`The operation for route ${route} failed`);
      setLoading(false);
      return;
    }

    setData(result.data.data as T);
    setLoading(false);
  }, [loading]);

  return {
    data,
    error,
    loading,
    fetch: _fetch,
  };
}
