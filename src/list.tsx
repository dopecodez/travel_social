import React, { Component } from 'react';
import './list.css';

interface IListStates {
    posts: Object[],
    newPost: string
}

interface IListProps {

}

export default class List extends Component<IListProps, IListStates> {
    constructor(props: IListProps){
        super(props);
        let data: Object[] = [
          { post: 'First', upvotes: 3, downvotes: 5 },
          { post: 'Second', upvotes: 6, downvotes: 10 },
          { post: 'Third', upvotes: 4, downvotes: 10 }
        ]
        this.state = {
            posts: data,
            newPost: ''
        }
        this.addPost = this.addPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addPost(){
        console.log(this.state.newPost);
        if(this.state.newPost != ''){
            this.setState({
                posts: [{post: this.state.newPost, upvotes:0, downvotes:0}, ...this.state.posts],
                newPost: ''
            })
        }else alert('Why you making an empty post?')   
    }

    handleChange(event : any){
        this.setState({
            newPost: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='listClass'>
                    {this.state.posts
                        .sort((a: any, b: any) => b.upvotes - a.upvotes)
                        .map(function (item: any) {
                            return <div>{item.post} - {item.upvotes} - {item.downvotes}</div>
                        })
                    }
                </div>
                <div>
                    <input className='postArea' type='textbox' placeholder='New Post' value={this.state.newPost} 
                    onChange={this.handleChange}></input><br/>
                    <button className='submitButton' type='submit' onClick={this.addPost}>Add Post</button>
                </div>
            </div>
        );
    }
}