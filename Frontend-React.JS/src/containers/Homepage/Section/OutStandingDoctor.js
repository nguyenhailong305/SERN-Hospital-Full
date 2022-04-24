import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-outStanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
              </div>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Sức khỏe tâm thần</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Sức khỏe tâm thần</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Sức khỏe tâm thần</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Sức khỏe tâm thần</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-image section-outStanding-doctor" />
                  </div>
                  <div className="position text-center">
                    <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                    <div>Sức khỏe tâm thần</div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
