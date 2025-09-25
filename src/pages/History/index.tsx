import { TrashIcon } from 'lucide-react'
import { Container } from '../../components/Container'
import { DefaultButton } from '../../components/DefaultButton'
import { Heading } from '../../components/Heading'
import { MainTemplate } from '../../templates/MainTemplate'
import { formatDate } from '../../utils/formatDate'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getTaskStatus } from '../../utils/getTaskStatus'

import styles from './styles.module.css'
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks'
import { useEffect, useState } from 'react'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'
import { showMessage } from '../../adapters/showMessage'

export function History() {
  const { state, dispatch } = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false)
  const hasTasks = state.tasks.length > 0

  const [sortTaskOption, setSortTaskOption] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      field: 'startDate',
      direction: 'desc',
    }
  })

  const taksTypeDictionary = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  }

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro'
  }, [])

  useEffect(() => {
    setSortTaskOption(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }))
  }, [state.tasks])

  useEffect(() => {
    if (!confirmClearHistory) return
    setConfirmClearHistory(false)
    dispatch({ type: TaskActionTypes.RESET_STATE })
  }, [confirmClearHistory, dispatch])

  useEffect(() => {
    return () => {
      showMessage.dismiss()
    }
  }, [])

  function handleSortTask({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOption.direction === 'desc' ? 'asc' : 'desc'
    setSortTaskOption({
      tasks: sortTasks({
        tasks: sortTaskOption.tasks,
        direction: newDirection,
        field,
      }),
      field,
      direction: newDirection,
    })
  }

  function handleResetHisotry() {
    showMessage.dismiss()
    showMessage.confirm('Tem certeza?', confirmation => {
      setConfirmClearHistory(confirmation)
    })
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleResetHisotry}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTask({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTask({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTask({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTaskOption.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taksTypeDictionary[task.type]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  )
}
