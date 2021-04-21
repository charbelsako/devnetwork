import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllAds } from "../../actions/adActions";

export class Ads extends Component {
  constructor(props) {
    super(props);
    this.props.getAllAds();
  }

  render() {
    if (this.props.ads.loading) {
      return <p>Loading</p>;
    } else {
      return (
        <div>
          {this.props.ads.ads.map(ad => (
            <div class="m-5">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              <p class="text-grey">Salary: {ad.salary ? ad.salary : "N/A"}</p>
            </div>
          ))}
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