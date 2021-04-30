import React from "react";
import socketIOClient from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

class Marker extends React.Component {
    constructor() {
        super()
        this.state = {
            display: "",
            color: "rgba(207, 0, 15, 1)"
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        const socket = socketIOClient("http://localhost:5000");
        socket.on("clearSpecificMarker", () => {
            this.setState({display: "none"});
        });

        if (this.props.markerType == "enemy") {
            setTimeout(() => {
                this.setState({display: "none"});
            }, 10000)
        } else if (this.props.markerType == "body") {
            this.setState({color: "rgba(255,215,0, 1)"});
        }
    }

    clickHandler() {
        const socket = socketIOClient("http://localhost:5000");
        socket.emit("clearSpecificMarker", []);
    }

    render() {
        const imageObject = window.document.images[0];
        const top = imageObject.clientHeight * this.props.calcY;
        const left = imageObject.clientWidth * this.props.calcX;

        const mystyle = {
            color: this.state.color,
            top: (top - 8) + "px",
            left: (left - 8) +"px",
            position: "absolute",
            display: this.state.display
        };

        let icon;

        if (this.props.markerType == "enemy") {
            icon = <FontAwesomeIcon
                onClick={this.clickHandler}
                id="markerEnemy"
                style={mystyle}
                icon={faSkull}
            />
        } else if (this.props.markerType == "body") {
            icon = <FontAwesomeIcon
                onClick={this.clickHandler}
                id="markerBody"
                style={mystyle}
                icon={faSkullCrossbones}
            />
        }

        return (
            <div>
                {icon}
            </div>
        )
    }
}

export default Marker;
