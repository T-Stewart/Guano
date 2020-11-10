import React from 'react';
import $ from 'jquery';


export default class CommentBox extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
          isInCommentMode: true
        }
        this.addComment = this.addComment.bind(this)
        }

    addComment = (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment.value.trim();
        const name = e.target.elements.name.value.trim();

        if (name && comment) {
            const commentObject = { name, comment}

            this.props.handleAddComment(commentObject)

             /*global Ably*/
        const channel = Ably.channels.get('comments')
        channel.publish('add_comment', commentObject, err => {
            if(err){
                console.log('unable to publish message; err = ' + err.message)
            }
        })
        e.target.elements.comment.value = '';
        e.target.elements.name.value = '';
        }
       
    }

     cancelComment = (e) => {
        e.preventDefault();
        this.setState({isInCommentMode: false})

    }


    render() {
       if(this.state.isInCommentMode === false) {
        $("#comment-box").hide()
    }
        return (
              <div>
        <h5 className="title">We need to hear what you think</h5>
        <form onSubmit={this.addComment}>
          <div className="field">
            <div className="control">
              <input type="text" className="input" name="name" placeholder="Your name"/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <textarea className="textarea" name="comment" placeholder="Your opinion"></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="cancel-btn">Submit</button>
              <form onSubmit={this.cancelComment}>
              <input className="cancel-btn" type="submit" value="Cancel" ></input> 
              </form>
            </div>
          </div>
        </form>
      </div>
        )
    }
}