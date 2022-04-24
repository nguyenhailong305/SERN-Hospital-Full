import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      // roleArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getGenderSuccess();
    this.props.getGenderFailed();
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
  componentDidUpdate(prevProps, prevState , snapshot) {
    if(prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr : this.props.genderRedux
      })
    }
  }
  render() {
    console.log("check state ", this.state);
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
  
    return (
      <div className="user-redux-container">
        <div className="title">User Redux For Big Project</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 text-bold">
                <FormattedMessage id="manager-user.add" />
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
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label htmlFor="inputPassword4" className="form-label">
                    <FormattedMessage id="manager-user.firstname" />{" "}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
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
                  />
                </div>
                <div class="form-group col-md-6 mt-2">
                  <label for="inputState">
                    <FormattedMessage id="manager-user.position" />
                  </label>
                  <select id="inputState" class="form-control">
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select id="inputState" class="form-control">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select id="inputState" class="form-control">
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index}>
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
                  <select id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux : state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getGenderSuccess: () => dispatch(actions.fetchGenderSuccess()),
    getGenderFailed: () => dispatch(actions.fetchGenderFailed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
