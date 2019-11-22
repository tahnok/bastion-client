import React from 'react';
import Websocket from 'react-websocket';
import Packet from './Packet';
import HummingbirdPacket from './HummingbirdPacket';
import './App.css';

type AppState = {
  packet: HummingbirdPacket | null; // like this
  websocket_url: string | null;
  form_websocket_url: string | null;
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state: AppState = {
    // packet: {"flight_number": 17, "packet_number": 41, "received_at": "2019-08-21 13:50:43.240623", "pressure": 101415, "battery_voltage": 4.1572265625, "altitude": 7.649915580799632, temperature: 28.9921}
    packet: null,
    websocket_url: null,
    form_websocket_url: null,
  }

  handleMessage(raw_packet: string){
    let parsed_packet: HummingbirdPacket = JSON.parse(raw_packet)
    this.setState({packet: parsed_packet})
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.setState({websocket_url: this.state.form_websocket_url})
    event.preventDefault()
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({form_websocket_url: event.currentTarget.value})
  }

  componentDidMount() {
    if (this.state.websocket_url === null) {
      const default_websocket_url = `ws://${window.location.hostname}:5678/`
      this.setState({
        websocket_url: default_websocket_url,
        form_websocket_url: default_websocket_url,
      })
    }
  }
  
  render() {
    let hasPacket = this.state.packet != null
    let has_websocket_url = this.state.websocket_url != null
    return (
      <div>
        <h1 className="title">Bastion</h1>
        {hasPacket ? (
          <div>
            <Packet {...this.state.packet as HummingbirdPacket} />
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Server:
               <input type="text" value={this.state.form_websocket_url ? this.state.form_websocket_url : ""} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Connect" />
            </form>
          <p>Connecting...</p>
          </div>
        )}
        {has_websocket_url? (
          <Websocket url={this.state.websocket_url}
              onMessage={this.handleMessage.bind(this)}/>
          ) : null}
      </div>
    )
  }
}

export default App;
