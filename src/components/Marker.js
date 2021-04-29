import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull } from '@fortawesome/free-solid-svg-icons'

class Marker extends React.Component {
    constructor() {
        super()
        this.state = {
            display: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({display: "none"})
            console.log(this.state.display);
        }, 10000)
    }

    render() {
        const imageObject = window.document.images[0];
        const top = imageObject.clientHeight * this.props.calcY;
        const left = imageObject.clientWidth * this.props.calcX;

        const mystyle = {
          color: "#8b0000",
          top: (top - 8) + "px",
          left: (left - 8) +"px",
          position: "absolute",
          display: this.state.display
        };

        return (
            <FontAwesomeIcon id="marker" style={mystyle} icon={faSkull} />
        )
    }
}

export default Marker;
