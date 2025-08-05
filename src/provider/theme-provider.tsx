"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
//@ts-ignore
import { type ThemeProviderProps } from "next-themes/dist/types"

export default function DarkModeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}