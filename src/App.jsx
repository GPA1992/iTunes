import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import Edit from './Pages/Profile/Edit';
import NotFound from './Pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disableEnter: true,
      loged: false,
      onLoading: false,
    };
  }

  getName = ({ target }) => {
    const { value } = target;
    const minCaractere = 3;
    const enableEnter = value.length < minCaractere;
    this.setState({
      name: value,
      disableEnter: enableEnter,
    });
  }

  funcCreateUser = async () => {
    const { name } = this.state;
    this.setState({ onLoading: true });
    await createUser({ name });
    this.setState({
      loged: true,
      onLoading: true,
    });
  }

  render() {
    const { disableEnter, loged, onLoading } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/search" component={ Search } />
            {loged ? <Redirect to="/search" /> : <Route
              exact
              path="/"
              render={ () => (<Login
                disableEnter={ disableEnter }
                getName={ this.getName }
                funcCreateUser={ this.funcCreateUser }
                onLoading={ onLoading }
              />) }
            />}
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
