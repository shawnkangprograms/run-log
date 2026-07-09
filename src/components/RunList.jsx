export function RunList({ runs }) {
    if (!runs || runs.length === 0) {
        return <p>No runs logged yet.</p>;
    }

    return (
        <ul>
            {runs.map((run) => (
                <li key={run.id}>
                    {/* <h3>{run.name}</h3> */}
                    <p>Date: {run.date.toDate().toLocaleDateString()}</p>
                    <p>Distance: {run.distanceKm} km</p>
                    <p>Duration: {run.durationMin} minutes</p>
                    <p>Notes: {run.notes}</p>
                </li>
            ))}
        </ul>
    );
}