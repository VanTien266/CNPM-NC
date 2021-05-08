import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            props.history.push("/signin");
        }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));

    }
    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
          </label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder="John">
                    </input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
          </label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="user@gmail.com">
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="******">
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary" disabled={name === "" || email === "" || password === ""}> Register</button>
                </li>
                <li>
                    Already have an account? <Link to="/signin">Sign-in</Link>
                </li>

            </ul>
        </form>
    </div>
}
export default RegisterScreen;