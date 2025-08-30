"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cx } from "@/lib/utils"

type Theme = "system" | "light" | "dark"

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "System", icon: "💻" },
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    )
  }

  return (
    <div className="flex rounded-3xl bg-gray-100 p-1 dark:bg-gray-800 gap-1">
      {themes.map((themeOption) => (
        <label
          key={themeOption.value}
          className={cx(
            "relative flex cursor-pointer items-center gap-2 rounded-3xl px-3 py-1.5 text-sm font-medium transition-all",
            "hover:bg-gray-300 dark:hover:bg-gray-600",
            theme === themeOption.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          <input
            type="radio"
            name="theme"
            value={themeOption.value}
            checked={theme === themeOption.value}
            onChange={() => setTheme(themeOption.value)}
            className="sr-only"
          />
          <span className="text-xs">{themeOption.icon}</span>
          {/* <span className="hidden sm:inline">{themeOption.label}</span> */}
        </label>
      ))}
    </div>
  )
}
