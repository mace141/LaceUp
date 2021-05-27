import React from "react";
import { withRouter } from "react-router-dom";

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            errors: {},
            location_id: "",
            sport: "",
            team_size: "",
            num_teams: "",
            skill: "",
            type: "",
            date: "",
            time: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this); 
        this.handleErrors = this.handleErrors.bind(this);
    }

    componentDidMount() {
        this.props.fetchParks();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let event = {
            date: `${this.state.date}T${this.state.time}`,
            user_id: this.props.currentuser.id,
            location_id: this.state.location_id,
            sport: this.state.sport,
            team_size: this.state.team_size,
            num_teams: this.state.num_teams,
            skill: this.state.skill,
            type: this.state.type,
        };
        
        const { 
            createEvent, closeModal, receiveEvent, createTeam, dispatch, history 
        } = this.props;
        
        createEvent(event).then(payload => {
            dispatch(receiveEvent(payload));
            let team;
            for (let i = 0; i < payload.data.num_teams; i++) {
                debugger
                team = {
                    player_id: [],
                    name: `Team ${i + 1}`,
                    numPlayers: payload.data.team_size,
                    playersToFill: 0,
                    event_id: payload.data._id
                }
                createTeam(team);
            }
            closeModal();
            history.push(`/events/${payload.data._id}`)
        });

    }


    update(field) {
        return (e) =>
            this.setState({
                [field]: e.currentTarget.value,
            });
    }

    handleErrors() {
        if (this.props.errors.length !== 0) this.props.renderErrors()
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>{this.state.errors[error]}</li>
                ))}
            </ul>
        );
    }

    render() {
        const parks = Object.values(this.props.parks);
        
        return (
            <div className="login-form-outer-container">
                <h1>LaceUp</h1> {/* logo goes here */}
                <form
                    className="login-form-inner-container"
                    onSubmit={this.handleSubmit}>
                    <div>
                        <label>Date/Time</label>
                        <br/>
                        <input
                            type="date"
                            value={this.state.day}
                            onChange={this.update("date")}/>
                        <input 
                            type="time" 
                            value={this.state.time} 
                            onChange={this.update('time')}/>
                        <br />
                        <select onChange={this.update('location_id')}>
                            {parks.map(park => (
                                <option value={park._id}>{park.name}</option>
                            ))}
                        </select>
                        <br />
                        <input
                            type="text"
                            value={this.state.sport}
                            onChange={this.update("sport")}
                            placeholder="Sport" />
                        <br />
                        <input
                            type="text"
                            value={this.state.team_size}
                            onChange={this.update("team_size")}
                            placeholder="Team size" />
                        <br />
                        <input
                            type="text"
                            value={this.state.num_teams}
                            onChange={this.update("num_teams")}
                            placeholder="Number of teams" />
                        <br />
                        <input
                            type="text"
                            value={this.state.type}
                            onChange={this.update("type")}
                            placeholder="Type" />
                        <br />
                        <select onChange={this.update('skill')}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                            <option value="Professional">Professional</option>
                        </select>
                        <br />
                        <button>
                            Create Event
                        </button>
                        {/* {this.handleErrors()} */}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EventForm);


