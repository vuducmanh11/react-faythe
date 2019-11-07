import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';




import Home from './components/Home';
import MenuItem from './components/MenuItem';
import Test from './components/Test';

import RegisterCloud from './components/RegisterCloud';
import ListScalers from './components/ListScaler';
import CreateScaler from './components/CreateScaler';

class App extends Component {
  constructor(props) {
    super(props);
    let MenuItems = [
      { 
        "index": 1,
        "link" : "/",
        // "state": "active",
        "content": "Clouds",
        "child": [
          {
            "link" : "/clouds",
            // "state": "inactive",
            "content": "List clouds"
          },
          {
            "link" : "/cloud/register",
            // "state": "inactive",
            "content": "Register cloud"
          }    
        ]
      },
      {
        "index": 2,
        "link" : "/scalers",
        // "state": "inactive",
        "content": "Scalers",
        "child": [
          {
            "link": "/scalers/list",
            "content": "List scalers"
          },
          {
            "link": "/scalers/create",
            "content": "Create scaler"
          },
          {
            "link": "scalers/delete",
            "content": "Delete scaler"
          }
        ]
      }
    ];
    let styleContainer = {
      base: {
        margin: 0,
        padding: 0
      }
    }
    let listState = {1: "active", 2: "inactive"};
    this.state = {
      MenuItems: MenuItems,
      styleContainer: styleContainer,
      listState: listState
    }

  }
  
  handleClickMenu = (index) => {
    let k = Object.keys(this.state.listState).length
    state = this.listState;
    var state = {}
    for(let i = 1; i <= k; i++) {
      if (i !== index) {
        state[i] = "inactive";
      } else {
        state[i] = "active";
      }

    }
    this.setState({
      listState: state
    })
    // console.log(this.state.listState)
    this.renderMenu()

     
  }

  renderMenu = () => {
    let {MenuItems, listState} = this.state;
    return MenuItems.map((item) => {
      return (
      <MenuItem  item={item} handleClickMenu={this.handleClickMenu} listState={listState}
      />)
      // console.log(item);
    });
    // console.log(MenuItems);
  }

  // handleClickMenu = () => {
  //   for (let i = 0; i < MenuItems.length; i++) {

  //   }
  // }
  render() {
    return (
      <Container style={this.state.styleContainer.base}>
        <Row>
        <Router>
          <Col xs={2}>
            <div>
              <ul>
                {this.renderMenu()}
                {/* {
                  MenuItems.map(function (item, index) {
                    return <li><Link className={item.state} to={item.link}>{item.content}</Link></li>
                  })
                } */}
                {/* <li>
                  <Link className="active" to="/">Clouds</Link>
                </li>
                <li>
                  <Link className="" to="/clouds">List clouds</Link>
                </li>
                <li>
                  <Link className="" to="/cloud/post">Register cloud</Link>
                </li>
                <li>
                  <Link to="/scalers">Scalers</Link>
                </li> */}
              </ul>
            </div>
  
      
          </Col>
          <Col xs={2}>
          </Col>
          <Col xs={8}>
          <div >
        <Switch >
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/clouds">
            <Home />
          </Route>
          <Route exact path="/cloud/register">
            <RegisterCloud />
          </Route>
          <Route exact path="/scalers">
            <ListScalers />
          </Route>
          <Route exact path="/scalers/list">
            <ListScalers />
          </Route>
          <Route exact path="/scalers/create">
            <CreateScaler />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
        </Switch>
        </div>
          </Col>
          
          </Router>  
        </Row>
      </Container>
    );
  }
  
}

export default App;
