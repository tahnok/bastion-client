import React from 'react';
import './Packet.css';
import HummingbirdPacket from './HummingbirdPacket';

class Packet extends React.Component<HummingbirdPacket, {}> {
    render() {
        const parsed_time = new Date(this.props.received_at).toLocaleTimeString();
        return (
            <div>
                <div className="top">
                    <h2>Current Altitude:</h2>
                    <h1>{this.props.altitude.toFixed(1)}m</h1>
                </div>
                <div className="extra">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Pressure</td>
                            <td>{this.props.pressure}mPa</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{this.props.temperature.toFixed(1)}C</td>
                        </tr>
                        <tr>
                            <td>Flight Number</td>
                            <td>{this.props.flight_number}</td>
                        </tr>
                        <tr>
                            <td>Packet Number</td>
                            <td>{this.props.packet_number}</td>
                        </tr>
                        <tr>
                            <td>Battery Voltage</td>
                            <td>{this.props.battery_voltage.toFixed(1)}V</td>
                        </tr>
                        <tr>
                            <td>Received At</td>
                            <td>{parsed_time}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Packet;