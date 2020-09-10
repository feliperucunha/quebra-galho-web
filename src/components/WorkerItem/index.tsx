import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api';

export interface Worker {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface WorkerItemProps {
    worker: Worker;
}

const WorkerItem: React.FC <WorkerItemProps> = ({ worker }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: worker.id,
        })
    }
    
    return(
        <article className="worker-item">
            <header>
                <img src={worker.avatar} alt={worker.name}/>
                <div>
                    <strong>{worker.name}</strong>
                    <span>{worker.subject}</span>
                </div>
            </header>

            <p>{worker.bio}</p>

            <footer>
                <p>
                    Preço
                    <strong>R$ {worker.cost}</strong>
                </p>
                {/* Abre a API do whatsapp em outra aba com o número do usuário e manda uma mensagem */}
            <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${worker.whatsapp}?text=Oi,%20vi%20seu%20anúncio%20no%20proffy`}>
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato
            </a>

            </footer>
        </article>
    )
}

export default WorkerItem;