import { ActionType, MovieType } from '../types';
import { Action } from '../actions';

interface SearchMoviesState {
  loading: boolean;
  movies: MovieType[];
  errorMessage: string | null;
}

export const initialState: SearchMoviesState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

export const reducer = (
  state: SearchMoviesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case ActionType.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case ActionType.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};
