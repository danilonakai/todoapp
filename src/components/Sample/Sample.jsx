import React, { Component } from 'react';
import logo from './../../assets/images/logo.svg';
import './Sample.css';
import { useState } from 'react';

export default class Sample extends Component{
    constructor(props) {
        super(props);
        
    }

    render(){
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" /*onClick={() => setCount((count) => count + 1)}*/>
                        count is: {/*count*/}
                    </button>
                </p>
                <p>
                    Edit <code>App.jsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        )
    }
}
