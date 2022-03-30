import React, { Component } from 'react';
import './Todo.css';
// import { useState } from 'react';

export default class Todo extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            list_id: 1,
            item_id: 1,
            data: {
                lists: []
            },
            selected_list: null
        };
        
    }
    
    componentDidMount(){
        
    }

    create_list(title){
        let id = this.state.list_id;
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(data));
        
        new_data.lists.push({
            id: id,
            title: title,
            items: []
        });

        this.setState({
            data: new_data,
            list_id: id+1
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
                }, () => {
                    if(this.state.selected_list.id === id){
                        this.setState({
                            selected_list: null
                        });
                    }

                    alert("List deleted!");
                });
            }
        }        
    }

    add_item_to_list(list_id,item_title){
        let id = this.state.item_id;
        let data = this.state.data;
        let new_data = [];

        data.lists.forEach(list => {
            if(list.id === list_id){
                list.items.push({
                    id: id,
                    title: item_title,
                    checked: false
                });
            }
            
            new_data.push(list);
        });

        new_data = { lists:  new_data};

        this.setState({
            item_id: id+1,
            data: new_data
        }, () => {
            console.log(this.state.data);
        });
    }

    delete_item_from_list(list_id,item_id){
        let data = this.state.data;
        let new_data = [];

        data.lists.forEach(list => {
            if(list.id === list_id){
                list.items = list.items.filter(item=> item.id !== item_id);
            }
            
            new_data.push(list);
        });

        new_data = { lists:  new_data};

        this.setState({
            data: new_data
        }, () => {
            console.log(this.state.data);
        });
    }

    check_item(list_id,item_id){
        let data = this.state.data;
        let new_data = [];

        data.lists.forEach(list => {
            if(list.id === list_id){
                list.items = list.items.filter(item=> {
                    if(item.id === item_id){
                        let checked;

                        if(item.checked){
                            checked = false;
                        }else{
                            checked = true;
                        }

                        item.checked = checked;
                    }
                    return item;
                });
            }
    
            new_data.push(list);
        });

        new_data = { lists:  new_data};

        this.setState({
            data: new_data
        }, () => {
            console.log(this.state.data);
        });
    }



    render(){
        return (
            <header className="todo">
                <button onClick={() => console.log(this.state.data)}>show lists</button>

                <button onClick={() => console.log(this.state.selected_list)}>show selected list</button>

                <button onClick={()=> this.create_list("test")}>create list</button>

                <button onClick={() => this.select_list(3)}>select 3rd list</button>

                <button onClick={() => this.delete_list(3)}>delete 3rd list</button>

                <button onClick={() => this.add_item_to_list(3,"item title")}>add item to 3rd list</button>

                <button onClick={() => this.delete_item_from_list(3,3)}>delete 3rd item from 3rd list</button>

                <button onClick={() => this.check_item(3,1)}>check 3rd item from 3rd list</button>
            </header>
        )
    }
}
