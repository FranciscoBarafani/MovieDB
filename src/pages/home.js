import React from "react";
import useFetch from "../hooks/useFetch";
import { Row, Col } from "antd";
import { API, URL_API } from "../utils/constants";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import SliderMovies from "../components/SliderMovies";

export default function Home() {
  const newMovies = useFetch(
    `${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1`
  );
  const popularMovies = useFetch(
    `${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=1`
  );
  const topRatedMovies = useFetch(
    `${URL_API}/movie/top_rated?api_key=${API}&language=es-ES&page=1`
  );

  return (
    <>
      <SliderMovies movies={newMovies} />
      <Row>
        <Col span={12}>
          <MovieList movies={popularMovies} title="Peliculas Populares" />
        </Col>
        <Col span={12}>
          <MovieList movies={topRatedMovies} title="Peliculas mas Votadas" />
        </Col>
      </Row>
      <Footer />
    </>
  );
}
