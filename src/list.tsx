import React, { Component } from 'react';
import './list.css';

interface IListStates {
    posts: post[],
    newPost: post
}

interface IListProps {

}

type post = {
    id: number,
    title: string,
    desc?: string,
    upvotes: number,
    downvotes: number
}

export default class List extends Component<IListProps, IListStates> {
    private data: post[];
    constructor(props: IListProps) {
        super(props);
        this.data = [
            { id:0, title: 'First', desc: 'now this looks like its on top of me', upvotes: 3, downvotes: 5 },
            { id:1, title: 'Second', desc: 'now this looks like its on top of me', upvotes: 6, downvotes: 10 },
            { id:2, title: 'Third', desc: 'now this looks like its on top of me', upvotes: 4, downvotes: 10 }
        ]
        this.state = {
            posts: this.data,
            newPost: { id:this.data.length, title: '', upvotes: 0, downvotes: 0 },
        }
        this.addPost = this.addPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleVoting = this.handleVoting.bind(this);
    }

    addPost() {
        if (this.state.newPost.title !== '') {
            this.setState({
                posts: [{ id: this.state.posts.length, title: this.state.newPost.title, desc: this.state.newPost.desc, upvotes: 0, downvotes: 0 }, ...this.state.posts],
                newPost: { id: this.state.posts.length, title: '', upvotes: 0, downvotes: 0 }
            })
        } else alert('Why you making an empty post?')
    }

    handleChange(event: any) {
        this.setState({
            newPost: event.target.value
        })
    }

    handleVoting(event: any){
        console.log(event)
    }

    render() {
        return (
            <div>
                <div id='listClass'>
                    {this.state.posts
                        .sort((a: post, b: post) => b.upvotes - a.upvotes)
                        .map((item: post)=> {
                            return (<div id="postBody" key={item.id}><div id='postTitle'>{item.title}</div>
                                <div id='postDesc'>{item.desc}</div>
                                <div id='voteBox'>
                                    <div id="upvote" onClick={this.handleVoting}></div><br />
                                    <div id='count'>{item.upvotes - item.downvotes}</div>
                                    <div id="downvote" onClick={this.handleVoting}></div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div>
                    <form id="postForm">
                        <input id="postTitleArea" type='textbox' placeholder='Heading' value={this.state.newPost.title}
                            onChange={this.handleChange}></input><br />
                        <input id='postBodyArea' type='textbox' placeholder='Write Something' value={this.state.newPost.title}
                            onChange={this.handleChange}></input><br />
                        <button id='submitButton' type='submit' onClick={this.addPost}>Add Post</button>
                    </form>
                </div>
            </div>
        );
    }
}