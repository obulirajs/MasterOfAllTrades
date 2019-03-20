import React, { Component } from 'react';
import Users from './users/Users';

import './App.css';

class App extends Component {
	state={
		name:"Prathika"
	}
	changename=(newname)=>{
		this.setState({
			name:newname
		})
	}
	changenamefrominput=(e)=>{
		this.setState({
			name:e.target.value
		})
	}

  render() {
    return (
      <div className="App">
      <button onClick={()=>this.changename("Angel Prathika :)")}>Change name using anon fun</button>
      <button onClick={this.changename.bind(this,"Angel Prathika :(")}>Change name using bind fun</button>
      	<br/><br/><br/>
        <input type="text" onChange={this.changenamefrominput} value={this.state.name}/>
        <div>{this.state.name}</div>
        <br/><br/><br/>
        <div><Users/></div>
      </div>
    );
  }
}

export default App;
