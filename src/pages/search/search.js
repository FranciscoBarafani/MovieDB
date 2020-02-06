import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import MovieCatalog from "../../components/MovieCatalog";
import Footer from "../../components/Footer";
import { URL_API, API } from "../../utils/constants";
import "./search.scss";

function Search(props) {
  const { location, history } = props;
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      //Esta es una funcion asincrona que realiza un http y guarda la respuesta en response
      //En este caso retorna un JSON con las peliculas buscadas
      const searchValue = queryString.parseUrl(location.search);
      const { s } = searchValue.query;
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${s}&page=1`
      );
      const movies = await response.json();
      //Asignamos las peliculas devueltas al estado del componente
      setMovieList(movies);
      setSearchValue(s);
    })();
  }, [location.search]);

  //El onChange del Input de ant-d automaticamente envia un conjunto de parametros en forma
  //de JSON, a este le asignamos la variable e de la cual obtenemos el target.value (es decir el string)
  //que etamos poniendo en el input
  //Cada vez que cambiamos una letra en el input lo que hace la funcion es actualziar la URL con el parametro
  //de busqueda y el valor que tiene el input
  const onChangeSearch = e => {
    const urlParams = queryString.parse(location.search);
    //Esto actualiza el parametro de la URL
    urlParams.s = e.target.value;
    //History es heredado de React withRouter
    history.push(`?${queryString.stringify(urlParams)}`);
    //Esto actualiza el valor del input
    setSearchValue(e.target.value);
  };

  //La funcion {movielist...} lo que hace es comprobrar si el resultado de la busqueda
  //tiene contenido, de ser asi retorna el MovieCatalog, que es un componente
  //Que retorna un catalogo con todas las peliculas que le pasemos
  return (
    <Row>
      <Col span={12} offset={6} className="search">
        <h1>Busca tu Pelicula</h1>
        <Input onChange={onChangeSearch} value={searchValue} />
      </Col>
      {movieList.results && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={movieList} />
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default withRouter(Search);
