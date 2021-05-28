import React from "react";
import { Link, Redirect } from "react-router-dom";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      showMenu: false,
      enterClickRedirect: false,
    };
    // this.dispDrop = this.dispDrop.bind(this);
    // this.unDispDrop = this.unDispDrop.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.parks,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.parks,
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.parks;
      newList = currentList.filter((park) => {
        const lc = park.name.toLowerCase();
        const filter = e.target.value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.parks;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }

  showMenu(event) {
    console.log("showmenu");
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    debugger;
    if (!this.dropdownMenu) {
      return null;
    }
    if (
      event.target == "search-res-link" ||
      !this.dropdownMenu.contains(event.target)
    ) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  handleEnterClick = (e) => {
    const { filtered } = this.state;
    if (e.key === "Enter") {
      console.log("enter click");
      if (filtered.length > 0) {
        console.log(filtered[0].name);
        this.setState({ enterClickRedirect: true });
      }
      console.log("no items in filter");
    }
  };

  render() {
    const { filtered, enterClickRedirect } = this.state;
    return (
      <div
        onBlur={this.unDispDrop}
        className="silent-click"
        // onClick={() => console.log("click off")}
        className="search-bar-container"
      >
        <div>
          {enterClickRedirect ? (
            <Redirect
              to={{
                pathname: "/explore",
                state: { selectedPlace: filtered[0] },
              }}
            />
          ) : null}
          <input
            ref={(element) => {
              this.dropdownMenu = element;
            }}
            type="text"
            className="search-bar-input"
            onFocus={this.showMenu}
            placeholder="Search by park..."
            // onFocus={this.dispDrop}
            // onBlur={this.unDispDrop}
            onKeyPress={this.handleEnterClick}
          />
          {this.state.showMenu ? (
            <ul
              id="search-res"
              className="search-results-ul"
              // onFocus={this.dispDrop}
              // onBlur={this.unDispDrop}
              // style={{ display: this.state.displayDrop }}
              // display={this.state.displayDrop ? "inline-block" : "none"}
            >
              {this.state.filtered.map((park) => (
                <li key={park._id} className="search-results-li">
                  <Link
                    className="search-res-link"
                    to={{
                      pathname: `/explore`,
                      state: {
                        selectedPlace: park,
                      },
                    }}
                  >
                    {park.name}
                  </Link>
                  <span className="delete" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Search;
