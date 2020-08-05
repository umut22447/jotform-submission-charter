import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'
import { FormsProvider } from './contexts/FormsContext'
import FormList from './components/FormList'
import FormReportPage from './components/FormReportPage';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'



ReactDOM.render(
  <AuthProvider>
    <FormsProvider>
      <Router>
        <Link to="/formlist"><button renderAs="button">Form List</button></Link>
        <Switch>
          <Route path="/formlist">
            <FormList />
          </Route>
          <Route path="/report/:formId" children={<FormReportPage />}>
          </Route>
        </Switch>
      </Router>
    </FormsProvider>
  </AuthProvider>,
  document.getElementById('root')
);