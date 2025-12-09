import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import "./RealTimeTeaching.css";

const RealTimeTeachingPage = () => {
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const isUnmountedRef = useRef(false);

  const [processedFrame, setProcessedFrame] = useState(null);
  const [status, setStatus] = useState("Waiting...");
  const [focus, setFocus] = useState(0);
  const [alarm, setAlarm] = useState(false);

  const alarmRef = useRef(new Audio("/alarm.mp3"));

  // -------------------------------------------------------
  // COMPONENT MOUNT / UNMOUNT
  // -------------------------------------------------------
  // -------------------------------------------------------
  // COMPONENT MOUNT / UNMOUNT
  // -------------------------------------------------------
  useEffect(() => {
    isUnmountedRef.current = false;
    startWebcam();
    connectWebSocket();

    return () => {
      console.log("🛑 Cleaning up camera + websocket...");
      isUnmountedRef.current = true;

      // ---- STOP ALARM ----
      stopAlarm();

      // ---- STOP CAMERA ----
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        console.log(`Stopping ${tracks.length} camera track(s)`);
        tracks.forEach((track) => {
          track.stop();
          console.log(`✅ Stopped track: ${track.kind}`);
        });
        videoRef.current.srcObject = null;
      }

      // ---- CLOSE WEBSOCKET ----
      if (wsRef.current) {
        if (wsRef.current.readyState === WebSocket.OPEN || 
            wsRef.current.readyState === WebSocket.CONNECTING) {
          wsRef.current.close();
          console.log("✅ WebSocket closed");
        }
        wsRef.current = null;
      }
    };
  }, []);

  // -------------------------------------------------------
  // START CAMERA
  // -------------------------------------------------------
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied!");
      console.error(err);
    }
  };

  // -------------------------------------------------------
  // CONNECT WEBSOCKET
  // -------------------------------------------------------
  const connectWebSocket = () => {
    wsRef.current = new WebSocket("ws://localhost:5003");

    wsRef.current.onopen = () => {
      console.log("WebSocket connected to Python server (5003)");
      setTimeout(() => startStreamingFrames(), 300);
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setProcessedFrame("data:image/jpeg;base64," + data.frame);
      setFocus(data.focus);
      setStatus(data.status);
      setAlarm(data.alarm);

      if (data.alarm) playAlarm();
      else stopAlarm();
    };

    wsRef.current.onerror = (err) =>
      console.error("WebSocket Error:", err);

    wsRef.current.onclose = () => {
      console.warn("WebSocket disconnected.");

      // ❗ ONLY RECONNECT IF COMPONENT IS STILL MOUNTED
      if (!isUnmountedRef.current) {
        console.log("Retrying in 1s...");
        setTimeout(connectWebSocket, 1000);
      } else {
        console.log("Page unmounted → WebSocket will NOT reconnect.");
      }
    };
  };

  // -------------------------------------------------------
  // STREAM FRAMES (10 FPS)
  // -------------------------------------------------------
  const startStreamingFrames = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const TARGET_W = 320;
    const TARGET_H = 240;

    let lastSent = 0;
    const SEND_INTERVAL = 100; // 10 FPS

    const sendFrame = () => {
      if (isUnmountedRef.current) return; // STOP WHEN LEAVING PAGE

      const video = videoRef.current;
      const now = performance.now();

      if (now - lastSent < SEND_INTERVAL) {
        requestAnimationFrame(sendFrame);
        return;
      }
      lastSent = now;

      if (
        video &&
        video.readyState >= 2 &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        canvas.width = TARGET_W;
        canvas.height = TARGET_H;

        ctx.drawImage(video, 0, 0, TARGET_W, TARGET_H);

        const dataURL = canvas.toDataURL("image/jpeg", 0.5);
        const base64 = dataURL.split(",")[1];

        wsRef.current.send(base64);
      }

      requestAnimationFrame(sendFrame);
    };

    sendFrame();
  };

  // -------------------------------------------------------
  // ALARM HANDLING
  // -------------------------------------------------------
  const playAlarm = () => {
    const alarm = alarmRef.current;
    alarm.loop = true;
    if (alarm.paused) alarm.play().catch(() => {});
  };

  const stopAlarm = () => {
    const alarm = alarmRef.current;
    alarm.pause();
    alarm.currentTime = 0;
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------
  return (
    <>
      <Header />

      <div className="rt-container">
        <div className="rt-left">
          <h2 className="rt-title">AI Teaching Session</h2>

          <div className="rt-video-box">
            <iframe
              src="https://www.youtube.com/embed/5MgBikgcWnY"
              title="Educational Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="rt-right">
          <h2 className="rt-title">Real-Time Focus Monitoring</h2>

          <div className="rt-processed-box">
            {processedFrame ? (
              <img
                src={processedFrame}
                alt="Processed Frame"
                className="rt-processed-video"
              />
            ) : (
              <p className="rt-waiting">Waiting for processed feed...</p>
            )}
          </div>

          {/* HIDDEN BUT ACTIVE VIDEO FEED */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "1px",
              height: "1px",
              opacity: 0,
              position: "absolute",
              pointerEvents: "none",
            }}
          />

          <div className="rt-focus-panel">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Focus Score:</strong> {focus}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealTimeTeachingPage;
