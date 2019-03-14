import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Form,Col,Row,Label} from 'react-bootstrap';
import axios from 'axios';

class FilterByState extends React.Component {
    state={states:[],
            selectedValCount: [],
            statesData:[],
            eachStateFacility:[]
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

        axios.get('http://127.0.0.1:3001/Facilitiesbystate',{
            headers:{
            'Access-Control-Allow-Origin':'*'
            },
            proxy: {
                host: 'localhost',
                port: 3001
              }
        }).then((res,err)=>{
            this.setState({statesData:res.data});
            console.log(this.state.statesData);
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

                this.state.eachStateFacility= this.state.statesData.filter(s => s.State_Name===event.target.value)      

            }


    render() {  
        //const states=[{name:'AP', count=100}, {name:"UP", count=90}]
        return (        
        <div style={{marginTop:'20px',marginLeft:'20px'}}>            
            <select onChange={this.DropdownChanged} value={this.state.value} >
                <option value="select">Select</option>
             {this.state.states.map((x,y) => <option key={y}> {x.name} </option>)}
             </select>
            
            <div style={{marginTop:'20px',marginLeft:'20px'}}>
             <h6><strong>{'Total Hospitals: '}</strong></h6>{this.selectedValCount}
             
            </div>

                        
             <div style={{marginTop:'20px',marginLeft:'20px'}}>
             <h6><strong>{'Facility Details: '}</strong></h6>
             {this.state.eachStateFacility.map(function(e,index){
                 return <h6 key={index}>{e.FacilityType}:  {e.count}</h6>
             })}
             </div>
             

        </div>           
        )  
    
    }
}


export default FilterByState;