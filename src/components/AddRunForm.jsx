import { useState } from 'react';
import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export function AddRunForm({ user }) {
    const [date, setDate] = useState('');
    const [distanceKm, setDistanceKm] = useState('');
    const [durationMin, setDurationMin] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);


// Validation: think about what could go wrong here.
// distanceKm and durationMin come in as STRINGS from the input,
// even though the input type is "number". What do you need to
// do before treating them as numbers, and what should happen
// if someone submits 0 or a negative value?        
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const distance = parseFloat(distanceKm);
        const duration = parseFloat(durationMin);

        if (isNaN(distance) || isNaN(duration)) {
            setError('Distance and duration must be valid numbers.');
            return;
        }

        if (distance <= 0 || duration <= 0) {
            setError('Distance and duration must be positive values.');
            return;
        }

        setSubmitting(true);
        try {
            await addDoc(collection(db, 'runs'), {
                uid: user.uid,
                date: Timestamp.fromDate(new Date(date)),
                distanceKm: parseFloat(distanceKm),
                durationMin: parseFloat(durationMin),
                notes: notes,
                createdAt: serverTimestamp(),
            });

            // Reset form fields after successful submission
            setDate('');
            setDistanceKm('');
            setDurationMin('');
            setNotes('');
        } catch (err) {
            setError('Failed to add run: ' + err.message);
        } finally {
            setSubmitting(false);
        }
};

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log a Run</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Distance (km)"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                step="0.01"
                required
            />
            <input
                type="number"
                placeholder="Duration (min)"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                required
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />

            <button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Add Run'}
            </button>
        </form>
    );
}
