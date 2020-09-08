import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import WorkerList from './pages/WorkerList';
import WorkerForm from './pages/WorkerForm';
import AboutUs from './pages/AboutUs';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/hire" component={WorkerList} />
      <Route path="/work" component={WorkerForm} />
      <Route path="/about-us" component={AboutUs} />
    </BrowserRouter>
  );
}

export default Routes;
