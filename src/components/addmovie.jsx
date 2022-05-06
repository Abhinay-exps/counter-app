import React, { Component } from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import Form from "./loginForm";
import { getMovie, saveMovie } from "../services/movieService";

class AddMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genres"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
  };
  async populateGenres() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({
      genres,
    });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: this.mapToViewModel(movie),
      });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("title", "Title")}
            {this.renderSelect(
              "genreId",
              this.state.genres,
              "name",
              "_id",
              "Genres"
            )}
            {this.renderInput("numberInStock", "Number in stock")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderButton("Save")}
          </div>
        </form>
      </div>
    );
  }
}

export default AddMovie;
