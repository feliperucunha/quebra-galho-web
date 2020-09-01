import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import './styles.css';
import api from '../../services/api';

function Landing() {
  //estado para armazenar conexões com desestruturação
  const [totalConnections, setTotalConnections] = useState(0);

  //uma função atualiza a outra com o effect utilizando promises
  //conectado ao backend (api)
  useEffect(() => {
    api.get('connections').then((response) => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Quebra-galho" />
          <h2>
            A melhor plataforma para contratação e divulgação de serviços.
          </h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de serviços"
          className="hero-image"
        />
        <div className="buttons-container">
          <Link to="/hire" className="hire">
            Contratar
          </Link>
          {/* Era "a" com href e virou link e to para ser single page application */}
          <Link to="/work" className="work">
            Trabalhar
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} serviços já contratados
        </span>
      </div>
    </div>
  );
}

export default Landing;
