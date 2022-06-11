import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES , CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";


class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImgUrl: [],
      isOpen: false,
      isUserCreated: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userEditId : "",
      action:''
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.props.dispatch(actions.fetchGenderStart());
    // try {
    //   let res = await getAllCodeService('gender','role');
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //       roleArr : res.data
    //     });
    //   }
    //   console.log("alo alo", res);
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles  = this.props.roleRedux ;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
        position:arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
        avatar: "",
        action : CRUD_ACTIONS.CREATE,
        previewImgUrl : '',
       
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); 
      console.log('Check image ' , base64);
      let objectUrl = URL.createObjectURL(file);
      
      this.setState({
        previewImgUrl: objectUrl,
        avatar : base64
      });
      console.log("nguyen long ", objectUrl);
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return ;


    let {action} = this.state;

    if(action === CRUD_ACTIONS.CREATE) {

      this.setState({
        ...this.state,
        isUserCreated: false,
      });
      
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if(action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id : this.state.userEditId ,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
        // avatar: this.state.avatar
      });
    }
      setTimeout(() => {
      this.props.fetchUserRedux();
    }, 1000);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("The input is require " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    // email: '',
    // password: '',
    // firstName: '',
    // lastName: '',
    // phoneNumber: '',
    // address: '',
    // gender: '',
    // position : '',
    // role : '',
    // avatar : '',
  };


  handleEditUserFromParent = (user) => {
     console.log('hoidanit check handle user from parent' , user);  
     let imageBase64 = '' ;
     if(user.image) {
        imageBase64 = new Buffer(user.image , 'base64').toString('binary');
     }
     this.setState({
      email: user.email,
      password: 'HARDCODE',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position:user.positionId,
      role: user.roleId,
      action : CRUD_ACTIONS.EDIT,
      userEditId : user.id , 
      avatar :'',
      previewImgUrl : imageBase64  
    }); 
  }
  render() {
    let isGetGenders = this.props.isLoadingGender;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;

    let { email, password, firstName, lastName, address, phoneNumber , position , gender  , role , avatar} =
      this.state;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux For Big Project</div>

        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 text-bold">
                <FormattedMessage id="manager-user.add" />
                <div className="col-12 text-bold">
                  {isGetGenders === true ? "Loading gender" : ""}
                </div>
              </div>
              <form className="row g-3">
                <div className="col-md-6 mt-2">
                  <label htmlFor="inputEmail4" className="form-label">
                    <FormattedMessage id="manager-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                     
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label htmlFor="inputPassword4" className="form-label">
                    <FormattedMessage id="manager-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    value={password}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                      
                    }}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label htmlFor="inputPassword4" className="form-label">
                    <FormattedMessage id="manager-user.firstname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                  />
                </div>
                <div className="col-6 mt-2">
                  <label htmlFor="inputAddress" className="form-label">
                    <FormattedMessage id="manager-user.lastname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                  />
                </div>
                <div className="col-6 mt-2">
                  <label htmlFor="inputAddress" className="form-label">
                    <FormattedMessage id="manager-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phoneNumber");
                    }}
                  />
                </div>
                <div className="col-6 mt-2">
                  <label htmlFor="inputAddress" className="form-label">
                    <FormattedMessage id="manager-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
                <div class="form-group col-md-6 mt-2">
                  <label for="inputState">
                    <FormattedMessage id="manager-user.position" />
                  </label>
                  <select
                   value={position}
                    id="inputState"
                    class="form-control"
                   
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}

                    <option>...</option>
                  </select>
                </div>
                <div class="form-group col-md-4 mt-2">
                  <label for="inputState">
                    <FormattedMessage id="manager-user.gender" />
                  </label>
                  <select
                    id="inputState"
                    class="form-control"
                    value={gender}
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}

                    <option>...</option>
                  </select>
                </div>

                <div class="form-group col-md-4 mt-2">
                  <label for="inputState">
                    <FormattedMessage id="manager-user.role" />
                  </label>
                  <select
                    id="inputState"
                    class="form-control"
                    value={role}
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}

                    <option>...</option>
                  </select>
                </div>

                <div class="form-group col-md-4 mt-2">
                  <label for="inputState">
                    <FormattedMessage id="manager-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImgUrl})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>

                <div className="col-12">
                  <button
                   type = "button"  
                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? 
                    <FormattedMessage id="manager-user.edit" />
                    : 
                    <FormattedMessage id="manager-user.save" />

  }
                  </button>
                </div>
                <div className="col-12 mb-5">
                  <TableManageUser  
                  handleEditUserFromParentKey={this.handleEditUserFromParent} 
                  action={this.state.action }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <ReactImageLightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux : (data) => dispatch(actions.editUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
