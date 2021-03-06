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
  NavLink
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
            <NavLink to='/'><button type="button" class="btn btn-dark">Form List</button></NavLink>
          </Nav>
          <Logout />
        </Navbar>
        <Switch>
          <Route exact path="/">
            <div className="sticky-top bg-white">
              <h2 className='d-flex justify-content-center'>Select a Form and See the Charts</h2>
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