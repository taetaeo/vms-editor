import React, {Dispatch} from 'react'

interface StateType {
  [key: string]: string | string[] | any
}

interface ActionType {
  name: string
  value: string | any
}

type ChangeHandler = (name: string, value: string) => void
type ClearHandler = (name: string) => void

type MultiStateResult<T> = [StateType, Dispatch<ActionType>, ChangeHandler, ClearHandler]

const reducer = (state: StateType, action: ActionType) => {
  return {
    ...state,
    [action.name]: action.value,
  }
}

export default function useMultiState<T>(initialState: StateType = {}): MultiStateResult<T> {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onChange: ChangeHandler = (name, value) => {
    return dispatch({name: name, value: value})
  }

  const onClear: ClearHandler = name => dispatch({name, value: ''})

  return [state, dispatch, onChange, onClear] as const
}
