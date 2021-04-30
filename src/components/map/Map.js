import React, {useContext} from "react";
import {SocketContext} from "../../context/socket";
import "./../../styles.css";
import map from "./../../img/reservemap.jpeg";
import Marker from "./Marker";
import MarkerMenu from "./MarkerMenu";

class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            markerType: "enemy",
            markerData: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.markerHandler = this.markerHandler.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
    }

    static contextType = SocketContext;

    componentDidMount() {
        this.context.on("marker", (arg) => {
            this.setState(prevState => ({
                markerData: [...prevState.markerData, {
                    markerType: this.state.markerType,
                    id: prevState.markerData.length + 1,
                    calcY: arg[0],
                    calcX: arg[1]
                }]
            }))
        });

        this.context.on("changeMarker", (arg) => {
            if (arg == "enemy") {
                this.setState({markerType: "enemy"});
            } else if (arg == "body") {
                this.setState({markerType: "body"});
            }
        });

        this.context.on("clearMarkers", () => {
            this.setState({markerData: []});
        });
    }

    handleClick(event) {
        const imageObject = window.document.images[0];
        const calcY = event.pageY / imageObject.clientHeight;
        const calcX = event.pageX / imageObject.clientWidth;

        this.context.emit("marker", [
            calcY,
            calcX
        ]);
    }

    markerHandler(event) {
        this.context.emit("changeMarker", event.target.name);
    }

    clearMarkers() {
        this.context.emit("clearMarkers", []);
    }

    render() {
        const markerComponents = this.state.markerData.map((item) => {
            return <Marker
                key={item.id}
                markerType={item.markerType}
                calcY={item.calcY}
                calcX={item.calcX}
             />
        })

        return(
            <div>
                <img onClick={this.handleClick} alt="map over reserve" src={map} />
                <MarkerMenu handler={this.markerHandler} clearHandler={this.clearMarkers} />
                {markerComponents}
            </div>
        )
    }
}

export default Map;
