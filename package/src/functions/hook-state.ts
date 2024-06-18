import { Dispatch, useReducer } from "react";

interface ActionType {
  name: string;
  value: string | any;
}

type ChangeHandler = (name: string, value: string) => void;
type ClearHandler = (name: string) => void;

type MultiStateResult<T> = [T, Dispatch<ActionType>, ChangeHandler, ClearHandler];

const reducer = (state: any, action: ActionType) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function useMultiState<T>(initialState = {}): MultiStateResult<T> {
  const [state, dispatch] = useReducer(reducer, initialState as T);

  const onChange: ChangeHandler = (name, value) => {
    return dispatch({ name: name, value: value });
  };

  const onClear: ClearHandler = (name) => dispatch({ name, value: "" });

  return [state, dispatch, onChange, onClear] as const;
}
