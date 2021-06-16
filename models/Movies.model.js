class Movie {
    constructor(moviedataInput) {
      this.poster_path=moviedataInput.poster_path;
      this.id = moviedataInput.id;
      this.title = moviedataInput.title;
      this.overview = moviedataInput.overview;
      this.vote_count = moviedataInput.vote_count;
      this.popularity=moviedataInput.popularity;
      this.release_date=moviedataInput.release_date;
    }
  }
  module.exports = Movie ;