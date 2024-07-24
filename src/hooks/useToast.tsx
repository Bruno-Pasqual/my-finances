// hooks/useToast.ts

import { ToastType } from "@/enums/enums";
import { toast } from "sonner";

interface UseToast {
	showToast: (type: ToastType, message: string, duration?: number) => void;
}

export function useToast(): UseToast {
	const showToast = (type: ToastType, message: string, duration: number = 2) => {
		// Converte a duração de segundos para milissegundos
		const durationMs = duration * 1000;

		switch (type) {
			case ToastType.SUCCESS:
				toast.success(message, { duration: durationMs });
				break;
			case ToastType.ERROR:
				toast.error(message, { duration: durationMs });
				break;
			case ToastType.WARNING:
				toast.warning(message, { duration: durationMs });
				break;
			case ToastType.INFO:
				toast.info(message, { duration: durationMs });
				break;
		}
	};

	return { showToast };
}
