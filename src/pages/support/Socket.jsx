import io from "socket.io-client";
const baseUrl = "https://vipblackbets.ozzo.az";

const socket = io(baseUrl, {
  transports: ["websocket", "polling"],
  secure: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  autoConnect: true,
  agent: false,
  upgrade: true,
  rejectUnauthorized: false,
});

socket.on("connect_error", (error) => {
  console.error("Bağlantı hatası:", error);
});

socket.on("error", (error) => {
  console.error("Socket hatası:", error);
});

socket.on("connect", () => {
  console.log("Başarıyla bağlandı!");
});

export default socket;
