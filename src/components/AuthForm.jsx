import {useState} from 'react';
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../firebase';

export function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // toggle mode between sign up and sign in
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error state before attempting auth

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password); //call signup function
            }
            else {
                await signInWithEmailAndPassword(auth, email, password); //call signin function
            }
            // no need to do anything else on success —
            //why? think about what useAuth is already doing
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">
                {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
            <p>
                {isSignUp ? "Already have an account?" : "Need an account?"}{""}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Log In" : "Sign Up"}
                </button>
            </p>
        </form>
    );
}    