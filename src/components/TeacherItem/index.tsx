import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC <TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        })
    }
    
    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>E{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                {/* Abre a API do whatsapp em outra aba com o número do usuário e manda uma mensagem */}
            <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text=Oi,%20vi%20seu%20anúncio%20no%20proffy`}>
                <img src={whatsappIcon} alt="Whatsapp"/>
                Entrar em contato
            </a>

            </footer>
        </article>
    )
}

export default TeacherItem;