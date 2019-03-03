import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Table} from 'react-bootstrap';
import axios from 'axios';


class Statistics extends React.Component {
    state={hospitalsByState:[]}

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
            this.setState({hospitalsByState:res.data});
            console.log(this.state.hospitalsByState);
        })
    }

    render(){
        let HospitalsByState =  this.state.hospitalsByState.map((data,id=1)=>{
                return (
                    <tr>
                        <td>{id+1}</td>
                        <td>{data.name}</td>
                        <td>{data.count}</td>
                    </tr>
                )
                id += 1
            });
        return (
            <div style={{marginTop:'20px',marginLeft:'20px'}}> 
                <h1>Statistics</h1>
                <div style={{height: '100vh', width: '30%',marginTop:'20px'}}>
                <h3>No of Hospitals by State</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>State</th>
                            <th>No.of Facilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {HospitalsByState}
                    </tbody>
                    </Table>
                </div>
            </div>
        
        )
    }
    
}

export default Statistics;