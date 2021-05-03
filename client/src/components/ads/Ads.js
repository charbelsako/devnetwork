import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllAds } from "../../actions/adActions";
import Spinner from "../common/Spinner";

export class Ads extends Component {
  constructor(props) {
    super(props);
    this.props.getAllAds();
  }

  render() {
    if (this.props.ads.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="container">
          {this.props.ads.ads.length == 0 ? (
            <h1>There are no job postings</h1>
          ) : (
            this.props.ads.ads.map((ad, index) => (
              <div className="m-5" key={index}>
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <p>Posted by: {ad.user.name}</p>
                <p className="text-grey">Salary: {ad.salary ? ad.salary : "N/A"}</p>
              </div>
            ))
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  ads: state.ads,
});

const mapDispatchToProps = {
  getAllAds,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
