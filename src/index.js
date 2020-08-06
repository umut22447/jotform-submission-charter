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
  Switch
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import logo from './images/logo.png'


ReactDOM.render(
  <AuthProvider>
    <FormsProvider>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              src={logo}
              width="25"
              height="25"
              className="d-inline-block align-top"
              alt="Jotform logo"
            />{' '}
            JotForm Submission Charter
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='/formlist'>Form List</Nav.Link>
          </Nav>
        </Navbar>
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