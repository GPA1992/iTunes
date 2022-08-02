import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import Edit from './Pages/Profile/Edit';
import NotFound from './Pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ Edit } />
            <Route exact component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
