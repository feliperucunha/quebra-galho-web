import React from 'react';
import {Link} from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string; // ? = opcional
}

// Const, interface e React.FC porque precisa receber propriedades de outros componentes
const PageHeader: React.FC <PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {/* Só vai executar isso se a página mandar uma descrição */}
                { props.description && <p>{props.description}</p>}
                {/* Puxa o que é passado dentro da tag PageHeader */}
                {props.children} 
            </div>


        </header>
    );
}

export default PageHeader;