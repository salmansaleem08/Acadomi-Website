import React, { useState, useEffect } from "react";
import Header from "./Header";
import { auth, db } from "../firebase/config";
import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import "./Podcast.css";

const Podcast = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState("");

  const user = auth.currentUser;
  const uploadsRef = user ? ref(db, `uploads/${user.uid}`) : null;

   // Fetch uploads (EXACT SAME as ManageUploads)
    useEffect(() => {
      if (!uploadsRef) return;
      const q = query(uploadsRef, orderByChild('createdAt'), limitToLast(10));
      const unsubscribe = onValue(q, (snapshot) => {
        const data = [];
        snapshot.forEach((child) => {
          data.push({ id: child.key, ...child.val() });
        });
        setUploads(data);
      });
      return () => unsubscribe();
    }, [uploadsRef]);

  // Load extracted text when selecting
  useEffect(() => {
    if (!selectedUpload) return;
    const textRef = ref(
      db,
      `uploads/${user.uid}/${selectedUpload.id}/extractedText`
    );
    return onValue(textRef, (snap) => {
      setExtractedText(snap.val() || "No extracted text found");
    });
  }, [selectedUpload]);

  // ➤ Generate Podcast
  const generatePodcast = async () => {
    if (!extractedText.trim()) {
      setError("No text available for podcast generation.");
      return;
    }

    setLoading(true);
    setAudioUrl(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/generate-podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      // Returned: http://localhost:5001/podcast-file
      setAudioUrl(data.audio_url);

    }  catch (err) {
        console.error("Podcast fetch error:", err);
        setError("Failed to connect to podcast server. Is Flask running on port 5001?");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="podcast-container">
        
        {/* LEFT SIDE – Topics */}
        <div className="podcast-left">
          <h2 className="podcast-title">Select Topic</h2>

          {uploads.length === 0 ? (
            <p className="podcast-empty">No uploads found.</p>
          ) : (
            <ul className="podcast-list">
              {uploads.map((item) => (
                <li
                  key={item.id}
                  className={`podcast-item ${
                    selectedUpload?.id === item.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedUpload(item)}
                >
                  {item.heading}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT SIDE – Preview + Generate + Player */}
        <div className="podcast-right">
          <h2 className="podcast-title">Podcast Generator</h2>

          {selectedUpload ? (
            <>
              <div className="podcast-preview">
                <h3>Extracted Text:</h3>
                <p>{extractedText.substring(0, 350)}...</p>
              </div>

              <button
                onClick={generatePodcast}
                disabled={loading}
                className="podcast-btn"
              >
                {loading ? "Generating Podcast..." : "Generate Podcast"}
              </button>

              {/* Audio Player */}
              {audioUrl && (
                <div className="podcast-player">
                  <h3>Your Podcast:</h3>
                  <audio controls src={audioUrl}></audio>
                </div>
              )}

              {error && <p className="podcast-error">{error}</p>}
            </>
          ) : (
            <p className="podcast-empty">Select a topic to continue.</p>
          )}
        </div>

        <div>
           
        </div>
      </div>
    </>
  );
};

export default Podcast;
