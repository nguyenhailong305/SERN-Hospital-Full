import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {Modal , ModalHeader , ModalFooter ,ModalBody, Button } from "reactstrap"
import {emitter} from '../../utils/emitter'
class ModalUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email : '',
          password : '',
          firstName : '',
          lastName : '',
          address : '',
          phoneNumber : '',
      }
      this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA' ,() => {
      this.setState({
        email : '',
        password : '',
        firstName : '',
        lastName : '',
        address : '',
        phoneNumber : '',
      })
    }) ;
  }
  componentDidMount() {

  }

  toggle = () => {
      this.props.toggleFromParent()
  }

  handleOnChangeInput = (event , id) => {
    //bad code.modify state
    /**
     * this.state = {
     * email: '',
     * password : '' ,
     * 
     * }
     * this.state.email === this.state['email]
     */
    // this.state[id] = event.target.value;
    // this.setState({
    //   /** ... copy state
    //    *     this.state = {
    //       email : '',
    //       password : '',
    //       firstName : '',
    //       lastName : '',
    //       address : '',
    //       phoneNumber : '',
    //       gender : '',
    //       roleId : '',
    //   }
    //    * 
    //    */
    //   ...this.state,
    // }, () => {
    //   console.log('check bad state ' , this.state)
    // })
    //good code 
    let copyState = {...this.state};
    copyState[id] = event.target.value ; 

    this.setState({
      ...copyState
    })  
      console.log(event.target.value , id)
  }

  checkValidateInput() {
    let isValid = true;
    let arrInput = ['email' , 'password' , 'firstName' , 'lastName' , 'address' , 'phoneNumber' ];
    for (let i = 0; i < arrInput.length; i++) {
      if(!this.state[arrInput[i]]) {
        isValid = false;
        alert('Missing parameter ' + arrInput[i]);
        break ;
      }
    }
    return true ;
  }

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if(isValid === true) {
        this.props.createNewUser(this.state);
    }
    console.log('add' , this.state)
  }
  render() {
      console.log('Check props' ,this.props);
      console.log('Check open model' ,this.props.isOpen)
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()}  className={'modal-user-container'} size="lg" centered>
        <ModalHeader toggle={() => this.toggle()} className="modal-title  ">Create a new user</ModalHeader>
        <ModalBody>
      <div className="modal-user-body">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="row g-3" action="/post-user" method="POST">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input name="email" type="email" className="form-control" placeholder="Email" onChange={(event) => this.handleOnChangeInput(event , "email")} value={this.state.email}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input name="password" type="password" className="form-control" placeholder="Password" onChange={(event) => this.handleOnChangeInput(event , "password")} value={this.state.password} />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">First Name</label>
                <input name="firstName" className="form-control" placeholder="First Name" onChange={(event) => this.handleOnChangeInput(event , "firstName")} value={this.state.firstName}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                <input name="lastName" className="form-control" placeholder="Last Name" onChange={(event) => this.handleOnChangeInput(event , "lastName")} value={this.state.lastName}/>
              </div>
              <div className="col-6">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input name="address" type="text" className="form-control" placeholder="1234 Main St" onChange={(event) => this.handleOnChangeInput(event ,"address")} value={this.state.address}/>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">Phone Number</label>
                <input name="phoneNumber" type="text" className="form-control" onChange={(event) => this.handleOnChangeInput(event , "phoneNumber" )} value={this.state.phoneNumber}/>
              </div>
           
            </form>
          </div>
        </div>
        </div>
      </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="px-3" onClick={() => this.handleAddNewUser()}>
           Add New
          </Button>{" "}
          <Button  className="px-3" onClick={() => this.toggle()}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
