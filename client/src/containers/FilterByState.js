import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Form,Col,Row,Label} from 'react-bootstrap';
import axios from 'axios';
import * as d3 from 'd3';

class FilterByState extends React.Component {
    state={states:[],
            selectedValCount: [], value:""
            ,stateSelected :false}

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
        })
        
    }

    
    getInitialState =() => {
            return {
                value: 'select'
            }
        }
        DropdownChanged= (event) => {
            console.log("x",event.target.value);
            this.setState({value: event.target.value});
            
            const s = this.state.states.filter(el=> (el.name===event.target.value))
            console.log(s.length)
            if(s!== undefined && s.length===1)
              { console.log(s[0].count)
                 this.selectedValCount = 'No of facilites are: '+s[0].count}


                 this.renderChart(event.target.value);
            }


        drawGraph = (data) => {
            var svgelement = document.getElementById("mysvg");
            console.log('# '+svgelement)
            //svgelement.remove();
            data.forEach(element => {
                console.log(element['hospcount'])
                console.log(element['District_Name'])   
            });

            var margin = {top: 20, right: 20, bottom: 30, left: 60},
                width = 1000 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
            var y = d3.scaleLinear()
                .range([height, 0]);
            
            var svg = d3.select("body").select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");
            x.domain(data.map(function(d) { return d.District_Name; }));
            y.domain([0, d3.max(data, function(d) { return d.hospcount; })]);
            
            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(x);
        svg.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height + margin.top + 10) + ")")
            .style("text-anchor", "middle")
            .text("Districts");
            
            var bars = svg.selectAll(".bar")
            .data(data)
            .enter();

        bars.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x(d.District_Name); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.hospcount); })
            .attr("height", function(d) { return height - y(d.hospcount); })
            .style("fill",'steelblue');
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left-5)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("# of facilities");
        

        }
        renderChart = (statename) => {
            console.log('Came to renderChart');
            
            console.log("y",statename);

            axios.get('http://127.0.0.1:3001/hospitalbydistrict?statename='+statename,{
            headers:{
            'Access-Control-Allow-Origin':'*'
            },
            proxy: {
                host: 'localhost',  
                port: 3001
              }
        }).then((res,err)=>{
            console.log(res)
            console.log('*****')
            
            this.drawGraph(res.data);
        })
    
        }


    render() {  
        //const states=[{name:'AP', count=100}, {name:"UP", count=90}]
        return (        
        <div style={{marginTop:'20px', marginLeft:'20px'}}>
            <label> Please select a state:   </label>            
            <select style={{marginLeft:'10px'}}onChange={this.DropdownChanged} value={this.state.value} >
                <option value="select">Select</option>
             {this.state.states.map((x,y) => <option key={y}> {x.name} </option>)}
             </select>

             <p>{this.selectedValCount}</p>

             <svg> </svg>
               
             

        </div>           
        )  
    
    }
}


export default FilterByState;