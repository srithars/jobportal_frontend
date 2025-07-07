import React, { Component } from 'react';
import './JobPostings.css';
import { BASEURL, callApi } from './api';

class JobPostings extends Component {
    constructor()
    {
        super();
        this.state = {
            id : '',
            title : '',
            company : '',
            location : '',
            jobtype : '',
            salary : '',
            description : '',
            jobsList: [],
            cpage: 1,
            isLoading: false 
        };
        
        this.getResponse = this.getResponse.bind(this);
        this.getDataResponse = this.getDataResponse.bind(this);
        this.saveResponse = this.saveResponse.bind(this);
        this.deleteResponse = this.deleteResponse.bind(this);
    }
    componentDidMount()
    {
        //callApi("GET", BASEURL + "jobs/getjobs", "", this.getResponse);
        callApi("GET", BASEURL + "jobs/getjobsbypage/0", "", this.getResponse);
    }
    getResponse(response)
    {
        let data = JSON.parse(response);
        //this.setState({jobsList : data});
        this.setState({jobsList : [...this.state.jobsList, ...data]});
        this.setState({isLoading: false});
    }
    closePopup()
    {
        jppopup.style.display = "none";
        this.setState({
            id: '',
            title:'',
            company: '',
            location:'',
            jobtype: '',
            salary: '',
            description: ''
        });    
    }
    showPopup()
    {
        jppopup.style.display = "block";
    }
    loadInputChange(event)
    {
        this.setState({[event.target.name] : event.target.value});
    }
    saveJob()
    {
        let data = JSON.stringify(this.state);
        callApi("POST", BASEURL + "jobs/save", data, this.saveResponse);
    }
    saveResponse(response)
    {
        let data = response.split("::");
        alert(data[1]);
        callApi("GET", BASEURL + "jobs/getjobs", "", this.getResponse);
    }
    getData(id)
    {
        callApi("GET", BASEURL + "jobs/getdata/" + id, "", this.getDataResponse);
    }
    getDataResponse(response)
    {
        if(response.includes("404::"))
            alert(response.split("::")[1]);

        let data = JSON.parse(response);
        this.setState({
            id : data.id,
            title : data.title,
            company : data.company,
            location : data.location,
            jobtype : data.jobtype,
            salary : data.salary,
            description : data.description
        });
        this.showPopup();
    }
    deleteData(id)
    {
        let data = confirm("Click OK to confirm the deletion");
        if(data === true) 
            callApi("DELETE", BASEURL + "jobs/delete/" + id, "", this.deleteResponse);
    }
    deleteResponse(response)
    {
        let data = response.split("::");
        alert(data[1]);
        callApi("GET", BASEURL + "jobs/getjobs", "", this.getResponse);
    }
    loadPaging(event)
    {
        let div = event.target;
        if (this.state.isLoading) return;

        if(div.scrollTop + div.clientHeight >= div.scrollHeight - 10)
        {
            callApi("GET", BASEURL + "jobs/getjobsbypage/" + this.state.cpage, "", this.getResponse);
            this.setState({ isLoading: true, cpage: this.state.cpage + 1 });
        }
    }
    render() {
        const {id, title, company, location, jobtype, salary, description} = this.state;
        const {jobsList} = this.state;
        const {cpage, isLoading} = this.state;
        return (
            <div className='jpcontainer'>
                <div id='jppopup' className='popup'>
                    <div className='popupWindow'>
                        <div className='popupHeader'>
                            <label id='PHL'>Popup Title</label>
                            <span onClick={()=>this.closePopup()}>X</span>
                        </div>
                        <div className='popupContent'>
                            <label>Job Title*</label>
                            <input type='text' id='T1' name='title' value={title} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Company Name*</label>
                            <input type='text' id='T2' name='company' value={company} onChange={(event)=>this.loadInputChange(event)} />
                            
                            <label>Job Location*</label>
                            <input type='text' id='T3' name='location' value={location} onChange={(event)=>this.loadInputChange(event)} />

                            <label>Job Type*</label>
                            <select id="T4" name='jobtype' value={jobtype} onChange={(event)=>this.loadInputChange(event)}>
                                <option value=""></option>
                                <option value="1">Full-time</option>
                                <option value="2">Part-time</option>
                            </select>
                            
                            <label>Salary*</label>
                            <input type='text' id='T5' name='salary' value={salary} onChange={(event)=>this.loadInputChange(event)} />
                            
                            <label>Job Description*</label>
                            <textarea id='T6' rows="5" name='description' value={description} onChange={(event)=>this.loadInputChange(event)} ></textarea>

                            <button onClick={()=>this.saveJob()} >Save</button>
                        </div>
                        <div className='popupFooter'></div>
                    </div>
                </div>

                <div className='header'>
                    <label>All Jobs</label>
                </div>
                <div className='content' onScroll={(event)=>this.loadPaging(event)} >
                    {jobsList.map((data)=>(
                        <div className='result'>
                            <div className='rheader'>
                                <label>{data.title}</label>
                                <span>{data.salary}</span>
                                <img src='/delete.png' alt='' onClick={()=>this.deleteData(data.id)} />
                                <img src='/edit.png' alt='' onClick={()=>this.getData(data.id)} />
                            </div>
                            <div className='rcontent'>
                                {data.company} | {data.location} | {data.jobtype === "1" ? 'Full-time' : 'Part-time'}
                            </div>
                            <div className='rfooter'>{data.description}</div>
                        </div>
                    ))}
                </div>
                <div className='footer'>
                    <button onClick={()=>this.showPopup()}>Post new job</button>
                </div>
            </div>
        );
    }
}

export default JobPostings;
