import { LocaleContext } from "@/contexts/locale-context"
import { useContext } from "react"

export function useLocale(): string {
  return useContext(LocaleContext) ?? navigator.language
}