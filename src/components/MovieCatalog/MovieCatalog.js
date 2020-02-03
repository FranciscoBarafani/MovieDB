import React from "react";
import { Col, Card, Icon } from "antd";
import "./MovieCatalog.scss";
import { Link } from "react-router-dom";

export default function MovieCatalog(props) {
  const {
    movies: { results }
  } = props;

  return results.map(movie => (
    <Col key={movie.id} xs={4} className="movie-catalog">
      <MovieCard movie={movie} />
    </Col>
  ));
}

function MovieCard(props) {
  return "Movie Card";
}
