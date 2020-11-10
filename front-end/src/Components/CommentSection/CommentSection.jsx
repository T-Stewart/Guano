import React from 'react'
import CommentBox from './CommentBox'
import Comments from './Comments'

export default class CommentSection extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            comments: [],
            isInCommentMode: false

        }

        this.handleAddComment = this.handleAddComment.bind(this)
    }

    componentDidMount(){
        /*global Ably*/
        const channel = Ably.channels.get('comments');

        channel.attach();
            channel.once('attached', () => {
            channel.history((err, page) => {
                // create a new array with comments only in an reversed order (i.e old to new)
                const comments = Array.from(page.items, item => item.data)

                this.setState({ comments });

                channel.subscribe((msg) => {
                const commentObject = msg.data;
                this.handleAddComment(commentObject);
                })
            });
            });
    }


    handleAddComment(comment){
        this.setState(prevState => {
            return {
                comments: prevState.comments.concat(comment)
            }
        })
    }

    render() {

        return (      
               <section>
                        <div id="comment-box">      
                            <CommentBox handleAddComment={this.handleAddComment}/>        
                        </div>  
                        <div className="comment-post"><Comments comments={this.state.comments}/></div>
                        </section>
                         
        )
    }
}