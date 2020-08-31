import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/WorkerList';
import WorkerForm from './pages/WorkerForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/hire" component={TeacherList} />
            <Route path="/work" component={WorkerForm} />
        </BrowserRouter>
    );
}

export default Routes;