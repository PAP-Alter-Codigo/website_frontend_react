import { useState, useEffect } from 'react';

export interface UseCMSContentResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useCMSContent<T>(
  path: string,
  fallbackData?: T
): UseCMSContentResult<T> {
  const [data, setData] = useState<T | null>(fallbackData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Si no hay path válido, detener la ejecución
    if (!path) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(path, { signal });

        if (response.ok) {
          const json = (await response.json()) as T;
          setData(json);
          setError(null);
        } else if (response.status === 404) {
          if (fallbackData !== undefined) {
            setData(fallbackData);
            setError(null);
          } else {
            throw new Error(`Content not found at ${path} (404)`);
          }
        } else {
          throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Petición cancelada por unmount/cambio de dep; no actualizar estado
          return;
        }
        
        // Si falló por otra razón y no hubo manejo previo
        setError(err instanceof Error ? err : new Error(String(err)));
        if (fallbackData === undefined) {
          setData(null);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      controller.abort();
    };
  }, [path, fallbackData]);

  return { data, loading, error };
}
