import styles from './styles.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href='#'>Entenda como funciona a técnica pomodoro</a>
      <a href='#'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - feito com ❤️ por
        Vinicio
      </a>
    </footer>
  )
}
