import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it'; 
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);    
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUsers = (user) => {
    this.props.deleteUserRedux(user.id);
  }

  handleEditUsers = (user) => {
    this.props.handleEditUserFromParentKey(user);
  }
  render() {
    console.log("hoidanit check all users", this.props.listUsers);
    console.log("hoidanit check state", this.state.usersRedux);
    let arrUser = this.state.usersRedux;
    return (
      <React.Fragment>
      <table className="table mt-3 table-striped   " id="TableManageUser">
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
          {arrUser &&
            arrUser.length > 0 &&
            arrUser.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>

                  <td>
                    <button type="button" className="btn-edit"
                    onClick={() => this.handleEditUsers(item)}>
           
                      <i className="fas fa-pencil-alt"> </i>
                    </button>
                    <button type="button" className="btn-delete" onClick={() => this.handleDeleteUsers(item)}>
    
                      <i className="fas fa-trash"> </i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
          <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
          </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux : (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
