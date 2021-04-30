import React from "react";
import Map from "./components/map/Map";
import {SocketContext, socket} from "./context/socket.js";

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Map />
        </SocketContext.Provider>
    )
}

export default App;
