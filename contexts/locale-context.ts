import { createContext } from 'react'

export const LocaleContext = createContext<string | undefined>(undefined)

export const LocaleProvider = LocaleContext.Provider