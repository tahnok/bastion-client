import React from 'react';
import Websocket from 'react-websocket';
import Packet from './Packet';
import HummingbirdPacket from './HummingbirdPacket';
import './App.css';

const WEBSOCKET_URL = 'ws://192.168.2.16:5678/';

type AppState = {
  packet: HummingbirdPacket | null; // like this
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    // packet: {"flight_number": 17, "packet_number": 41, "received_at": "2019-08-21 13:50:43.240623", "pressure": 101415, "battery_voltage": 4.1572265625, "altitude": 7.649915580799632, temperature: 28.9921}
    packet: null
  }

  handleMessage(raw_packet: string){
    let parsed_packet: HummingbirdPacket = JSON.parse(raw_packet)
    this.setState({packet: parsed_packet})
  }
  
  render() {
    let hasPacket = this.state.packet != null
    return (
      <div>
        <h1 className="title">Bastion</h1>
        {hasPacket ? (
          <div>
            <Packet {...this.state.packet as HummingbirdPacket} />
          </div>
        ) : (
          <p>Connecting...</p>
        )}

        <Websocket url={WEBSOCKET_URL}
              onMessage={this.handleMessage.bind(this)}/>
      </div>
    )
  }
}

export default App;
