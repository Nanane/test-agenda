import { useCallback, useEffect, useState } from "react";

interface UseApiProps<T> {
    promise: Promise<T>;
    initialValue: T;
}

export function useApi<T>({
    promise,
    initialValue
}: UseApiProps<T>) {
    const [entities, setEntities] = useState(initialValue);

    const fetchAndState = useCallback(() => {
        promise.then(setEntities).catch(console.log);
    }, [promise]);

    useEffect(() => {
        fetchAndState();
    }, []);

    return {
        entities,
        refetch: fetchAndState,
    }
}