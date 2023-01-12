import { pathState } from '../../../recoil/global';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Login.module.scss';
import {
    CreateTokenMutationVariables,
    LoginUserMutationVariables,
    useCreateTokenMutation,
    useLoginUserMutation,
} from '../../../graphql/types/graphql';
import { client, option, NewHeader } from 'graphql/client';
import { SetCookie } from 'utils/cookie';
import { RemoveSessionStorage, SetSessionStorage } from 'utils/session';

function Login() {
    const [__, setPath] = useRecoilState<string>(pathState); // header current path
    const [err, setErr] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // login mutation
    const loginMutation = useLoginUserMutation(client, option, NewHeader());
    // token mutation
    const tokenMutation = useCreateTokenMutation(client, option, NewHeader());

    function changeHandlerId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function loginHandler() {
        if (username == '' || password == '') {
            setErr('All contents must be fill');
            return;
        }
        // user password auth
        const variable: LoginUserMutationVariables = { username: username, password: password };
        loginMutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (res.loginUser.OK) {
                    // get token
                    const tokenVariable: CreateTokenMutationVariables = { username: res.loginUser.username };
                    tokenMutation
                        .mutateAsync(tokenVariable, option)
                        .then((res) => {
                            // SetCookie(res.createToken);
                            SetSessionStorage();
                            setPath('/');
                            window.location.href = '/';
                        })
                        .catch((err) => {
                            if (username == '') {
                                setErr('Username field error: must be fill');
                                return;
                            } else if (String(err).includes('no rows')) {
                                setErr('Username field error: username not registered');
                                return;
                            }
                            if (password == '') {
                                setErr('Password field error: must be fill');
                                return;
                            } else if (String(err).includes('no rows')) {
                                setErr('Password field error: username not registered');
                                return;
                            }
                        });
                }
            })
            .catch((err) => {
                if (String(err).includes('no rows')) {
                    setErr('error: not registered');
                    return;
                }
            });
    }

    useEffect(() => {
        setPath(window.location.pathname);
        setPath('/login');
    });

    return (
        <div>
            <section className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Login</p>
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>UserId</p>
                        <input
                            type='text'
                            name='userId'
                            value={username}
                            className={styles.input}
                            placeholder='username'
                            onChange={(e) => changeHandlerId(e)}
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
                        />
                    </div>

                    <div>
                        {err != '' && (
                            <div className={styles.err}>
                                <p>{err}</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.loginBox}>
                        <button
                            className={styles.loginButton}
                            onClick={() => {
                                loginHandler();
                            }}
                        >
                            Login
                        </button>
                    </div>
                    {/*
                    <section className={styles.oauth_box}>
                        <span className={styles.oauth_icon} onClick={() => signIn()}>
                            <img src='/google.svg' alt='google icon' width={40} height={40} />
                        </span>
                        <span className={styles.oauth_icon} onClick={() => signIn()}>
                            <img src='/github.svg' alt='github icon' width={40} height={40} />
                        </span>
                        <span className={styles.oauth_icon} onClick={() => signIn()}>
                            <img src='/facebook.svg' alt='facebook icon' width={40} height={40} />
                        </span>
                    </section> */}
                </div>
            </section>
        </div>
    );
}

export default Login;
