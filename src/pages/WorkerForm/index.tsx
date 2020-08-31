import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import {useHistory} from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../services/api';




function WorkerForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    //estado para novo horário
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);
    
    //spread operator para copiar o array
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    //percorre o setScheduleItems acima e adiciona a variável, sobescrevendo respeitando a imutabilidade
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        //envia ao backend
        api.post('services', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastrado com sucesso');

            //redireciona
            history.push('/hire');
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }
    
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer trabalhar conosco."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome Completo" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}}/> 

                    </fieldset>

                    <fieldset>
                        <legend>Sobre o serviço</legend>

                        <Select
                            name="subject"
                            label="Área de atuação"
                            value={subject} onChange={(e) => {setSubject(e.target.value)}}
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
                        <Input
                            name="cost"
                            label="Custo do serviço"
                            value={cost} onChange={(e) => {setCost(e.target.value)}}/>

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br />
                            Preencha todos os campos
                        </p>

                        <button type="submit" onClick={handleCreateClass}>
                            Salvar Cadastro
                        </button>

                    </footer>
                </form>

            </main>
        </div>
    )
}

export default WorkerForm;