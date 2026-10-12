import { useEffect, useState } from "react";

export function useFetch(url) {
    const [result, setResult] = useState({
        url: null,
        data: null,
        error: null,
    });

    useEffect(() => {
        let active = true;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP " + response.status);
                }

                return response.json();
            })
            .then((json) => {
                if (active) {
                    setResult({ url, data: json, error: null });
                }
            })
            .catch((err) => {
                if (active) {
                    setResult({ url, data: null, error: err.message });
                }
            });

        return () => {
            active = false;
        };
    }, [url]);

    const hasSettled = result.url === url;

    return {
        data: hasSettled ? result.data : null,
        isLoading: !hasSettled,
        error: hasSettled ? result.error : null,
    };
}
