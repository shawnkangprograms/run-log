//import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { AuthForm } from './components/AuthForm'
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AddRunForm } from './components/AddRunForm'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  //console.log(auth, db); // temporary sanity check to ensure Firebase is initialized correctly
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <p>{user ? `Logged in as ${user.email}` : 'Not logged in'}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <AddRunForm user={user} />
    </>
  )
}    

export default App