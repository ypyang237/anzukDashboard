import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Col, Button, Label } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import './comments.css';
var moment = require('moment');

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    fetch('http://interviewtestjson.azurewebsites.net/api/Comments')
    .then((response) => {
        if (response.status >= 400) {
          return response.json()
        }
        return response.json()
      })
      .then((json) => {

        if(json.error !== undefined) {
          console.log('err', json.error)
        }

        this.setState({ comments : json.Comments })

      });
  }

  renderComments() {
    let author = '';
    let commentsDisplay = this.state.comments.map((comment) => {
      let timeStamp = eval(comment.DateCreated.replace(/[/\/]/g, '').substring(0));
      return (
        <div className="row no-gutter" key={comment.ID} >
          <Col md={5} className="margin-left-sm">
            <p className="word-spacing-sm" style={{fontSize: '12px', WebkitMarginAfter: '0px'}}>{moment(timeStamp).fromNow()}</p>
            <small>{`${author = comment.AddedBy.split("\\")[1]}`}</small>
          </Col>
          <Col md={1}>
            <img className="processIcon" src="https://cdn.shopify.com/s/files/1/1103/6548/products/pocket-evil-rick-pin_e4a56979-8c05-4d4f-ade7-71764660a24e_grande.jpg?v=1490133071" />
          </Col>
          <Col md={5}>
            <p className="commentText">{comment.CommentText}</p>
          </Col>
        </div>
      )
    })

    return (
      <div >
        {commentsDisplay}
      </div>
    )
  }

  render() {
    return (
      <Table className="tablebg">
        <ListGroup>
          <ListGroupItem  style={{borderRadius: '0px'}}>Comments</ListGroupItem>
          <Col md={12} style={{paddingLeft: '8px'}}>
            <div class="form-group">
              <textarea class="form-control" rows="2" id="comment" style={{width: '100%', marginTop: '8px'}}></textarea>
              <button className="ActionBtn" style={{marginLeft: '9px', marginTop: '10px'}}>Save Comment</button>
            </div>
          </Col>
        { this.state.comments.length > 0 &&
          <div>
            <Col md={12}>
            {this.renderComments()}
            </Col>
          </div>
        }
        </ListGroup>
      </Table>
    )
  }
}

export default Comments;