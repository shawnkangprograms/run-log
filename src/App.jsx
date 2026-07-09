//import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AddRunForm } from './components/AddRunForm'
import { useRuns } from './hooks/useRuns';
import { RunList } from './components/RunList'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  //console.log(auth, db); // temporary sanity check to ensure Firebase is initialized correctly
  const { user, loading } = useAuth();
  console.log("Current user UID:", user?.uid); // Log the current user's UID for debugging
  
  const { runs, loading: runsLoading, error } = useRuns(user?.uid);
  if (error) {
    return <div>Error loading runs: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <p>Logged in as {user.email}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <AddRunForm user={user} />
      <RunList runs={ runs } /> 

    </>
  )
}    

export default App