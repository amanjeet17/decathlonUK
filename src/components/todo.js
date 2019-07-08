import React, { Component } from 'react'
import axios from 'axios';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.post.id,
            title: props.post.title,
            body: props.post.body,
            userId: props.post.userId,
            edit: true
        }
    }

    deletePost = (event) => {
        var delid = event.target.id;
        var data = {
            "title": this.state.title,
            "body": this.state.body,
            "userId": this.state.userId
        }
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${this.state.id}`, data)
            .then((res) => {
                if (res.status === 200) {
                    document.getElementsByClassName(delid)[0].style.display = 'none';
                    console.log("Deleted", res)
                }
            })
            .catch((err) => {
                alert('Error in deletion', err)
            })

    }

    editPost = () => {
        var newState = !this.state.edit;
        this.setState({
            edit: newState
        });
        if (newState) {
            var data = {
                "title": this.state.title,
                "body": this.state.body,
                "userId": this.state.userId
            }
            axios.patch(`https://jsonplaceholder.typicode.com/posts/${this.state.id}`, data)
                .then((res) => {
                    console.log("Patched", res, data)
                })
                .catch((err) => {
                    alert('Error in patching undo save', err)
                })
        }
    }

    editbody = (event) => {
        this.setState({ body: event.target.value });
    }

    editTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    render() {
        return (
            <span className={this.state.id} >
                <div className="card" >
                    <div className="card-body" >
                        <div className="card-text" >Id : {this.state.id}
                            {
                                this.state.edit ?
                                    <span onClick={this.editPost} id='id'>
                                        <i className="fa fa-edit" id={this.state.id} aria-hidden="true"></i>
                                    </span> :
                                    <span onClick={this.editPost} id='id'>
                                        Save
                                    </span>
                            }
                            <span onClick={this.deletePost} id='id'>
                                <i className="fa fa-times" id={this.state.id} aria-hidden="true"></i>
                            </span>

                        </div>
                        <h3>Title</h3>
                        <textarea rows="4"  disabled={this.state.edit} className="goal" type="text" name="title" value={this.state.title} onChange={this.editTitle}></textarea><br />
                        <h4>Description</h4>
                        <textarea rows="8"  disabled={this.state.edit} className="description" name="desc" value={this.state.body} onChange={this.editbody}></textarea><br /><br />
                    </div>
                </div>
            </span>
        )
    }

}
export default Todo;