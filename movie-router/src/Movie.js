import React, { Component } from "react";
import config from "./config";
import axios from "axios";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
    };
  }

  componentDidMount() {
    // this.props is just the props for the movie component. match is built by the Router. params is an object always available inside of match. and then there will be a property on params for every single wild card that matches this route and the wild card we have established is called /movieId
    const mid = this.props.match.params.movieId;
    const singleMovieUrl = `https://api.themoviedb.org/3/movie/${mid}?api_key=${config.api_key}`;
    axios.get(singleMovieUrl).then((res) => {
      console.log(res.data);
      this.setState({
        movie: res.data,
      });
    });
  }

  render() {
    //console.log(this.props.match);
    if (this.state.movie.title === undefined) {
      return <h1>Loading...</h1>;
    }
    const movie = this.state.movie;
    const imageUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;
    return (
      <div>
        <img src={imageUrl} />
        <p>{movie.title}</p>
        <p>Budget: {movie.budget}</p>
        <p>Tagline: {movie.tagline}</p>
        <p>Overview: {movie.overview}</p>
      </div>
    );
  }
}

export default Movie;
