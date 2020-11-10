import React from 'react';

export default class Comment extends React.Component {
    render() {
        return (
             <article className="media">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{this.props.comment.name} believes ...</strong>
              <br />
              {this.props.comment.comment}
            </p>
          </div>
        </div>
      </article>

        )
    }
}