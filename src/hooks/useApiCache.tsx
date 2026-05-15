import { useState, useEffect } from 'react';

export const useApiCache = <T extends unknown>(
    fetchFunction: () => Promise<T>,
    cacheKey: string,
    ttlMinutes: number = 60
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const { value, timestamp } = JSON.parse(cached);
                    const isExpired = Date.now() - timestamp > ttlMinutes * 60 * 1000;
                    if (!isExpired) {
                        setData(value);
                        setLoading(false);
                        return;
                    }
                }

                const result = await fetchFunction();
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({ value: result, timestamp: Date.now() })
                );
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchFunction, cacheKey, ttlMinutes]);

    return { data, loading, error };
};