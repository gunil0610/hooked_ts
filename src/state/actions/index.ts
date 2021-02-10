import { ActionType, MovieType } from '../types';

interface SearchMoviesRequest {
  type: ActionType.SEARCH_MOVIES_REQUEST;
}
interface SearchMoviesSuccess {
  type: ActionType.SEARCH_MOVIES_SUCCESS;
  payload: MovieType[];
}
interface SearchMoviesFailure {
  type: ActionType.SEARCH_MOVIES_FAILURE;
  error: string;
}

export type Action =
  | SearchMoviesRequest
  | SearchMoviesSuccess
  | SearchMoviesFailure;
