import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  SET_SHOW_FAVOURITES,
  ADD_MOVIES_TO_LIST,
  ADD_SEARCH_RESULT,
} from "../actions";

const initialMovieSate = { list: [], favourite: [], showFav: false };

export function movies(state = initialMovieSate, action) {
  //   if (action.type === ADD_MOVIES) {
  //     return {
  //       ...state,
  //       list: action.movies,
  //     };
  //   }
  console.log("MOVIE REDUCER");
  switch (action.type) {
    case ADD_MOVIES:
      return { ...state, list: action.movies };

    case ADD_FAVOURITE:
      return { ...state, favourite: [action.movie, ...state.favourite] };

    case REMOVE_FAVOURITE:
      const filteredArr = state.favourite.filter(
        (movie) => movie.Title !== action.movie.Title
      );

      return {
        ...state,
        favourite: filteredArr,
      };

    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFav: action.val,
      };

    case ADD_MOVIES_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };

    default:
      return state;
  }
}

const initialSearchState = { result: {}, showSearchResults: false };

export function search(state = initialSearchState, action) {
  console.log("Search REDUCER");
  if (action.type === ADD_SEARCH_RESULT) {
    return {
      ...state,
      result: action.movie,
      showSearchResults: true,
    };
  } else if (action.type === ADD_MOVIES_TO_LIST) {
    return {
      ...state,
      showSearchResults: false,
    };
  }

  return state;
}

// const initialRootState = {
//   movies: initialMovieSate,
//   search: initialSearchState,
// };

// export default function rootReducer(state = initialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

export default combineReducers({
  movies: movies,
  search: search,
});
