import { useEffect, useState } from 'react'
import type { TaskStateModel } from '../../models/TaskStateModel'
import { initialTaskState } from './initialTaskState'
import { TaskContext } from './TaskContext'

type TaskProviderProps = {
  readonly children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialTaskState)

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  )
}
