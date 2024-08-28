import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { loginService } from '@/services/auth-service'
import { type BaseErrorResponse } from '@/types/common'
import { type LoginResponse } from '@/types/login'
import { setTokenInLocalStorage } from '@/utils/tokenManager'

export const useLogin = () => {
  const router = useRouter()
  const toast = useToast()

  const { mutate, reset, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: (data: LoginResponse) => {
      const token = data?.data.token
      if (token) {
        setTokenInLocalStorage(token)
        router.push('/biro-travel')
        reset()
      }
    },
    onError: (error: BaseErrorResponse) => {
      toast.error(error.err_message)
    },
  })

  return { mutate, isPending }
}
