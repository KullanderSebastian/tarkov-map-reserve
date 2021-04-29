import React from "react";
import socketIOClient from "socket.io-client";
import "./styles.css";
import map from "./img/reservemap.jpeg"
import Marker from "./components/Marker"
import MarkerMenu from "./components/MarkerMenu"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            markerType: "enemy",
            markerData: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.markerHandler = this.markerHandler.bind(this);
    }

    componentDidMount() {
        const socket = socketIOClient("http://localhost:5000");
        socket.on("marker", (arg) => {
            this.setState(prevState => ({
                markerData: [...prevState.markerData, {
                    markerType: this.state.markerType,
                    id: prevState.markerData.length + 1,
                    calcY: arg[0],
                    calcX: arg[1]
                }]
            }))
        });
    }

    handleClick(event) {
        const imageObject = window.document.images[0];
        const calcY = event.pageY / imageObject.clientHeight;
        const calcX = event.pageX / imageObject.clientWidth;

        const socket = socketIOClient("http://localhost:5000");
        socket.emit("marker", [
            calcY,
            calcX
        ]);
    }

    markerHandler(event) {
        if (event.target.name == "enemy") {
            this.setState({markerType: "enemy"});
        } else if (event.target.name == "body") {
            this.setState({markerType: "body"});
        }
    }

    render() {
        const markerComponents = this.state.markerData.map((item) => {
            return <Marker key={item.id} markerType={item.markerType} calcY={item.calcY} calcX={item.calcX} />
        })

        return(
            <div>
                <img onClick={this.handleClick} alt="map over reserve" src={map} />
                <MarkerMenu handler={this.markerHandler} />
                {markerComponents}
            </div>
        )
    }
}

export default App;
