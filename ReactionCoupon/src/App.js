import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavLink, BrowserRouter, Route } from 'react-router-dom';
import CaptureVideo from './Components/CaptureVideo';
import ListAllReaction from './Components/ListAllReactions';
import Landing from './Components/Landing';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="mt20">Welcome To Reaction Coupons</h1>
        </header>
        <p className="display-flex justify-content-md-center col-md-2 mt40">

            <BrowserRouter>
                <div>
                    <Route exact path={`/landing`} component={Landing} />
                    <Route path={'/capture/:linkUrl'} component={CaptureVideo} />
                </div>
            </BrowserRouter>
        </p>
      </div>
    );
  }
}

export default App;
