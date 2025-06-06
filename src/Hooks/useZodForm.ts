import { useState } from "react"
import { z } from "zod"

export const useZodForm = <T extends z.ZodType>(schema: T) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (data: unknown): data is z.infer<T> => {
    try {
      schema.parse(data)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const getError = (field: string): string | undefined => {
    return errors[field]
  }

  const clearErrors = () => {
    setErrors({})
  }

  return {
    validate,
    errors,
    getError,
    clearErrors,
  }
}
