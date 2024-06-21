import type { UnwrapRef } from "vue";

type FetchURLType = Parameters<typeof useFetch>[0];

export function usePost<T = any>(url: FetchURLType) {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const data = ref<T | null>(null);

  const execute = async (body: object) => {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      const response = await fetch(url as string, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }

      data.value = responseData as UnwrapRef<T>;
      success.value = true;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    success,
    data,
    execute,
  };
}
