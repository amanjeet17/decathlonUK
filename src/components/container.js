import React, { Component } from 'react';
import axios from 'axios';
import Todo from './todo';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
    }

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => {
                console.log('data rx', res)
                this.setState({ todoList: res.data })
            })
            .catch((err) => {
                console.log('err loading posts', err);
            })
    }
    render() {
        const { todoList } = this.state;
        return (
            <React.Fragment>
                {
                    todoList.map((post) => {
                        return (
                            <Todo key={post.id} post={post} />
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default Container;