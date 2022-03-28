import React, { Component } from 'react';
import logo from './../../assets/images/logo.svg';
import './Sample.css';
import { useState } from 'react';

export default class Sample extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            id: 1,
            data: {
                lists: []
            },
            selected_list: null
        };
        
    }
    
    componentDidMount(){
    }

    create_list(title){
        let id = this.state.id;
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(data));
        
        new_data.lists.push({
            id: id,
            title: title,
            items: []
        });

        this.setState({
            data: new_data,
            id: id+1
        },()=> console.log(this.state.data));
    }
    
    select_list(id){
        let data = this.state.data;
        let selected_list = data.lists.filter(list=> list.id === id)[0];

        if(selected_list !== undefined){
            this.setState({
                selected_list: {
                    id: selected_list.id,
                    title: selected_list.title,
                    items: selected_list.items
                }
            },()=> alert("List selected!"));
        }
    }

    delete_list(id){
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(data));
        new_data = {lists: new_data.lists.filter(list => list.id !== id)};
        
        if(data.lists.length !== new_data.lists.length){
            if(window.confirm("Are you sure you want to delete?")){
                this.setState({
                    data: new_data
                }, () => alert("List deleted!"));
            }
        }        
    }

    add_item_to_list(list_id,item_title){

    }

    delete_item_from_list(list_id,item_id){

    }

    check_item(list_id,item_id){

    }



    render(){
        return (
            <header className="App-header">
                <button onClick={() => console.log(this.state.data)}>show lists</button>

                <button onClick={()=> this.create_list("test")}>create list</button>

                <button onClick={() => this.select_list(3)}>select 3rd list</button>

                <button onClick={() => this.delete_list(3)}>delete 3rd list</button>
            </header>
        )
    }
}
