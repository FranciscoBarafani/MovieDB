import React from "react";
import "./movie.scss";
import { Row, Col, Button } from "antd";
//USE PARAMS ES UN HOOK
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/constants";
import Loading from "../../components/Loading";

export default function Movie() {
  const { id } = useParams();

  const movieInfo = useFetch(`
  ${URL_API}/movie/${id}?api_key=${API}&language=es-ES`);

  if (movieInfo.loading == true || !movieInfo.result) {
    return <Loading />;
  } else {
    return <RenderMovie movieInfo={movieInfo.result} />;
  }
}

function RenderMovie(props) {
  const {
    movieInfo: { title, backdrop_path }
  } = props;
  const backDropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backDropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster"></Col>
        <Col span={10} className="movie__info"></Col>
      </Row>
    </div>
  );
}
