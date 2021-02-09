import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'; // you should replace this with yours

interface MovieType {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// action-types
enum ActionType {
  SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
  SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
}

// actions
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

type Action = SearchMoviesRequest | SearchMoviesSuccess | SearchMoviesFailure;

// reducer
interface SearchMoviesState {
  loading: boolean;
  movies: MovieType[];
  errorMessage: string | null;
}

const initialState: SearchMoviesState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state: SearchMoviesState, action: Action) => {
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        dispatch({
          type: ActionType.SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES_REQUEST,
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: ActionType.SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: ActionType.SEARCH_MOVIES_FAILURE,
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
