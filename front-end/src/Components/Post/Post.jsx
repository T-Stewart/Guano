import React from "react"
import $  from "jquery"
import axios from "axios"
import "./Post.css"
import thoughts from "../ThoughtGenerator"
import Title from "../Title/Title"


export default class Posts extends React.Component {
    constructor(){
        super();
        this.state = {
            thought: [],
            opinion: '',
            posts: [],
            updateOpinion: '',
            updateThought: '',
            isInEditMode: false,
            isInCommentMode: false,
            updateID:'',
            firstName: 'tom'
         };
    };

    randomThought = () => {
        const randomThought = thoughts[Math.floor(Math.random()* thoughts.length)]
        this.setState({thought: randomThought}) 
    };

    componentDidMount = () => {
        this.takeUserId();
        console.log("Are we mounted?", this.state.firstName)
        this.getBlogPost();
    };

    getBlogPost = () => {
        axios.get('/api/posts')
        .then((response) => {
            const data = response.data
            this.setState({posts: data}) 
        })
        .catch(() => {
        //  console.log('Error')
        });
    };

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    };

    submit = (e) => {
        e.preventDefault();
        const post = {
            thought: this.state.thought,
            opinion: this.state.opinion,
            firstName: this.state.firstName,  
        };

        axios ({
            url: '/api/posts',
            method: 'POST',
            data: post
        })
        .then (() => {
            console.log('Data has been sent to the server')
        })
        .finally(() => {
            this.resetUserInputs();
            this.getBlogPost();
            this.displayPosts(this.state.posts);
        })
        .catch(() => {
            console.log('Error')
        });
    };

    update = (e) => {
        e.preventDefault();
        this.setState({isInEditMode: true})
        const post_id = {
            id: e.target.dataset.id
        } 
        axios ({
            url: '/api/posts/retrieve',
            method:'POST',
            data: post_id
        }) 
        .then((response) => {
            this.setState({updateOpinion: response.data.opinion, updateThought: response.data.thought, updateID: response.data._id})
        })
        .catch(() => {
            console.log('Error')
        });
      };

    save = (e) => {
          e.preventDefault();
          this.setState({isInEditMode: false})
          const post = {
              id: this.state.updateID,
              opinion: this.state.updateOpinion,
              thought: this.state.updateThought,
              firstName: this.state.firstName
            }
          axios({
              url: '/api/posts/update',
              method: 'POST',
              data: post
          })
          .then((response) =>{
              console.log(response.data)
          })
          .finally(() => {
              this.resetUserInputs();
              this.getBlogPost();
              this.displayPosts(this.state.posts)
          })
          .catch(() => {
              console.log('Error')
          });
      };

    delete = (e) => {
          e.preventDefault()
          const post_id = {
              id: e.target.dataset.id
          }
          axios({
              url: '/api/posts/delete',
              method: 'POST',
              data: post_id
          })
          .then(() => {
              console.log('Data has been deleted')
          })
          .finally(() => {
              this.getBlogPost();
              this.displayPosts(this.state.posts)
          })
          .catch(() => {
              console.log('Error')
          });
      };

    cancelUpdate = (e) => {
        e.preventDefault();
        this.setState({isInEditMode: false})
    };
  
    resetUserInputs = () => {
    this.setState({
       thought: [],
       opinion: '',
       updateMessage: '',
       updateID: ''
     });
   };

   displayPosts =(posts) => {      
       if (!posts.length) return null;
       return posts.map((post, index) => (
           <div key={index} className="post-area">
                 <h4 className="post-return" id="thought">{post.thought}</h4>
                 <p className="post-return">{post.opinion}</p>  
                <div className="return-btns">
                <form data-id={post._id} onSubmit={ this.delete }>
                    <input className="delete-btn" type="submit" value="Delete"/>
                </form>
                <form data-id={post._id} onSubmit={ this.update}>
                    <input className="edit-btn" type="submit" value="Edit"/>
                </form>
                </div>  
            </div>
       ));
   };

   takeUserId = () => {
    const { params } = this.props
    console.log("hey we are in takeUserid function and we are getting ");
    axios({
      url: '/api/user/find',
      method: 'POST',
      data: params
    }).then((response) => {
      let firstName = response.data.firstName
      this.setState({firstName: firstName})
      console.log(this.state.firstName)
    });
  };

   render(){
       console.log('State: ', this.state)
       if(this.state.isInEditMode === false) {
      $("#edit-posts").hide()
    }else{
      $("#edit-posts").show()
    }  if(this.state.isInEditMode === true) {
      $("#edit-thought").hide()
    }   if(this.state.isInCommentMode === false) {
        $("#comment-box").hide()
    }else{
        $("#comment-box").show()
    } if(this.state.firstName !== undefined) {
      console.log(this.state.firstName )
      console.log("true")
      $(".topsection").show()
    }else{
      console.log('false')
      $(".topsection").hide()
    }
   
     return(
         <div >
            <Title/>
            <div className="post-page" data-testid="post-page-test">  
                <div className="container">
                    <button className="gen-btn" onClick={this.randomThought}>Thought Generator</button>
                    <h3 
                        className="thought-area"
                        name="thought"
                        >{this.state.thought}</h3>
                    <form className="form-area" onSubmit={this.submit}>
                    <textarea
                        className="opinion-area"
                        name="opinion"
                        placeholder="What's your opinion"
                        cols="30"
                        rows="3"
                        maxLength="150"
                        value={this.state.opinion}
                        onChange={this.handleChange}>
                    </textarea>                     
                    <input className="submit-btn" type= "submit" value="Submit"/>
                    </form>
                </div>
                    <h2 className="opinion-header">Your Opinions</h2>
                    <div className="edit-container" id="edit-posts">
                        <h4 className="opinion-header"> Edit your post below... </h4>
                        <form className="form-area" onSubmit={this.save}>        
                            <input id="edit-thought" className="edit-opinion-area" type="text" value={this.state.updateThought} onChange={this.handleChange} name="updateThought"/>
                            <textarea
                            name="updateOpinion"
                            placeholder="Change Your mind"
                            className="edit-opinion-area"
                            maxLength="150"
                            value={this.state.updateOpinion}
                            onChange={this.handleChange}>
                            </textarea>
                            <div className="return-btns">
                                <input  className="submit-btn" type="submit" value="Submit"/> 
                                <input className="cancel-btn" type="submit" value="Cancel" onSubmit={this.cancelUpdate}></input>   
                            </div>          
                        </form>
                </div>    
                    <div className="container">
                    {this.displayPosts(this.state.posts)}     
                    </div> 
            </div>
        </div>
     )
   };
};

