import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers  ,createNewUserService , deleteUserService , editUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
import {emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEditUser: {}

    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser:true,
    })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser ,
    })
  }
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser
    })
  }
  
  getAllUsersFromReact = async() => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUser: response.users,
        },
        () => {
          console.log("check state error: ", this.state.arrUser);
        }
      );
      console.log("check state error: ", this.state.arrUser);
    }
    console.log("get user from node : ", response);
  }

  createNewUser = async (data) => {
    try {
       let response = await createNewUserService(data);
       if(response && response.errCode !==0) {
          alert(response.errMessage)
       }else {
          await this.getAllUsersFromReact() ;
          this.setState({
            isOpenModalUser : false
          })
          emitter.emit('EVENT_CLEAR_MODAL_DATA');
       }
    }catch (e) {  
      console.log(e)
    }
    console.log(data);
  }
 
  
  /** Life cycle
   * Run component :
   * 1. Run construct -> init state
   * 2. Did mount (set state)
   * 3. Render component
   *
   */

   handleDeleteUSer =  async(user) => {

      console.log('click here' , user);
      try {
        let res = await deleteUserService(user.id); 
        console.log(res.errCode)
        if(res && res.errCode === 0) {
          await this.getAllUsersFromReact();
        }else {
          alert(res.errMessage);
        }
      }catch (e) {
        console.log(e);
      }
   }

   handleEditUSer = (user) => {
     console.log('check user' ,user);
    this.setState({
      isOpenModalEditUser:true,
      userEdit : user
    })
  }

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if(res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser:false,
        })
        await this.getAllUsersFromReact();
      }else {
        alert(res.errCode)
      }
    }catch(e) {
      console.log(e)
    }
   
    
  }


  render() {
      console.log("check render" ,this.state);
      let arrUser = this.state.arrUser;
    return (
      <div className="users-container">
        <ModalUser 
          isOpen={this.state.isOpenModalUser}
          toggleFromParent = {this.toggleUserModal}
          createNewUser = {this.createNewUser}
        />

    {     
    
    this.state.isOpenModalEditUser &&
    <ModalEditUser
          isOpen = {this.state.isOpenModalEditUser}
          toggleFromParent = {this.toggleUserEditModal}
          currentUser = {this.state.userEdit}
          editUser = {this.doEditUser}
          
        />}
        <div className="title text-center">Manage users </div>
        <div className="mx-1">
          <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}><i className="fas fa-plus"></i> Add new users</button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table className="table mt-3 table-striped   " id="customer">
            <thead>
              <tr className="bg-success text-white">
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            
                  {arrUser && arrUser.map((item, index) => {
                      return(
                          <>
                            <tr>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td>{item.phoneNumber}</td>

                           
                            <td>
                                <button className="btn-edit" onClick={() => this.handleEditUSer(item)}> <i className= "fas fa-pencil-alt"> </i></button>
                                <button className="btn-delete" onClick={() => this.handleDeleteUSer(item)}> <i className= "fas fa-trash"> </i></button>

                            </td>
                            </tr>
                          </>
                      )
                  })
                  }
             
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
