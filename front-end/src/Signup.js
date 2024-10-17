import { React, useState } from 'react';
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return; // Prevent form submission
        }

        const data = { username, email, password };

        setLoading(true);

        try {
            const result = await axios.post('https://react-l-f5523-default-rtdb.firebaseio.com/register.json', data);
            if (result) {
                toast.success('User registered successfully');
                navigate('/login');
            }
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container tot-back'>
            <div className='row lg-box'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <h2>Register</h2>
                    <form onSubmit={(e) => signup(e)}>
                        <div className="mb-3">
                            <input 
                                required
                                type="text" 
                                className="form-control input-block" 
                                placeholder='Username' 
                                value={username} 
                                onChange={(ev) => setUsername(ev.target.value)} 
                            />
                            <br/>
                            <input 
                            required
                                type="email" 
                                className="form-control input-block" 
                                placeholder='Email' 
                                value={email} 
                                onChange={(ev) => setEmail(ev.target.value)} 
                            />
                            <br/>
                            <input 
                            required
                                type="password" 
                                className="form-control input-block" 
                                placeholder='Password' 
                                value={password} 
                                onChange={(ev) => setPassword(ev.target.value)} 
                            />
                            <br/>
                            <input 
                            required
                                type="password" 
                                className="form-control input-block" 
                                placeholder='Confirm Password' 
                                value={confirmPassword} 
                                onChange={(ev) => setConfirmPassword(ev.target.value)} 
                            />
                            <br/>
                        </div>
                        <button type="submit" className="btn btn-info login-btn" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="mt-3 mb-5 d-grid">
                            <span className="bot-text">Already have an account? <Link to="/login" className="ms-1 text-info fw-bold">Login</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
