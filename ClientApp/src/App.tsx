import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import TaxiDriver from './components/TaxiDriver';
import Calculator from './components/Calculator';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/taxiDriver' component={TaxiDriver} />
        <Route path='/calculator' component={Calculator} />
    </Layout>
);
