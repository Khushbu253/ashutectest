import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startDate: '',
            endDate: '',
            isDate: false,
            location: '',
            email: '',
            guestname:'',
            description: '',
            startTime: '',
            endTime: '',
            tableData: []
        };
    }
    componentDidMount() {
        const storedEvnet = JSON.parse(localStorage.getItem('events'));
        if (storedEvnet) {
            this.setState({ tableData: storedEvnet })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateForm()) {
            const formData = {
                title: this.state.title,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                email: this.state.email,
                guestname: this.state.guestname
            }
          
            let events = this.state.tableData;
            events.push(formData);

            localStorage.setItem('events', JSON.stringify(events));
            this.setState({ tableData: events });
            
            
        }
    };
   
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name === "isDate") {
            this.setState({ [name]: !this.state.isDate });
        } else {
            this.setState({ [name]: value });
        }
    };

    validateForm = () => {
        return (
            this.state.title !== '' &&
            this.state.startDate !== '' &&
            this.state.endDate !== '' &&
            this.state.email !== '' &&
            this.state.guestname !== '' &&
            this.state.description !== '' &&
            this.state.location !== ''
        );
    };

        

    render() {
        console.log(this.state)
        return (
            <div className="wrapper">
                <div>
                    <div className="form-wrapper">
                        <h1>Create Event</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="title">
                                <label htmlFor="title">Event Title</label>
                                <input
                                    placeholder="Event Title"
                                    type="text"
                                    name="title"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="start">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="end">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="isDate"
                                    onChange={this.handleChange}
                                    value={this.state.isDate}
                                />
                                <label htmlFor="endDate">All The Day</label>
                            </div>

                            {this.state.isDate && (
                                <>
                                    <div className="start">
                                        <label htmlFor="startTime">Start Time</label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="end">
                                        <label htmlFor="endTime">End Time</label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="email">
                                <label for="location">Location:</label>
                                <select className="locationSelect" name="location" onChange={this.handleChange} id="location">
                                    <option value="">Select Location</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Ahemdabad">Ahemdabad</option>
                                    <option value="Baroda">Baroda</option>
                                    <option value="Surat">Surat</option>
                                </select>
                            </div>
                            
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="Enter Email"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="title">
                                <label htmlFor="title">Guest Name</label>
                                <input
                                    placeholder="Guest NAme"
                                    type="text"
                                    name="guestname"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="email">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    placeholder="Description..."
                                    type="textarea"
                                    name="description"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="createEvent">
                                <button disabled={!this.validateForm()} type="submit" >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    {this.state.tableData.length > 0 &&
                        (<div className="event">
                            <h2>Events</h2>
                           <table>
                                <tr>
                                    <th>Title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Email</th>
                                    <th>Guest Name</th>
                                </tr>

                                {this.state.tableData.map((event, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{event.title}</td>
                                            <td>{event.startDate}</td>
                                            <td>{event.endDate}</td>
                                            <td>{event.email}</td>
                                            <td>{event.guestname}</td>
                                        </tr>
                                    )
                                })}

                            </table>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default App;
