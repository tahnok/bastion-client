type HummingbirdPacket = {
  flight_number: number;
  packet_number: number;
  received_at: string;
  pressure: number;
  battery_voltage: number;
  altitude: number;
  temperature: number;
}

export default HummingbirdPacket;