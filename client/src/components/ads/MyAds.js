import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserAds } from "../../actions/adActions";

export class MyAds extends Component {
  constructor(props) {
    super(props);
    this.props.getUserAds();
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

const mapDispatchToProps = { getUserAds };

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);
