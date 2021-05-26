import React from "react";
import { withRouter } from "react-router-dom";

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            errors: {},
            date: "",
            location_id: "",
            sport: "",
            team_size: "",
            num_teams: "",
            skill: "",
            type: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this); 
        this.handleErrors = this.handleErrors.bind(this);
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('event[date]', this.state.date);
    //     formData.append('event[location_id]', this.state.location_id);
    //     formData.append('event[sport]', this.state.sport);
    //     formData.append('event[team_size]', this.state.team_size);
    //     formData.append('event[num_teams]', this.state.num_teams);
    //     formData.append('event[skill]', this.state.skill);
    //     this.props.createEvent(formData)
    //         .then(this.props.closeModal);
    // }

    handleSubmit() {
        let event = {
            date: this.state.date,
            // user_id: this.props.currentUser[id],
            location_id: this.state.location_id,
            sport: this.state.sport,
            team_size: this.state.team_size,
            num_teams: this.state.num_teams,
            skill: this.state.skill,
            type: this.state.type,
        };
        debugger
        const { createEvent, closeModal, errors } = this.props;
        createEvent(event)
        .then(() => closeModal());
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
        return (
            <div className="login-form-outer-container">
                <h1>LaceUp</h1> {/* logo goes here */}
                <form
                    className="login-form-inner-container"
                    onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={this.state.date}
                            onChange={this.update("date")}
                            placeholder="Date"/>
                        <br />
                        <input
                            type="text"
                            value={this.state.location_id}
                            onChange={this.update("location_id")}
                            placeholder="Location"/>
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
                        <input
                            type="text"
                            value={this.state.skill}
                            onChange={this.update("skill")}
                            placeholder="Skill level" />
                        <br />
                        <button type="submit">
                            Create Event
                        </button>
                        {this.handleErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EventForm);


