import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem, Col, Pagination } from 'react-bootstrap';
import fetch from 'isomorphic-fetch'
import './suggestedCandidates.css'

class SuggestedCandidates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidates: []
    };
  }

  componentDidMount() {
    fetch('http://interviewtestjson.azurewebsites.net/api/SuggestedCandidates')
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
        this.setState({ candidates : json })
      });
  }


  renderCandidates() {
    let potentialCandidate = this.state.candidates.map((candidate) => {
      return (
        <div className="ListGroupItem" key={candidate.ID}>
          <div className="row align-items-center">
            <Col md={3} className="ImageContainer">
              <img className="ProfilePic" src="https://cdn.shopify.com/s/files/1/1103/6548/products/pocket-evil-rick-pin_e4a56979-8c05-4d4f-ade7-71764660a24e_grande.jpg?v=1490133071" />
            </Col>
            <Col md={9}>
              <div className="row">
                  <span className="Name align-middle">{candidate.FirstName} {candidate.LastName}</span>
                  { candidate.Car &&
                    <img className = "Icon align-top" src="http://icons.iconarchive.com/icons/icons8/android/512/Transport-Car-icon.png"/>
                  }

              </div>
              <div className="row">
                <small><span>{candidate.distance}KM From Placement</span></small>
              </div>
              <div className="row">
                { !candidate.DateLastAt &&
                  <small><span>Never Been</span></small>
                }
              </div>
            </Col>
            <div className="BtnToolbar">
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>
              <button className="GlyphiconBtn"><span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
            </div>
          </div>
        </div>
      )
    })


    return (
        <div>
            { potentialCandidate}


              <ListGroupItem style={{paddingLeft: '8px'}}>
                <button className="RefreshBtn" ><img style={{height: '20px', width: '24px'}} src="http://www.endlessicons.com/wp-content/uploads/2012/11/refresh-icon-614x460.png" onClick={this.refresh} /></button>
                <Pagination
                  style={{marginTop: '0px', marginBottom: '0px', marginLeft: '56%', verticalAlign: 'top', float: 'right'}}
                  bsSize="small"
                  items={1}
                  next
                  prev
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect} />
              </ListGroupItem>
        </div>
    )
  }


  render() {

    return (
      <Table>
        <ListGroup>
            <ListGroupItem bsStyle="info" style={{ borderRadius: '0px'}}>
            <span className="glyphicon glyphicon-minus collapseBar"></span>
            Suggested Candidates ( {this.state.candidates.length} )
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


export default SuggestedCandidates;