import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  SET_SHOW_FAVOURITES,
  setShowFavourite,
} from "../actions";

const initialSate = { list: [], favourite: [], showFav: false };

export default function movies(state = initialSate, action) {
  //   if (action.type === ADD_MOVIES) {
  //     return {
  //       ...state,
  //       list: action.movies,
  //     };
  //   }
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

    default:
      return state;
  }
}
