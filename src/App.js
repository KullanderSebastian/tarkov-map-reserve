import React from "react";
import socketIOClient from "socket.io-client";
import "./styles.css";
import map from "./img/reservemap.jpeg"
import Marker from "./components/Marker"

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            markerData: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const socket = socketIOClient("http://localhost:5000");
        socket.on("marker", (arg) => {
            this.setState(prevState => ({
                markerData: [...prevState.markerData, {
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

    render() {
        const markerComponents = this.state.markerData.map((item) => {
            console.log(item.id);
            return <Marker key={item.id} calcY={item.calcY} calcX={item.calcX} />
        })

        return(
            <div>
                <img onClick={this.handleClick} alt="map over reserve" src={map} />
                {markerComponents}
            </div>
        )
    }
}

export default App;
