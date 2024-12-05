"use strict";
import { ref } from "vue";

const wsUrl = "ws://localhost:3002";
let ws = null;
const messages = ref([]);
const connected = ref(false);

export const useWebSocket = () => {
  const connect = () => {
    if (ws) return;

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      connected.value = true;
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        if (messageData && messageData.message) {
          messages.value.push(messageData.message);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      connected.value = false;
      ws = null;
    };
  };

  const disconnect = () => {
    if (ws) {
      ws.close();
      ws = null;
    }
  };

  const sendMsg = (message) => {
    if (ws && connected.value) {
      ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  return { connect, disconnect, sendMsg, messages, connected };
};
