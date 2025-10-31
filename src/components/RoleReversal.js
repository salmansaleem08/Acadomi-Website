// src/components/RoleReversal.js
import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase/config';
import { onValue, ref, query, orderByChild, limitToLast, update, remove } from 'firebase/database';
import Header from './Header';
import './RoleReversal.css';  // Reuses ManageUploads.css styles

const RoleReversal = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [topic, setTopic] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);  // For dots menu

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

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

  // Fetch extractedText when selected
  useEffect(() => {
    if (!selectedUpload) return;
    const textRef = ref(db, `uploads/${user.uid}/${selectedUpload.id}/extractedText`);
    const unsubscribe = onValue(textRef, (snap) => {
      setExtractedText(snap.val() || 'No text extracted yet.');
    });
    return () => unsubscribe();
  }, [selectedUpload]);

  // Start/Stop Recording (SAME as ManageUploads)
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
        mediaRecorder.current.onstop = () => {
          const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
          setAudioBlob(blob);
          setShowUpload(true);
          audioChunks.current = [];
          stream.getTracks().forEach(t => t.stop());
        };
        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (err) {
        setError('Microphone access denied');
      }
    }
  };

  // Upload & Evaluate
  const handleEvaluate = async () => {
    if (!audioBlob || !topic) {
      setError('Add topic and record audio first');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'recording.webm');
    formData.append('extracted_text', extractedText);
    formData.append('topic', topic);

    try {
      const res = await fetch('http://localhost:5000/evaluate-role-reversal', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Evaluation failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Rename (same as ManageUploads)
  const handleRename = async (id) => {
    const current = uploads.find(u => u.id === id);
    const newHeading = prompt('New heading:', current?.heading);
    if (newHeading?.trim()) {
      const uploadRef = ref(db, `uploads/${user.uid}/${id}`);
      await update(uploadRef, { heading: newHeading.trim() });
    }
    setMenuOpen(null);
  };

  // Delete (same as ManageUploads)
  const handleDelete = async (id) => {
    if (window.confirm('Delete this upload?')) {
      const uploadRef = ref(db, `uploads/${user.uid}/${id}`);
      await remove(uploadRef);
    }
    setMenuOpen(null);
  };

  return (
    <>
      <Header />
      <div className="manage-container"> {/* Reuse same container class */}

        {/* LEFT: Upload List (100% same as ManageUploads) */}
        <div className="manage-left">
          <h2 className="manage-title">Select Material</h2>
          {uploads.length === 0 ? (
            <p className="manage-empty">No uploads yet. Go to Manage Uploads.</p>
          ) : (
            <ul className="manage-list">
              {uploads.map((item) => (
                <li key={item.id} className="manage-item">
                  <span
                    className={`manage-item__text ${selectedUpload?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelectedUpload(item)}
                  >
                    {item.heading}
                  </span>
                 
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: Role Reversal Flow */}
        <div className="manage-right"> {/* Reuse same right panel */}
          <h2 className="manage-title">Role Reversal Teaching</h2>

          {selectedUpload ? (
            <>
              <input
                type="text"
                placeholder="Enter topic (e.g., 'Explain Photosynthesis')"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="manage-input"
              />

              <div className="role-preview">
                <h3>Reference Material:</h3>
                <p className="role-text-preview">{extractedText.substring(0, 300)}...</p>
              </div>

              {!showUpload && !result ? (
                <button
                  onClick={toggleRecording}
                  className={`manage-record-btn ${isRecording ? 'recording' : ''}`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Role Reversal Teaching'}
                </button>
              ) : !result ? (
                <button
                  onClick={handleEvaluate}
                  disabled={loading}
                  className="manage-upload-btn"
                >
                  {loading ? 'Evaluating...' : 'Upload & Evaluate'}
                </button>
              ) : null}

              {/* Result */}
              {result && (
                <div className="role-result">
                  <h3>Evaluation Results</h3>
                  <div className="result-scores">
                    <div>Clarity: {result.evaluation.score_clarity}/10</div>
                    <div>Concepts: {result.evaluation.score_concepts}/10</div>
                    <div>Fluency: {result.evaluation.score_fluency}/10</div>
                    <div>Total: {result.evaluation.total_score}/30</div>
                  </div>
                  <p><strong>Feedback:</strong> {result.evaluation.feedback}</p>
                  <p><strong>Understanding:</strong> {result.evaluation.topic_understanding}</p>
                  <p><strong>Strengths:</strong> {result.evaluation.strength}</p>
                  <p><strong>Weaknesses:</strong> {result.evaluation.weakness}</p>
                </div>
              )}
            </>
          ) : (
            <p className="manage-empty">Select a material from the left.</p>
          )}

          {error && <p className="role-error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default RoleReversal;