import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Col, Button, Label } from 'react-bootstrap';
import fetch from 'isomorphic-fetch'
import './floatedCandidates.css'

class FloatedCandidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: []
    };
  }

  componentDidMount() {
    fetch('http://interviewtestjson.azurewebsites.net/api/PermRoles')
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
        this.setState({ candidates : json.ReturnObject.FloatedCandidates })
      });
  }


  renderCandidates() {
    let permRole = this.state.candidates.map((candidate) => {
      return (
        <ListGroupItem key={candidate.ID} className={` ${candidate.Status == 3 ? 'RedOverlay' : ""} `}>
          <div className="row align-items-center">
            <Col md={3} className="ImageContainer">
              <img className="ProfilePic" src="https://cdn.shopify.com/s/files/1/1103/6548/products/pocket-evil-rick-pin_e4a56979-8c05-4d4f-ade7-71764660a24e_grande.jpg?v=1490133071" />
            </Col>
            <Col md={9}>
              <div className="row">
                  <span className="Name align-middle">{candidate.FirstName} {candidate.LastName}</span>
              </div>
              <div>
                { candidate.Status === 3 &&
                  <p><Label  style={{position: 'relative', right: '13px'}} bsStyle="danger">Unsuccessful</Label></p>
                }
              </div>
            </Col>
          { candidate.Status !== 3 &&
            <div className="BtnToolbar">
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
            </div>
          }
          { candidate.Status === 3 &&
            <div className="BtnToolbar">
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-repeat" aria-hidden="true"></span></button>
            </div>
          }
          </div>
        </ListGroupItem>
      )
    })


    return (
        <div >
            { permRole }

              <ListGroupItem style={{paddingLeft: '8px'}}>
                <button className="ActionBtn">Float a Candidate</button>
              </ListGroupItem>
        </div>
    )
  }


  render() {

    return (
      <Table>
        <ListGroup>
            <ListGroupItem bsStyle="success" style={{ borderRadius: '0px'}}>
            <span className="glyphicon glyphicon-minus collapseBar"></span>
            Floated Candidates ( {this.state.candidates.length} )
            </ListGroupItem>
            { this.state.candidates.length > 0 &&
              <div>
                {this.renderCandidates()}
              </div>
            }
        </ListGroup>
      </Table>


    )
  }
}


export default FloatedCandidates;