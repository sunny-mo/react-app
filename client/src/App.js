import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

  }
  
  callApi = async () => {
    const response = await fetch('/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  jwtResponse = async () => {
    // e.preventDefault();
    const response = await fetch('/jwtparser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Dummy React App</h2>

          <img src={logo} className="App-logo" alt="logo" />
         
          <a className="App-link" href="https://www.miniOrange.com" target="_blank" rel="noopener noreferrer" >
            miniOrange React App Demo for SSO
          </a>

          {/* <a href="https://sunny.miniorange.in/moas/broker/login/jwt/51896?client_id=YIQieyV4Vjyblo5Q&redirect_uri=http://localhost:5000/jwtparser"><button>Login via SSO</button></a> */}

          <a href=" https://minitech.xecurify.com/moas/broker/login/jwt/227493?client_id=6F0YdrPM2ShqUXIw&redirect_uri=http://demo.miniorange.com/react/jwtparser   "><button>Login via SSO</button></a>
               
          <p>{this.state.response}</p>
          <p>{this.state.responseToPost}</p>
        </header>
      
      </div>
    );
  }
}

export default App;
