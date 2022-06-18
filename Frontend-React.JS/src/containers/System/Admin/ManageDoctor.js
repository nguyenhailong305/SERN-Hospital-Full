import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from 'react-select';
import { LANGUAGES } from "../../../utils";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: '',
      description : '',
      listDoctors : [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.allDoctors !== this.props.allDoctors){
      this.setState({
        listDoctors : this.props.allDoctors,
      })
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = []; 
    let { language } = this.props ;
    if(inputData && inputData.length > 0){
      inputData.map((item ,index) => {
        let object = {} ;
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ?  labelVi : labelEn ;
        object.value = item.id;
        result.push(object);

       
      })
     
    }
    return result;
  }
  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({ 
      contentMarkdown: text ,
      contentHTML: html
    })
  }

  handleSaveContentMarkdown = () => {
     console.log('Check State' , this.state);
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption}
    );
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description : event.target.value   
    })
  }


  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin Bác sĩ</div>
        <div className="more-infor">
         
          <div className="content-right">
            <label>Chọn Bác sĩ</label>
            <Select
        Value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
      />
           
          </div>
          <div className="content-left">
            <label >Thông tin giới thiệu : </label>
            <textarea onChange={(event) => this.handleOnChangeDesc(event)} value={this.state.description} className = "form-control" rows="4"></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="save-content-doctor"
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
    allDoctors : state.admin.allDoctors,
    language : state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    fetchAllDoctorRedux : () => dispatch(actions.fetchAllDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
