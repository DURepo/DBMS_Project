import React from 'react';
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Table} from 'react-bootstrap';
import axios from 'axios';
import * as d3 from 'd3';


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
            //console.log(this.state.hospitalsByState);
        })
        axios.get('http://127.0.0.1:3001/hospitalbystate',{
            headers:{
            'Access-Control-Allow-Origin':'*'
            },
            proxy: {
                host: 'localhost',  
                port: 3001
              }
        }).then((res,err)=>{
            this.drawGraph(res.data);
        })
    }

    drawGraph(data) {

        var state_abbrevations = ['AP','AR','AS','BI','CD','CH','DNH','DD','DL','GO','GU','HA','HI','JK','JH','KA','KE','MP','MH','MA','ME','MI','NA','OD','PY','PU','RA','SI','TN','TE','TR','UP','UK','WB']
        console.log(data);
        
        data.forEach(function(d,index) {
            d.Population = d.Population/1000000;
            d.Number_of_Hospitals = d.Number_of_Hospitals/1000;
            console.log('***********');
            console.log(d.Population);
            console.log(d.State_Name);
            d.State_Name = state_abbrevations[index];
            console.log(d.Number_of_Hospitals)
            console.log('***********');
        });
        //data = JSON.parse(data);
        //console.log(data);
        var margin = {top: 20, right: 100, bottom: 100, left: 40},
            width = 1300 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
        var y0 = d3.scaleLinear()
                .range([height, 0]);
        var y1 = d3.scaleLinear()
                .range([height, 0]);

        //var yAxisLeft = d3.svg().axis().scale(y0).ticks(4).orient("left");
        // create right yAxis
        //var yAxisRight = d3.svg().axis().scale(y1).ticks(6).orient("right");
                
        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

        // format the data
        
        

         // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.State_Name; }));
        y0.domain([0, d3.max(data, function(d) { return d.Population; })]);
        y1.domain([0, d3.max(data, function(d) { return d.Number_of_Hospitals; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(x);
        svg.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height + margin.top + 10) + ")")
            .style("text-anchor", "middle")
            .text("States");
        
        

        // append the rectangles for the bar chart
        var bars = svg.selectAll(".bar")
            .data(data)
            .enter();

        bars.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x(d.State_Name); })
            .attr("width", x.bandwidth()/2)
            .attr("y", function(d) { return y0(d.Population); })
            .attr("height", function(d) { return height - y0(d.Population); })
            .style("fill",'steelblue')

        bars.append("rect")
            .attr('class','bar2')
            .attr("x", function(d) { return x(d.State_Name)+x.bandwidth()/2; })
            .attr("width", x.bandwidth()/2)
            .attr("y", function(d) { return y1(d.Number_of_Hospitals); })
            .attr("height", function(d) { return height - y1(d.Number_of_Hospitals); });


        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y0));
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left-5)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Population in millions");
        svg.append("g")
            .attr("transform", "translate(" + (width) + ",0)")
            .call(d3.axisRight(y1));
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", width + 20)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("# of facilities in thousands"); 

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
                <div style={{height: '50%', width: '30%',marginTop:'20px'}}>
                <h3>No of Hospitals by State</h3>
                <Table striped bordered hover style={{display: 'block', height: '300px', overflowY:'auto'}}>
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
                <div style={{height: '50%', width: '100%',marginTop:'20px'}}>
                <h3>Population And Health Facilities by State</h3>
                <svg></svg>
                </div>
            </div>
        
        )
    }
    
}

export default Statistics;