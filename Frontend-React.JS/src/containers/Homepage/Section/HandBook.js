import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handBook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section"> Tất cả bài viết </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Sức khỏe tâm thần</div>
                </div>
              </div>
              <div className="section-customize">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                </div>
              </div>
              <div className="section-customize">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                </div>
              </div>
              <div className="section-customize">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                </div>
              </div>
              <div className="section-customize">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                </div>
              </div>
              <div className="section-customize ">
                <div className="outer-bg">
                  <div className="bg-image  section-handBook" />
                </div>
                <div className="position text-center">
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
                  <div>Bác sĩ Chuyên khoa II Trần Minh Khuyên</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
