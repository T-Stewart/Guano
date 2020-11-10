import React from 'react'
import Comment from './Comment'

export default class Comments extends React.Component {
    render() {
        return (
        <section className="section">{
            this.props.comments.map((comment, index) =>{
                return <Comment key={index} comment={comment}/>
            })
          }
        </section>
        );
    }
}