import React, { Component } from 'react';
import User from './User';
class Users extends Component {
	state={
		users:[
		{name:"Prathika",age:2},
		{name:"Ranjith",age:34},
		{name:"thilaga",age:32}
		],
		title:'users list'
	}
	makeyounger =()=>{
		const newstate=this.state.users.map((user)=>{
      		var tempusr = user;
      		tempusr.age-=10;
      		return tempusr;
	     	});
		this.setState({
			newstate
		});
	}
  render() {
    return (
      <div>
      <button onClick={this.makeyounger}>Make Us Younger</button>
      <br/>
      <h1>{this.state.title}</h1>
      {
      	this.state.users.map((user)=>{
      		return <User age={user.age}>{user.name}</User>
      	})
      }
      </div>
    );
  }
}

export default Users;
