import { useState, useEffect } from 'react';
import './App.css';

const API_URL = '/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all notes from backend
  const fetchNotes = async () => {
    try {
      setErrorMessage('');
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setErrorMessage(
        'Unable to load notes. Please ensure the backend server is running on port 5000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle note creation
  const handleAddNote = async (e) => {
    e.preventDefault();
    const trimmed = noteText.trim();
    if (!trimmed) return;

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: Failed to create note`);
      }

      const createdNote = await response.json();
      // Add created note to the top of the list
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
      setNoteText('');
    } catch (err) {
      console.error('Error adding note:', err);
      setErrorMessage(err.message || 'Failed to add note. Check your backend connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
        ' · ' + date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-badge">Full-Stack App</div>
        <h1 className="app-title">Simple Notes</h1>
        <p className="app-subtitle">Capture and organize your quick thoughts</p>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="error-banner" role="alert">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} aria-label="Dismiss error">
            &times;
          </button>
        </div>
      )}

      {/* Add Note Form */}
      <div className="note-form-card">
        <form onSubmit={handleAddNote} className="note-form">
          <input
            type="text"
            className="note-input"
            placeholder="Write a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={isSubmitting}
            autoFocus
          />
          <button
            type="submit"
            className="btn-add"
            disabled={isSubmitting || !noteText.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add Note'}
          </button>
        </form>
      </div>

      {/* Notes Display Section */}
      <section className="notes-section">
        <div className="notes-header">
          <h2 className="notes-heading">All Notes</h2>
          <span className="notes-count">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>

        {isLoading ? (
          <div className="loading-indicator">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-title">No notes yet</p>
            <p className="empty-state-subtitle">Type your first note above and click "Add Note"</p>
          </div>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <p className="note-text">{note.text}</p>
                {note.createdAt && (
                  <div className="note-footer">
                    <span className="note-time">{formatDate(note.createdAt)}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
