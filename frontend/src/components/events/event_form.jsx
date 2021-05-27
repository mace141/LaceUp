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
        
        const { createEvent, closeModal, receiveEvent, dispatch, history } = this.props;
        
        createEvent(event).then(payload => {
            dispatch(receiveEvent(payload));
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
                <h1 className="modal-singin">Create Event!</h1>
                <div onClick={this.props.closeModal} className="close-x">x</div>
                <p className="modal-two-slogan">Customize an event for local sport-goers to join</p>
                <br />
                <form
                    className="login-form-inner-container"
                    onSubmit={this.handleSubmit}>
                    <div>
                        <div className="modal-drop">
                        <label className="modal-label">Date/Time</label>
                        <br/>
                        <input
                            className="modal-date-input"
                            type="date"
                            value={this.state.day}
                            onChange={this.update("date")}/>
                        <input 
                            className="modal-time-input"
                            type="time" 
                            value={this.state.time} 
                            onChange={this.update('time')}/>
                        </div>
                        <div className="modal-drop">
                            <label className="modal-label">Team size:</label>
                            <br />
                            <select className="modal-dropdown-number" onChange={this.update('team_size')}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <section className="modal-input-space"></section>
                        <br />
                        <div className="modal-drop">
                            <label className="modal-label">Location:</label>
                            <br />
                            <select className="modal-dropdown-park" onChange={this.update('location_id')}>
                                {parks.map(park => (
                                    <option value={park._id}>{park.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* <br /> */}
                        <div className="modal-drop">
                            <label className="modal-label">Sport:</label>
                            <br />
                            <select className="modal-dropdown-sport" onChange={this.update('sport')}>
                                <option value="Basketball">Basketball</option>
                                <option value="Soccer">Soccer</option>
                                <option value="Football">Football</option>
                                <option value="Tennis">Tennis</option>
                                <option value="Baseball">Baseball</option>
                                <option value="Frisby">Frisby</option>
                                <option value="Running">Running</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Volleyball">Volleyball</option>
                                <option value="Workout">Workout</option>
                            </select>
                        </div>
                        <section className="modal-input-space"></section>
                        <br />
                        <div className="modal-drop">
                            <label className="modal-label">Num Teams:</label>
                            <br />
                            <select className="modal-dropdown-numteams" onChange={this.update('num_teams')}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="modal-drop">
                            <label className="modal-label">Skill:</label>
                            <br />
                            <select className="modal-dropdown-skill" onChange={this.update('skill')}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                                <option value="Professional">Professional</option>
                            </select>
                        </div>
                        <div className="modal-drop">
                            <label className="modal-label">Type:</label>
                            <br />
                            <select className="modal-dropdown-type" onChange={this.update('type')}>
                                <option value="Want to win">Want to win</option>
                                <option value="Competitive">Competitive</option>
                                <option value="Casual">Casual</option>
                                <option value="Just to exercise">Just to exercise</option>
                                <option value="Beer at halftime">Beer at halftime</option>
                            </select>
                        </div>
                        <br />
                    </div>
                    <input className="modal-login-four" type="submit" value="Create Event" />
                </form>
            </div>
        );
    }
}

export default withRouter(EventForm);


