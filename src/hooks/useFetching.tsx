import { useState } from "react";

export const useFetching = (callback: any) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const fetching = async (...args: any[]) => {
		try {
			setLoading(true);
			await callback(...args);
		} catch (e) {
			setError("error");
		} finally {
			setLoading(false);
		}
	};
	return [fetching, isLoading, error] as const;
};
