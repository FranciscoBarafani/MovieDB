import React from "react";
import "./SliderMovies.scss";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import Loading from "../Loading";

export default function SliderMovies(props) {
  const { movies } = props;

  //Si el estado de movies sigue cargando muestra el componente Loading
  //Una vez que carga renderiza el carousel
  //movies es un objeto JSON pasado como props desde home
  if (movies.loading || !movies.result) {
    return <Loading />;
  } else {
    const { results } = movies.result;
    return (
      <Carousel autoplay className="slider-movies">
        {results.map(movie => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </Carousel>
    );
  }
}

//Componente Movie para renderizar cada pelicula que devuelve
function Movie(props) {
  const {
    movie: { id, backdrop_path, title, overview }
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  return (
    <div
      className="slider-movies__movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="slider-movies__movie-info">
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <Link to={`/movie/${id}`}>
            <Button type="primary">Ver Mas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
