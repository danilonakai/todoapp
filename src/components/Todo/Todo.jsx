import React, { Component } from 'react';
import './Todo.css';
// import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTrash,faBars } from '@fortawesome/free-solid-svg-icons'

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
        let list_id = localStorage.getItem('list_id');
        let item_id = localStorage.getItem('item_id');
        let data = localStorage.getItem('data');

        if(list_id !== null && item_id !== null && data !== null){
            this.setState({
                list_id: list_id,
                item_id: item_id,
                data: JSON.parse(data)
            });
        }
    }

    create_list(){
        let id = this.state.list_id;
        let data = this.state.data;
        let new_data = JSON.parse(JSON.stringify(data));
        let title = document.getElementById('list-title').value.trim();
        
        if(title != ""){
            new_data.lists.push({
                id: id,
                title: title,
                items: []
            });
    
            this.setState({
                data: new_data,
                list_id: id+1,
                selected_list: {
                    id: id,
                    title: title,
                    items: []
                }
            },()=> {
                this.clean_input("list");
                this.save_data();
            });
        }
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
            },()=> {
                document.querySelector('#todo section article .header svg').style.display = "inline";
                this.toggle_lists_on_mobile();
            });
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
                        },()=>{
                            this.save_data();
                            this.clean_input("all");
                        });
                    }
                });
            }
        }        
    }

    add_item_to_list(){
        let id = this.state.item_id;
        let data = this.state.data;
        let new_data = [];
        let list_id;
        let item_title = document.getElementById('item-title').value.trim();

        if(this.state.selected_list !== null){
            list_id = this.state.selected_list.id;                
        }

        if(item_title != ""){
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
                this.clean_input("item");
                this.save_data();
            });
        }
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
            this.save_data();
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

        console.log(new_data);

        this.setState({
            data: new_data
        }, () => {
            this.save_data();
        });
    }

    save_data(){
        localStorage.setItem('list_id',this.state.list_id);
        localStorage.setItem('item_id',this.state.item_id);
        localStorage.setItem('data',JSON.stringify(this.state.data));
    }

    clean_input(type){
        if(type === "all"){
            document.querySelector('#todo section article .header svg').style.display = "none";
            document.querySelector('#todo section article .add-item').style.display = "none";
        }else if(type === "list"){
            document.getElementById('list-title').value = "";
        }else if(type === "item"){
            document.getElementById('item-title').value = "";
        }
    }

    print_converted_lists(){
        let data = this.state.data.lists;
        let lists = [];
        let result;
        let id;

        if(this.state.selected_list !== null){
            id = this.state.selected_list.id;
        }

        data.forEach(list=> {
            lists.push(<li className={((list.id === id) ? "active" : "")} onClick={()=> this.select_list(list.id)}><span>{list.title}</span></li>);
        });

        if(lists.length > 0){
            result = (<ul>{lists}</ul>);
        }else{
            result = (<span>There is no lists yet.</span>);
        }
        

        return result;
    }

    print_selected_list(){
        let all_lists = this.state.data.lists;
        let selected_list = null;
        let title;
        let items = [];

        if(all_lists.length > 0 && this.state.selected_list !== null){
            selected_list = all_lists.filter(list=> list.id === this.state.selected_list.id)[0];
        }

        if(selected_list !== null && selected_list !== undefined){
            title = selected_list.title;

            document.querySelector('#todo section article .add-item').style.display = "flex";

            
            if(selected_list.items.length > 0){
                selected_list.items.forEach(item=> {
                    items.push(
                        <li>
                            <FontAwesomeIcon icon={faTrash} onClick={()=> this.delete_item_from_list(selected_list.id,item.id)} />
                            <input type="checkbox" id={item.id+"-"+item.title} onChange={()=> this.check_item(selected_list.id,item.id)} checked={item.checked} />
                            <label htmlFor={item.id+"-"+item.title}>{item.title}</label>
                        </li>
                    );
                });
            }
            
        }

        return (
            <div>
                <div className="header">
                    <h2>{title}</h2> 
                    <FontAwesomeIcon icon={faTrash} onClick={()=> this.delete_list(selected_list.id)} />
                </div>

                <div className="add-item">
                    <input type="text" id="item-title"/>
                    <button onClick={()=> this.add_item_to_list()}><FontAwesomeIcon icon={faPlus} /> Add item</button>
                </div>
            
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
    
    toggle_lists_on_mobile(){
        let lists_box = document.querySelector('#todo section aside');
        console.log(lists_box.offsetLeft);

        if(lists_box.offsetLeft == 0){
            lists_box.style.left = "-250px";
            console.log("-250");
        }else{
            lists_box.style.left = "0";
            console.log("0");
        }
    }
    

    render(){
        return (
            <div id="todo">
                <header>
                    <div className="container">
                        <h1>ToDoApp</h1>

                        <div>
                            <input type="text" id="list-title" />
                            <button onClick={()=> this.create_list()}>
                                <FontAwesomeIcon icon={faPlus} />
                                New List
                            </button>
                        </div>
                    </div>
                </header>

                <section className="container">
                    <aside>
                        <div className="menu" onClick={()=> this.toggle_lists_on_mobile()}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>

                        <h3>Lists</h3>
                        
                        {this.print_converted_lists()}
                    </aside>

                    <article>
                        {this.print_selected_list()}
                    </article>
                </section>

                <footer>
                    <span>©2021 <a href="https://danilonakai.com/" target="_blank">Danilo Nakai</a> | All rights reserved.</span>
                </footer>
            </div>
        )
    }
}
