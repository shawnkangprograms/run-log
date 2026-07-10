//import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AddRunForm } from './components/AddRunForm'
import { useRuns } from './hooks/useRuns';
import { RunList } from './components/RunList'
import { calcPace } from './utils/pace';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

  const chartData = runs
    .slice() // Create a shallow copy of the runs array to avoid mutating the original
    .sort((a, b) => a.date.toMillis() - b.date.toMillis()) // Sort runs by date in ascending order (why use toMillis() istead of toSeconds()?)
    .map(run => ({
      date: new Date(run.date.seconds * 1000).toLocaleDateString(), // Convert Firestore timestamp to JS Date and format it
      distance: run.distanceKm,
      duration: run.durationMin,
      // (error) pace: parseFloat(calcPace(run.durationMin, run.distanceKm).split(' ')[0]) // Extract the numeric pace value for charting
      pace: run.distanceKm > 0 ? run.durationMin / run.distanceKm : 0 // Calculate pace as duration/distance for charting, handle division by zero
  }));

  const chartElement = (
    <ResponsiveContainer width="100%" height={400}> 
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="distance" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pace" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );

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
      {chartElement}
      <RunList runs={ runs } /> 

    </>
  )
}    

export default App