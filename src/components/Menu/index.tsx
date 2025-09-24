import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

type AvailableThemes = 'light' | 'dark'

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storagedTheme = localStorage.getItem(
      'chronos:theme',
    ) as AvailableThemes | null
    return storagedTheme ?? 'dark'
  })

  const nextThemeIcon = {
    dark: <SunIcon size={64} />,
    light: <MoonIcon size={64} />,
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setTheme(prevTheme => {
      return prevTheme === 'dark' ? 'light' : 'dark'
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('chronos:theme', theme)
  }, [theme])

  return (
    <nav className={styles.menu}>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ir para Início'
        title='Ir para Início'
      >
        <HouseIcon size={64} />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Ver Histórico'
        title='Ver Histórico'
      >
        <HistoryIcon size={64} />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon size={64} />
      </a>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Mudar o tema'
        title='Mudar o tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  )
}
