import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input'
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';



 function WorkerList() {
    const [workers, setWorkers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchWorkers(e: FormEvent) {
        //pŕevê o envio automático do formulário
        e.preventDefault();

        const response = await api.get('services', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setWorkers(response.data);
    }


    return (
        <div id="page-worker-list" className="container">
            <PageHeader title="Estes são os profissionais disponíveis">
                <form id="search-workers" onSubmit={searchWorkers}>
                    
                <Select
                        name="subject"
                        label="Área de atuação"
                        value={subject}
                        onChange={e => {setSubject(e.target.value)}}
                        options={[
                            {value: 'Elétrica', label: 'Elétrica'},
                            {value: 'Obras', label: 'Obras'},
                            {value: 'Eletrônica', label: 'Eletrônica'},
                            {value: 'Computação', label: 'Computação'},
                            {value: 'Pintura', label: 'Pintura'},
                            {value: 'Enfermagem', label: 'Enfermagem'},
                            {value: 'Fisioterapia', label: 'Fisioterapia'},
                            {value: 'Aulas', label: 'Aulas'},
                            {value: 'Frete', label: 'Frete'},
                        ]}
                />

                <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => {setWeek_day(e.target.value)}}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado'},
                        ]}
                />

                    <Input
                     type="time"
                     name="time" 
                     label="Hora"
                     value={time}
                     onChange={e => {setTime(e.target.value)}}
                     />

                     <button type="submit">
                        Buscar
                     </button>
                </form>
            </PageHeader>

            <main>
                {workers.map((worker: Teacher) => {
                    return <TeacherItem teacher={worker}/>
                })}
            </main>
        </div>
    )
}

export default WorkerList;