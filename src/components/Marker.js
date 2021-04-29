import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'

class Marker extends React.Component {
    constructor() {
        super()
        this.state = {
            display: "",
            color: "rgba(207, 0, 15, 1)"
        }
    }

    componentDidMount() {
        if (this.props.markerType == "enemy") {
            setTimeout(() => {
                this.setState({display: "none"})
            }, 10000)
        } else if (this.props.markerType == "body") {
            this.setState({color: "rgba(255,215,0, 1)"})
        }
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
            icon = <FontAwesomeIcon id="markerEnemy" style={mystyle} icon={faSkull} />
        } else if (this.props.markerType == "body") {
            icon = <FontAwesomeIcon id="markerBody" style={mystyle} icon={faSkullCrossbones} />
        }

        return (
            <div>
                {icon}
            </div>
        )
    }
}

export default Marker;
