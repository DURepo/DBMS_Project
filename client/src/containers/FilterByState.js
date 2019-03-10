import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Form,Col,Row,Label} from 'react-bootstrap';
import axios from 'axios';

class FilterByState extends React.Component {
    state={states:[],
            selectedValCount: []
            }

    componentDidMount(){
        axios.get('http://127.0.0.1:3001/bystate',{
            headers:{
            'Access-Control-Allow-Origin':'*'
            },
            proxy: {
                host: 'localhost',
                port: 3001
              }
        }).then((res,err)=>{
            this.setState({states:res.data});
            console.log(this.state.states);
        })
        
    }

    
    getInitialState =() => {
            return {
                value: 'select'
            }
        }
        DropdownChanged= (event) => {
            this.setState({value: event.target.value});
            const s = this.state.states.filter(el=> (el.name===event.target.value))
            console.log(s.length)
            if(s!== undefined && s.length===1)
              { console.log(s[0].count)
                 this.selectedValCount = s[0].count}
            }


    render() {  
        //const states=[{name:'AP', count=100}, {name:"UP", count=90}]
        return (        
        <div>            
            <select onChange={this.DropdownChanged} value={this.state.value} >
                <option value="select">Select</option>
             {this.state.states.map((x,y) => <option key={y}> {x.name} </option>)}
             </select>

             <p>{this.selectedValCount}</p>         

        </div>           
        )  
    
    }
}


export default FilterByState;