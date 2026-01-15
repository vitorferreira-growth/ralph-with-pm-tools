'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook que retorna um valor com debounce.
 * @param value O valor a ser debounceado
 * @param delay O tempo de delay em ms (padrão 300ms)
 * @returns O valor debounceado
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      setDebouncedValue(value)
    }, delay)

    return (): void => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook que retorna uma função com debounce.
 * @param callback A função a ser debounceada
 * @param delay O tempo de delay em ms (padrão 300ms)
 * @returns Uma função debounceada
 */
export function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  // Cleanup on unmount
  useEffect((): (() => void) => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
