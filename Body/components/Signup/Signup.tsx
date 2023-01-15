import { pathState } from '../../../recoil/global';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Signup.module.scss';
import { CreateUserMutationVariables, useCreateUserMutation } from '../../../graphql/types/graphql';
import { client, option, NewHeader } from '../../../graphql/client';

function Signup() {
    const [__, setPath] = useRecoilState<string>(pathState);
    const [err, setErr] = useState<string>('');
    // input value
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [birth, setBirth] = useState<string>('');

    // create user mutation
    const mutation = useCreateUserMutation(client, option, NewHeader());

    function changeHandlerUsername(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function changeHandlerEmail(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setEmail(e.target.value);
    }

    function changeHandlerSex(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setSex(e.target.value);
    }

    function createHandler() {
        if (username == '' || password == '' || email == '' || sex == '') {
            setErr('All contents must be fill');
            return;
        }
        if (username.length < 5) {
            setErr('Username must be at least 5 characters');
            return;
        }
        if (password.length < 8) {
            setErr('Password must be at least 8 characters');
            return;
        }
        if (!email.includes('@') && !email.includes('.')) {
            setErr('Email must be mail format');
            return;
        }

        const variable: CreateUserMutationVariables = {
            username: username,
            password: password,
            email: email,
            sex: sex,
            date_of_birth: birth,
        };
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createUser.is_error) {
                    setPath('/login');
                    window.location.href = '/login';
                }
            })
            .catch((err) => {
                if (username == '') {
                    setErr('Username field error: must be fill');
                    return;
                } else if (String(err).includes('users_username_key')) {
                    setErr('Username field error: already exist');
                    return;
                }

                if (password == '') {
                    setErr('Password field error: must be fill');
                    return;
                }
                if (String(err).includes('users_email_key')) {
                    setErr('Email field error: already exist');
                    return;
                }
                if (sex == '') {
                    setErr('Gender field error: must be fill');
                    return;
                }
            });
    }

    useEffect(() => {
        setPath(window.location.pathname);
        setPath('/signup');
    }, []);

    return (
        <div className={styles.box}>
            <div className={styles.board}>
                <div className={styles.title}>
                    <p>Sigh Up</p>
                </div>

                <div className={styles.contents}>
                    <div className={styles.input_box}>
                        <p className={styles.text}>UserId</p>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            className={styles.input}
                            placeholder='username'
                            onChange={(e) => changeHandlerUsername(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>Password</p>
                        <input
                            type='text'
                            name='password'
                            value={password}
                            className={styles.input}
                            placeholder='password'
                            onChange={(e) => changeHandlerPass(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>Email</p>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            className={styles.input}
                            placeholder='email'
                            onChange={(e) => changeHandlerEmail(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>Gender</p>
                        <input
                            type='text'
                            list='dataList'
                            name='gender'
                            value={sex}
                            className={styles.input}
                            placeholder='gender'
                            onChange={(e) => changeHandlerSex(e)}
                            required
                        />
                        <datalist id='dataList'>
                            <option value='Man'></option>
                            <option value='Woman'></option>
                            <option value='Other'></option>
                        </datalist>
                    </div>
                </div>

                <div>
                    {err != '' && (
                        <div className={styles.err}>
                            <p>{err}</p>
                        </div>
                    )}
                </div>

                <div className={styles.signupBox}>
                    <button
                        className={styles.signupButton}
                        onClick={() => {
                            createHandler();
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
