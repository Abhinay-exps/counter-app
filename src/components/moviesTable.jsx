import React, { Component } from "react";
import Table from "../common/table";
import Like from "../common/like";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  getDeleteContent() {
    if (this.props.user && this.props.user.isAdmin) {
      return (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      );
    } else {
      return null;
    }
  }
  columns = [
    {
      path: "title",
      content: (movie) => (
        <Link to={"/movies/" + movie._id}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: this.getDeleteContent(),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      ></Table>
    );
  }
}
export default MoviesTable;
