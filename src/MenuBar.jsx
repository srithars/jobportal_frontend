import React, { Component } from 'react';
import './MenuBar.css';
import { BASEURL, callApi, getSession } from './api';

class MenuBar extends Component {
    constructor()
    {
        super();
        this.state = {menulist: []};
        this.loadMenus = this.loadMenus.bind(this);
    }
    componentDidMount()
    {
        let CSR = getSession("CSRID");
        let data = JSON.stringify({csrid: CSR});
        callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenus);
        //callApi("POST", BASEURL + "menus/getmenuitems", "", this.loadMenus);
    }
    loadMenus(response)
    {
        let data = JSON.parse(response);
        this.setState({menulist : data});
    }
    render() {
        const {menulist} = this.state;
        return (
            <div className='menubar'>
                <div className='menuheader'>
                    <img src='/menu.png' alt='' />
                    MENU
                </div>
                <div className='menulist'>
                    <ul>
                        {menulist.map((row)=>(
                            <li onClick={()=>this.props.onMenuClick(row.mid)} ><img src={row.micon} alt=''  /> {row.mtitle} </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MenuBar;
