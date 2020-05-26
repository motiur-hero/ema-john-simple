import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/NotFound/Notfound';
import PrDetails from './components/PrDetails/PrDetails';


function App() {
  return (
   
      
      <Router>
        <Header></Header>
         <div>
        <Switch>
              <Route path='/shop'>
                <Shop></Shop>
              </Route>
              <Route path='/review'>
                <Review></Review>
              </Route>
              <Route path='/Inventory'>
              <Inventory></Inventory>
              </Route>
              <Route exact path ='/'>
                <Shop></Shop>
              </Route>
              <Route path='/product/:productKey'>
                <PrDetails></PrDetails>
              </Route>
              <Route path='*'>
                <Notfound></Notfound>
              </Route>

        </Switch>
        </div>
      </Router>
      
      
    
  );
}

export default App;
