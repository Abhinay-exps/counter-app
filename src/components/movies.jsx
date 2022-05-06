import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../common/pagination";
import ListGroup from "../common/listgroup";
import MoviesTable from "./moviesTable";
import Search from "./search";
import { getMovies, deleteMovie } from "../services/movieService.js";
import { Paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService.js";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.sidepaneref = React.createRef();
  }
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
    });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id != movie._id);
    this.setState({
      movies: movies,
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({
        movies: originalMovies,
      });
    }
  };
  handleLove = (movie) => {
    const movies = [...this.state.movies];
    var index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies: movies,
    });
  };
  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
    });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    if (searchQuery != null)
      var filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else
      var filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;
    var sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = Paginate(sorted, currentPage, pageSize);
    return { movies: movies, totalCount: filtered.length };
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleNavigate = (movie) => {};
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };
  render() {
    const { pageSize, currentPage } = this.state;
    const { user } = this.props;
    const { movies, totalCount } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3 side-pane">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col central-pane">
          {user && (
            <Link to="/movies/new" className="btn btn-primary btn-sm">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <Search
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          ></Search>
          <ToastContainer></ToastContainer>
          <MoviesTable
            user={user}
            movies={movies}
            onLike={this.handleLove}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onNavigate={this.handleNavigate}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
