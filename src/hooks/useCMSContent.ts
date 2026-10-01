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
        const contentType = response.headers.get("content-type");
        const isHtml = contentType && contentType.includes("text/html");

        // Si responde 200 OK y es JSON real
        if (response.ok && !isHtml) {
          const json = (await response.json()) as T;
          setData(json);
          setError(null);
        } 
        // Si responde 404 o si devolvió HTML (SPA Fallback de Vite para archivos inexistentes)
        else if (response.status === 404 || isHtml) {
          if (fallbackData !== undefined) {
            setData(fallbackData);
            setError(null);
          } else {
            throw new Error(`Content not found at ${path}`);
          }
        } 
        // Errores de servidor (500, etc.)
        else {
          throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        // Si falló el parseo de JSON pero contamos con fallbackData, rescatamos
        if (fallbackData !== undefined) {
          setData(fallbackData);
          setError(null);
        } else {
          setError(err instanceof Error ? err : new Error(String(err)));
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
