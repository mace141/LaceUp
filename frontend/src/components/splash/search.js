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

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.parks.concat(this.props.sports),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.parks.concat(nextProps.sports),
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.parks.concat(this.props.sports);
      newList = currentList.filter((item) => {
        // debugger;
        let lc;
        typeof item == "object"
          ? (lc = item.name.toLowerCase())
          : (lc = item.toLowerCase());
        let filter = e.target.value.toLowerCase();

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
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
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
      if (filtered.length > 0) {
        this.setState({ enterClickRedirect: true });
      }
    }
  };

  render() {
    const { filtered, enterClickRedirect } = this.state;
    let keyIdx = 0;
    return (
      <div className="silent-click">
        <div className="splash-header-container">
          <h1 className="app-header">Pickup sports, reimagined.</h1>
          <h1 className="app-header-two first">
            Join today to find local sporting events that need <span>you</span>{" "}
            on their team.
          </h1>
          <h1 className="app-header-three">
            Sign up, meet up,{" "}
            <content className="app-header-content">LaceUp.</content>
          </h1>
          <h1 className="app-header-two"></h1>
        </div>
        <br />
        <div
          onBlur={this.unDispDrop}
          className="silent-click"
          className="search-bar-container"
        >
          <div>
            {(() => {
              if (enterClickRedirect) {
                // debugger;
                if (typeof filtered[0] == "object") {
                  return (
                    <Redirect
                      to={{
                        pathname: "/explore",
                        state: { selectedPlace: filtered[0] },
                      }}
                    />
                  );
                } else {
                  return (
                    <Redirect
                      to={{
                        pathname: `/explore/${filtered[0]}`,
                      }}
                    />
                  );
                }
              } else {
                return null;
              }
            })()}

            <input
              ref={(element) => {
                this.dropdownMenu = element;
              }}
              type="text"
              className="search-bar-input"
              onChange={this.handleChange}
              onFocus={this.showMenu}
              placeholder="Search by park or sport..."
              onKeyPress={this.handleEnterClick}
            />
            {this.state.showMenu ? (
              <ul id="search-res" className="search-results-ul">
                {this.state.filtered.map((item) => {
                  keyIdx += 1;
                  return (
                    <li key={keyIdx} className="search-results-li">
                      {typeof item == "object" ? (
                        <Link
                          className="search-res-link"
                          to={{
                            pathname: `/explore`,
                            state: {
                              selectedPlace: item,
                            },
                          }}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          <Link
                            className="search-res-link"
                            to={{
                              pathname: `/explore/${item.toLowerCase()}`,
                            }}
                          >
                            {item}
                          </Link>
                        </>
                      )}
                      <span className="delete" />
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
