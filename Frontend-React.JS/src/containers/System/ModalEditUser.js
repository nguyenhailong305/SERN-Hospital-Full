import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {
      let user = this.props.currentUser;
      console.log('did mount edit modal' , this.props.currentUser);
      if(user && !_.isEmpty(user)){
          this.setState({
              id : user.id,
              email: user.email,
              password: 'harcode',
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phoneNumber: user.phoneNumber
          })
      }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
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
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
    console.log(event.target.value, id);
  };

  checkValidateInput() {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return true;
  }

  handleEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };
  render() {
    console.log("Check props", this.props);
    console.log("Check open model", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()} className="modal-title  ">
          Edit a user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <form className="row g-3" action="/post-user" method="POST">
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                        value={this.state.email}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputPassword4" className="form-label" >
                        Password
                        
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "password")
                        }
                        value={this.state.password}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputPassword4" className="form-label">
                        First Name
                      </label>
                      <input
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "firstName")
                        }
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputPassword4" className="form-label">
                        Last Name
                      </label>
                      <input
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "lastName")
                        }
                        value={this.state.lastName}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="inputAddress" className="form-label">
                        Address
                      </label>
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="1234 Main St"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "address")
                        }
                        value={this.state.address}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">
                        Phone Number
                      </label>
                      <input
                        name="phoneNumber"
                        type="text"
                        className="form-control"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "phoneNumber")
                        }
                        value={this.state.phoneNumber}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleEditUser()}
          >
            Save changes
          </Button>{" "}
          <Button className="px-3" onClick={() => this.toggle()}>
            Close
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
