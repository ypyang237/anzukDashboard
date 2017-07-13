import React, { Component } from 'react';
import { Grid, PageHeader, Row, Col, Clearfix, Table, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import './App.css';
import SuggestedCandidates from './suggestedCandidates';
import FloatedCandidates from './floatedCandidates';
import UnsuitableCandidates from './unSuitableCandidates';
import Comments from './comments';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roleInfo: {}
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

      this.setState({ roleInfo : json.ReturnObject })
    });
  }



  render() {
    const roleInfoObj = this.state.roleInfo;
    return (
      <div className="App">

      <div className="container-fluid">
        <div style={{padding: '30px 0px 20px 0px'}}>
        <span><strong style={{fontSize: '24px'}}>{this.state.roleInfo.Title}</strong></span>
          <span id="location"><small >{this.state.roleInfo.ClientName} - {this.state.roleInfo.LocationTitle}</small></span><br/>
          <span><small style={{fontSize: '13px'}}>Salary Range: {this.state.roleInfo.SalaryRangeBottom} - {this.state.roleInfo.SalaryRangeTop}</small></span>
        </div>
      </div>

         <div className="container-fluid container-padding-around">
             <Row className="show-grid">
               <Col sm={6} md={3}>

               <Table className="tablebg" bordered hover>
                  <thead>
                      <th><h5>Role Info</h5></th>
                      <th></th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>{roleInfoObj.StatusAsText}</td>
                    </tr>
                    <tr>
                      <td>Start Date</td>
                      <td>{roleInfoObj.StartDate}</td>
                    </tr>
                    <tr>
                      <td>End Date</td>
                      <td></td>
                    </tr>
                    { roleInfoObj.Grades !== undefined &&
                      <tr>
                      <td>Grades</td>
                      <td>
                        {roleInfoObj.Grades[0].Title}, {roleInfoObj.Grades[1].Title}
                      </td>
                    </tr>
                    }

                  </tbody>
                </Table>

                <Table className="tablebg" bordered hover>
                   <thead>
                       <th><h5>Details</h5></th>
                       <th></th>
                   </thead>
                   <tbody>
                     <tr>
                       <td>Main Contact</td>
                       <td>{roleInfoObj.MainContactAsText}</td>
                     </tr>
                     <tr>
                       <td>Category</td>
                       <td>{roleInfoObj.CategoryAsText}</td>
                     </tr>
                     <tr>
                       <td>Sub Category</td>
                       <td>{roleInfoObj.SubCategoryAsText}</td>
                     </tr>
                      <tr>
                       <td>Lead Generator</td>
                       <td>{roleInfoObj.WorkTypeAsText}</td>
                     </tr>
                      <tr>
                       <td>Recruiter</td>
                       <td>{roleInfoObj.RecruiterAdminAsText}</td>
                     </tr>
                      <tr>
                       <td>Job Source</td>
                       <td>{roleInfoObj.JobSourceAsText}</td>
                     </tr>
                      <tr>
                       <td>Priority</td>
                       <td>{roleInfoObj.Priority}</td>
                     </tr>
                     <tr>
                       <td>Rating</td>
                       <td>{roleInfoObj.Rating}</td>
                     </tr>
                     <tr>
                       <td>Reference No</td>
                       <td>{roleInfoObj.Reference}</td>
                     </tr>
                     <tr>
                       <td>Confirmed Salary</td>
                       <td>{roleInfoObj.SalaryConfirmed}</td>
                     </tr>
                   </tbody>
                 </Table>

                 <Table className="tablebg" bordered hover>
                  <thead>
                      <th><h5>Associated Job Posts</h5></th>
                      <th><label className="checkbox-inline" style={{float: 'right', paddingRight: '4px'}}><input type="checkbox" value="" />Show inactive(0)</label></th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>No Records Found </th>
                      <th></th>
                    </tr>
                  </tbody>
                </Table>
               </Col>

               <Col sm={6} md={3}>
                 <Table className="tablebg" bordered hover>
                  <thead>
                      <th><h5>Description</h5></th>
                      <th></th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{roleInfoObj.Description}</th>
                    </tr>
                  </tbody>
                </Table>

               </Col>

               <Clearfix visibleSmBlock></Clearfix>

               <Col sm={6} md={3}>
                <SuggestedCandidates/>
                <UnsuitableCandidates/>
               </Col>

               <Col sm={6} md={3}>
                  <FloatedCandidates />
                  <Comments />
               </Col>
             </Row>
           </div>

      </div>
    );
  }
}

export default App;

