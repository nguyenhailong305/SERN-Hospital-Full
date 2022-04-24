import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2021 Lập trình với HLong. More Information , please visit my
          channel{" "}
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UC5LY07nvfW91roPAraLW8TQ"
          >
            {" "}
            &#8594; Click here &#8594;
          </a>{" "}
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
