import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              Truyền thông nói về BookingCare
            </span>
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="560"
                height="315"
                title="BookingCare trên VTV1"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Hiện nay, người bệnh đi khám theo cách truyền thống có thể phải
                mất đến 3-4 giờ đồng hồ để xếp hàng làm thủ tục,vẫn chưa có một giải pháp
                thực sự hiệu quả giúp phân bổ nguồn nhân lực, vật lực, thời gian
                để giải quyết được vấn đề quá tải bệnh nhân. 

                BookingCare là nền tảng tập trung vào việc đặt khám chuyên
                khoa, kết nối bệnh nhân với bác sĩ, cơ sở y tế và giúp trải
                nghiệm đi khám của người bệnh được tốt hơn, hiệu quả hơn.
                 Đồng
                thời, góp phần giải quyết vấn đề quá tải của các bệnh viện hiện
                nay. 
                Nền tảng này được xây dựng đơn giản, dễ sử dụng, phản ánh
                hành trình đi khám thực tế của người bệnh. Tập trung vào nhóm
                bệnh chuyên khoa, không có tính chất cấp cứu, bệnh mãn tính,
                những người biết rõ tình trạng bệnh của mình và chủ động sắp xếp
                kế hoạch đi khám.
              </p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
