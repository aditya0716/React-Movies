import { data } from "../data";
import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    // store.subscribe(() => {
    //   console.log("UPDATED");
    //   this.forceUpdate();
    //   console.log(" -- STATE", store.getState());
    // });
    //make api call
    //dispatch

    this.props.dispatch(addMovies(data));

    // console.log("HELLO");

    console.log("STATE", this.props);
  }

  isFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourite.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    console.log(val);
    this.props.dispatch(setShowFavourite(val));
  };

  render() {
    console.log("RENDER");

    const { movies, search } = this.props; //{movies:{},search:{}}

    const { list, favourite, showFav } = movies;

    const showList = showFav ? favourite : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFav ? "" : "active-tabs"} `}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFav ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {showList.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={`movies-${index}`}
                  dispatch={this.props.dispatch}
                  isFav={this.isFavourite(movie)}
                />
              );
            })}
          </div>
          {showList.length === 0 ? (
            <div className="no-movies">No Movies!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
