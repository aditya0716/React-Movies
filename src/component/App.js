import { data } from "../data";
import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourite } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
      console.log(" NEW STATE", this.props.store.getState());
    });
    //make api call
    //dispatch

    store.dispatch(addMovies(data));

    console.log("HELLO");

    console.log(" STATE", this.props.store.getState());
  }

  isFavourite = (movie) => {
    const { favourite } = this.props.store.getState();
    const index = favourite.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    console.log(val);
    this.props.store.dispatch(setShowFavourite(val));
  };

  render() {
    console.log("RENDER");

    const { list, favourite, showFav } = this.props.store.getState();

    const showList = showFav ? favourite : list;
    return (
      <div className="App">
        <Navbar />
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
                  dispatch={this.props.store.dispatch}
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

export default App;
