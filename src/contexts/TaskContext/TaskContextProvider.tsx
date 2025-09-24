import { useEffect, useReducer, useRef } from 'react'
import { initialTaskState } from './initialTaskState'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { TimerWorkerManager } from '../../workers/TimeWorkerManager'
import { TaskActionTypes } from './taskActions'
import { loadBeep } from '../../utils/loeadBeep'

type TaskContextProviderProps = {
  children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const worker = TimerWorkerManager.getInstance()
  const playBeepRef = useRef<() => void | null>(null)

  worker.onmessage(e => {
    const countDownSeconds = e.data

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current()
        playBeepRef.current = null
      }
      dispatch({ type: TaskActionTypes.COMPLETE_TASK })
      worker.terminate()
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      })
    }
  })

  useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de active task')
      worker.terminate()
    }

    worker.postMessage(state)
  }, [worker, state])

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep()
    }
  }, [state.activeTask])

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}
