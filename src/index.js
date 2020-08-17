import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'
import { FormsProvider } from './contexts/FormsContext'
import FormList from './components/FormList'
import FormReportPage from './components/FormReportPage';
import SearchBox from './components/SearchBox'
import Logout from './components/Logout'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import logo from './images/logo.png'


ReactDOM.render(
  <AuthProvider>
    <FormsProvider>
      <Router>
        <Navbar bg="dark" variant="dark" sticky='top'>
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
            <Link to='/formlist'>Form List</Link>
          </Nav>
          <Logout />
        </Navbar>
        <Switch>
          <Route path="/formlist">
            <div>
              <h2 className='d-flex justify-content-center'>Select a Form and See the Charter</h2>
              <SearchBox />
            </div>
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