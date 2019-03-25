import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EditableLabel from 'react-inline-editing';

import 'bootstrap/dist/css/bootstrap.min.css';

class Drogon extends React.Component{

    

    constructor(props){
      super(props);

      this.handleFocus = this.handleFocus.bind(this);
      this.handleFocusOut = this.handleFocusOut.bind(this);
      this.state = {
        statusLists: this.props.statusList,
        taskLists: this.props.taskList,
        subTaskLists: this.props.subTaskList
        };
    }

    componentWillMount(){

    }

    

    allowDrop = (ev) => {
        
        ev.preventDefault();
        console.log('drogOver'+ev.target.id); 
        let parentID = ev.target.id;
        if(parentID === 'task' || parentID === 'progress'){
            return true;
        }else{
            return false;
        }
    }

    drag = (ev) => {
        console.log(ev.target.id);
        ev.dataTransfer.setData('text', ev.target.id);
    }
    

    drop = (ev) => {
            ev.preventDefault();
            if(ev.target.id === 'task' || ev.target.id === 'progress'){
            let data = ev.dataTransfer.getData('text');
            ev.target.appendChild(document.getElementById(data));
            document.getElementById(data).parentNode.replaceWith(ev.target);
            //console.log(ev.target.id);
             ev.dataTransfer.clearData();
            }

        
    }

    addTask = () => {
        const newData = {id: 100+this.state.taskLists.length, name: 'New task', priority: 3, status: 'new'};
        this.setState(prevState => ({taskLists: [...prevState.taskLists, newData]}));
    }


    appendSubtask = (item) => {
        const newData = {id: 1000+item.id+this.state.subTaskLists.length, parentId: item.id, name: 'New Subtask', priority: 3};
        this.setState(prevState => ({subTaskLists: [...prevState.subTaskLists, newData]}));
   }

   deleteTask = (item) => {
        console.log(item);
        let index = this.state.taskLists.indexOf(item);
        let newsubtask = this.state.subTaskLists.filter( e => { return e.parentId !== item.id;});

        //this.setState({subTaskLists:newsubtask},function () {
             //return this.state.subTaskLists;
        //});
        
        if (index !== -1) {
            this.state.taskLists.splice(index, 1);
                console.log(this.state.subTaskLists);
            this.setState({taskLists: this.state.taskLists},function () {
             return this.state.taskLists;
            });
        }
       
          console.log(this.state.taskLists);
          console.log(this.state.subTaskLists);
          return false;
        //this.setState(curState => ({taskLists: prevState.taskLists.filter( i => !( i === item ) )}));
        // var removeIndex = item;
        // console.log(this.state.taskLists);
        // var prestate = this.state.taskLists;
        // var newState = prestate.splice(removeIndex,1);

        // this.setState(prevState => ({subTaskLists:newState}));
        // console.log(this.state.taskLists);
   }

   deleteSubTask = (item) => {
        console.log(item);
        this.setState(prevState => ({subTaskLists: prevState.subTaskLists.filter( i => !( i === item ) )}));
   }

   handleFocus = (text) => {
        console.log('Focused with text: ' + text);
    }

    handleFocusOut = (text) => {
        console.log('Left editor with text: ' + text);
    }


    render() {

        const { taskLists, subTaskLists, statusLists } = this.state;

        return (
            <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='text-left'>
                              <h3>Drogon</h3>
                              <h5>Trello Board</h5> 
                            </div>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-sm-4'>
                                        New tasks
                                        <button onClick={this.addTask} className='btn btn-primary btn-sm float-right'>Add Task</button>
                                    </div>
                                    <div className='col-sm-4'>
                                        In Progress
                                    </div>
                                    <div className='col-sm-4'>
                                        Completed
                                    </div>
                                </div>
                                <div className='row'>
                                    {
                                                statusLists.map( ( statusList ) => (

                                    <div className='col-sm-4'>
                                        <div className='target' id={statusList.name} onDrop={this.drop} onDragOver={this.allowDrop}>
                                            {
                                                taskLists.filter( taskList => taskList.status === statusList.name ).map( ( taskList ) => (

                                                 <div id={taskList.id} className='draggable' draggable='true' onDragStart={this.drag}>
                                                    <div className='taskHeader'>{taskList.name}

                                                        

                                                        <span onClick={this.appendSubtask.bind(this, taskList)} className='actions float-right'>+</span>  
                                                        <span id={taskList.id+1250} onClick={this.deleteTask.bind(this, taskList)} className='actions float-right'>x</span>
                                                    </div>
                                                 
                                                    {   
                                                        
                                                        subTaskLists.map((subTaskList) => (

                                                            <div className='subTask' style={{display:subTaskList.parentId === taskList.id ? 'inline-block' : 'none'}}>
                                                            <input type='checkbox'/> {subTaskList.parentId === taskList.id ? subTaskList.name : null}
                                                               
                                                            <span onClick={this.deleteSubTask.bind(this, subTaskList)} className='actions float-right'>x</span>

                                                             </div>

                                                         
                                                            ))

                                                        
                                                    }
                                                 </div>

                                                ))
                                            }
                                        </div>
                                    </div>

                                         ))
                                    }
                                    
                                </div>
                             </div> 
                        </div>
                    </div>
                </div>
                
        );
    }


}

const statusList = [
    { id:215, name: 'new', order: 1, activstatus: true },
    { id:211, name: 'progress', order: 2, activstatus: true },
    { id:212, name: 'completed', order: 3, activstatus: true }
];

const taskList = [
    { id:15, name: 'Develop wireframe/UI', priority: 2, status: 'new' },
    { id:11, name: 'Develop wireframe/UX', priority: 2, status: 'new' },
    { id:12, name: 'Develop UI with bootstrap', priority: 2, status: 'progress' },
    { id:13, name: 'Implement with React', priority: 2, status: 'progress' },
    { id:14, name: 'Integration API', priority: 2, status: 'new' }
    
];

const subTaskList = [
    { id:111, parentId:11, name: 'Develop Home UX', priority: 2},
    { id:112, parentId:11, name: 'Develop bootstrap UX', priority: 2},
    { id:113, parentId:12, name: 'Develop Dashboard', priority: 2},
    { id:114, parentId:12, name: 'Develop Home Page', priority: 2},
    { id:115, parentId:13, name: 'Dashboard React', priority: 2},
    { id:116, parentId:14, name: 'Dashboard API', priority: 2},
    { id:117, parentId:11, name: 'Login UX', priority: 2},
    { id:118, parentId:14, name: 'API Testing', priority: 2}

]


// render the element onto the HTML page
ReactDOM.render( <Drogon taskList={taskList} subTaskList={subTaskList} statusList={statusList}></Drogon>, document.getElementById( 'root' ) );