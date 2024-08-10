import type { UnwrapRef } from 'vue'

type FetchURLType = Parameters<typeof useFetch>[0]
type ExecuteOptions = {
  isPut?: boolean
}

const defaultExecuteOptions: ExecuteOptions = {
  isPut: false,
}

export function usePost<T>(url: FetchURLType) {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)
  const data = ref<T | null>(null)

  const execute = async (body: object, options: ExecuteOptions) => {
    const opts = { ...defaultExecuteOptions, ...options }

    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await fetch(url as string, {
        method: opts.isPut ? 'PUT' : 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong')
      }

      data.value = responseData as UnwrapRef<T>
      success.value = true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    data,
    execute,
  }
}
