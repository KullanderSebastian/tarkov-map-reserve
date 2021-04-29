import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faSkullCrossbones, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

class MarkerMenu extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="markerMenu">
                <button onClick={this.props.handler} name="enemy"><FontAwesomeIcon icon={faSkull} /> Enemy</button>
                <button onClick={this.props.handler} name="body"><FontAwesomeIcon icon={faSkullCrossbones} /> Body</button>
                <button><FontAwesomeIcon icon={faMinusCircle} /> Clear marker</button>
                <button><FontAwesomeIcon icon={faTrash} /> Clear all markers</button>
            </div>
        )
    }
}

export default MarkerMenu;
