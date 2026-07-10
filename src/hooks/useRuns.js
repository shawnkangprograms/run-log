import {useState, useEffect} from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";

export function useRuns(uid) {
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) {
            // If no uid is provided, clear the runs and set loading to false
            setRuns([]); //shows a red error line
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'runs'),
            where('uid', '==', uid),
            orderBy('date', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            // Build an array of plain object from snapshot.doc here
            // then call setRuns(runsData) with it to update the runs state with the new data
            const runsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            // console.log("Snapshot fired. Docs found:", snapshot.docs.length); // Log the number of documents found in the snapshot
            setRuns(runsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching runs:", error); // Log any errors that occur while fetching runs
            setError(error);
            setLoading(false);
        });

        return unsubscribe;
    }, [uid]);

    return { runs, loading, error };
}