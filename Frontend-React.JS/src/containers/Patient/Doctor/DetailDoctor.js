import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Homepage/HomeHeader'; 
import './DetailDoctor.scss'
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            
        }
    }

    componentDidUpdate(prevProps, prevState , snapshot){

    }
    render() {
    
        return (
            <Fragment>
                  <HomeHeader isShowBanner={false}/>
            <div className="doctor-detail-container">
                <div className="intro-doctor">
                    <div className="content-left"></div>
                    <div className="content-right">
                        <div className="up">

                        </div>
                        <div className="down"></div>
                    </div>
                </div>
                <div className="schedule-doctor"></div>
                <div className="detail-infor-doctor"></div>
                <div className="comment-doctor"></div>
            </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
