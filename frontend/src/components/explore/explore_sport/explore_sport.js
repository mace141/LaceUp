import React from "react";

import { withRouter, Link } from "react-router-dom";

class ExploreSport extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    debugger;
    this.props.fetchAllEvents();
  }
  // titleize(str) {
  //   if (!str.split) return str;
  //   const _titleizeWord = (string) => {
  //       return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  //     },
  //     result = [];
  //   str.split(" ").forEach((word) => {
  //     result.push(_titleizeWord(word));
  //   });
  //   return result.join(" ");
  // }
  render() {
    return <div>basketball</div>;
  }
}

export default withRouter(ExploreSport);
