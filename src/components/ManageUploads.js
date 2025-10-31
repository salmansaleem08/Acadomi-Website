// src/components/ManageUploads.js
import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase/config';
import Header from './Header';
import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  limitToLast,
  update,
  remove,
} from 'firebase/database';
import './ManageUploads.css';

const ManageUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [heading, setHeading] = useState('');
  const [type, setType] = useState('pdf');
  const [files, setFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const user = auth.currentUser;
  const uploadsRef = user ? ref(db, `uploads/${user.uid}`) : null;

  // Listen to uploads in real-time
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

  // File change
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (type === 'pdf' && selected.length > 1) return alert('Only 1 PDF');
    if (type === 'images' && selected.length > 4) return alert('Max 4 images');
    setFiles(selected);
  };

  // Audio recording
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setFiles([new File([blob], 'recording.webm', { type: 'audio/webm' })]);
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    }
  };

  // Upload
  const handleUpload = async () => {
    if (!heading.trim()) return alert('Enter heading');
    if (files.length === 0) return alert('Select or record');
    if (uploads.length >= 5) return alert('Max 5 uploads');

    const user = auth.currentUser;
    const newUploadRef = push(uploadsRef);
    const uploadId = newUploadRef.key;

    await update(newUploadRef, {
      heading,
      type,
      fileCount: files.length,
      createdAt: Date.now(),
      status: 'uploading'
    });

    const formData = new FormData();
    files.forEach(f => formData.append('file', f));
    formData.append('uploadId', uploadId);
    formData.append('userId', user.uid);
    formData.append('type', type === 'images' ? 'image' : type);

    try {
      const res = await fetch('http://localhost:5000/extract', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      await update(newUploadRef, { status: 'processed' });
    } catch (err) {
      await update(newUploadRef, { status: 'failed', error: err.message });
    }

    setHeading('');
    setFiles([]);
    setType('pdf');
  };

  // Rename
  const handleRename = async (id) => {
    const newHeading = prompt('New heading:', uploads.find(u => u.id === id)?.heading);
    if (newHeading?.trim()) {
      const uploadRef = ref(db, `uploads/${user.uid}/${id}`);
      await update(uploadRef, { heading: newHeading.trim() });
    }
    setMenuOpen(null);
  };

  // Delete
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
      <div className="manage-container">

        {/* Left: List */}
        <div className="manage-left">
          <h2 className="manage-title">Your Uploads ({uploads.length}/5)</h2>
          {uploads.length === 0 ? (
            <p className="manage-empty">No uploads yet</p>
          ) : (
            <ul className="manage-list">
              {uploads.map((item) => (
                <li key={item.id} className="manage-item">
                  <span className="manage-item__text">{item.heading}</span>
                  <div className="manage-menu">
                    <button
                      onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                      className="manage-dots"
                    >...</button>
                    {menuOpen === item.id && (
                      <div className="manage-dropdown">
                        <button onClick={() => handleRename(item.id)} className="manage-menu-btn">Rename</button>
                        <button onClick={() => handleDelete(item.id)} className="manage-menu-btn delete">Delete</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Upload */}
        <div className="manage-right">
          <h2 className="manage-title">Upload Material</h2>

          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={e => setHeading(e.target.value)}
            className="manage-input"
          />

          <select value={type} onChange={e => setType(e.target.value)} className="manage-select">
            <option value="pdf">Upload PDF</option>
            <option value="images">Upload Notes in the form of Images (Upload 4)</option>
            <option value="audio">Record Audio</option>
          </select>

          {type !== 'audio' ? (
            <input
              type="file"
              multiple={type === 'images'}
              accept={type === 'pdf' ? '.pdf' : 'image/*'}
              onChange={handleFileChange}
              className="manage-file-input"
            />
          ) : (
            <button onClick={toggleRecording} className={`manage-record-btn ${isRecording ? 'recording' : ''}`}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          )}

          {files.length > 0 && (
            <p className="manage-file-preview">{files.length} file(s) selected</p>
          )}

          <button
            onClick={handleUpload}
            className="manage-upload-btn"
            disabled={!heading || files.length === 0}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageUploads;