import React from "react";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.parks,
    };
  }

  render() {
    // debugger;
    return (
      <div className="search-container">
        <div className="container">
          <section className="section">
            <ul>
              {this.state.list.map((item) => (
                <li key={item}>{item.name}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
