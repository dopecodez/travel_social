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

export default class PostsWall extends Component<IListProps, IListStates> {
    private data: post[];
    constructor(props: IListProps) {
        super(props);
        this.data = [
            { id: 0, title: 'First', desc: 'now this looks like its on top of me', upvotes: 3, downvotes: 5 },
            { id: 1, title: 'Second', desc: 'now this looks like its on top of me', upvotes: 6, downvotes: 10 },
            { id: 2, title: 'Third', desc: 'now this looks like its on top of me', upvotes: 4, downvotes: 10 }
        ]
        this.state = {
            posts: this.data,
            newPost: { id: this.data.length, title: '', desc:'', upvotes: 0, downvotes: 0 }
        }
        this.addPost = this.addPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleVoting = this.handleVoting.bind(this);
    }

    addPost() {
        if (this.state.newPost.title !== '') {
            this.setState({
                posts: [{ id: this.state.posts.length, title: this.state.newPost.title, desc: this.state.newPost.desc, upvotes: 0, downvotes: 0 }, ...this.state.posts],
                newPost: { id: this.state.posts.length, title: '', desc:'', upvotes: 0, downvotes: 0 }
            })
        } else alert('Why you making an empty post?')
    }

    handleChange(event: any) {
        let _post: post;
        if(event.target.id === 'postTitleArea'){
            _post = this.state.newPost;
            _post.title = event.target.value;
            this.setState({
                newPost: _post
            })
        }else if(event.target.id === 'postBodyArea'){
            _post = this.state.newPost;
            _post.desc = event.target.value;
            this.setState({
                newPost: _post
            })
        }
    }

    handleVoting(event: any) {
        const _class = parseInt(event.target.parentNode.parentNode.className);
        let _posts = this.state.posts;
        let postIndex = _posts.findIndex(post => post.id === _class);
        event.target.id === 'upvote' ? _posts[postIndex].upvotes++ : _posts[postIndex].downvotes++
        this.setState({
            posts: _posts
        })
    }

    render() {
        return (
            <div>
                <div id='listClass'>
                    {this.state.posts
                        .sort((a: post, b: post) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
                        .map((item: post) => {
                            return (<div id="postBody" key={item.id} className={(item.id).toString()}>
                                <div id='postTitle'>{item.title}</div>
                                <div id='postDesc'>{item.desc}</div>
                                <div id='voteBox'>
                                    <div id="upvote" onClick={this.handleVoting}></div>
                                    <div id='count'>{item.upvotes - item.downvotes}</div>
                                    <div id="downvote" onClick={this.handleVoting}></div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div id='postArea'>
                    <input id="postTitleArea" type='textbox' placeholder='Heading' value={this.state.newPost.title}
                        onChange={this.handleChange}></input><br />
                    <input id='postBodyArea' type='textbox' placeholder='Write Something' value={this.state.newPost.desc}
                        onChange={this.handleChange}></input><br />
                    <button id='submitButton' type='submit' onClick={this.addPost}>Add Post</button>
                </div>
            </div>
        );
    }
}