import styles from './styles.module.css'
import { DefaultInput } from '../DefaultInput'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { PlayCircleIcon } from 'lucide-react'

export function MainForm() {
  return (
    <form className={styles.form}>
      <div className={styles.formRow}>
        <DefaultInput
          labelText='Task'
          id='menuInput'
          type='text'
          placeholder='Digite algo'
        />
      </div>
      <div className={styles.formRow}>
        <p>Proximo intevalo é de .</p>
      </div>
      <div className={styles.formRow}>
        <Cycles />
      </div>
      <div className={styles.formRow}>
        <DefaultButton type='submit' icon={<PlayCircleIcon />} />
      </div>
    </form>
  )
}
