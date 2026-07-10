//import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AddRunForm } from './components/AddRunForm'
import { useRuns } from './hooks/useRuns';
import { RunList } from './components/RunList'
import { calcPace } from './utils/pace';
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  //console.log(auth, db); // temporary sanity check to ensure Firebase is initialized correctly
  const { user, loading } = useAuth();
  // console.log("Current user UID:", user?.uid); // Log the current user's UID for debugging
  
  const { runs, loading: runsLoading, error } = useRuns(user?.uid);
  const totalDistance = runs.reduce((total, run) => total + (run.distanceKm || 0), 0); /* sum of all run.distanceKm values */
  const totalDuration = runs.reduce((total, run) => total + (run.durationMin || 0), 0); /* sum of all run.durationMin values */
  const averagePace = calcPace(totalDuration, totalDistance);
  if (error) {
    return <div>Error loading runs: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AuthForm />;
  }

  if (runsLoading) {
    return <div>Loading runs...</div>;
  }

  return (
    <>
      <p>Logged in as {user.email}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <p>Total Distance: {totalDistance.toFixed(2)} km</p>
      <p>Total Duration: {totalDuration.toFixed(2)} min</p>
      <p>Average Pace: {averagePace}</p>
      <hr />
      <h2>Add a New Run</h2>
      <AddRunForm user={user} />
      <RunList runs={ runs } /> 

    </>
  )
}    

export default App