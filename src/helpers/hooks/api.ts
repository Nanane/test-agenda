import { useCallback, useEffect, useState } from "react";

interface UseApiProps<T> {
    fetchFunc: () => Promise<T>;
    initialValue: T;
}

export function useApi<T>({
    fetchFunc,
    initialValue
}: UseApiProps<T>) {
    const [entities, setEntities] = useState(initialValue);

    const fetchAndState = useCallback(() => {
        fetchFunc().then(setEntities).catch(console.log);
    }, [fetchFunc]);

    useEffect(() => {
        fetchAndState();
    }, []);

    return {
        entities,
        refetch: fetchAndState,
    }
}