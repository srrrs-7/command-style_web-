import React, { useEffect, useState } from 'react';
import styles from './ManageLogin.module.scss';
import {
    GetAdminUserMutationVariables,
    useGetAdminUserMutation,
    CreateAdminTokenMutationVariables,
    useCreateAdminTokenMutation,
} from '../../../graphql/types/graphql';
import { client, option, NewAdminHeader } from '../../../graphql/client';
import { GetAdminCookie, RemoveAdminCookie, SetAdminCookie } from 'utils/cookie';
import { useRecoilState } from 'recoil';
import { adminState } from 'recoil/manage';
import { RemoveSessionStorage, SetSessionStorage } from 'utils/session';

function ManageLogin() {
    const [_, setAdminRender] = useRecoilState(adminState);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [err, setErr] = useState<string>('');

    // admin mutation
    const adminMutation = useGetAdminUserMutation(client, option, NewAdminHeader());
    // token mutation
    const tokenMutation = useCreateAdminTokenMutation(client, option, NewAdminHeader());

    // input username
    function changeHandlerId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    // input password
    function changeHandlerPass(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function adminHandler() {
        if (username == '' || password == '') {
            setErr('All contents must be fill');
            return;
        }

        // login with username and password
        const adminVariable: GetAdminUserMutationVariables = { username: username, password: password };
        adminMutation
            .mutateAsync(adminVariable, option)
            .then((res) => {
                if (res.getAdminUser.is_password && res.getAdminUser.is_username) {
                    // fetch get token
                    const tokenVariable: CreateAdminTokenMutationVariables = { username: username, password: password };
                    tokenMutation.mutateAsync(tokenVariable, option).then((res) => {
                        setAdminRender(true);
                        // SetAdminCookie(res.createAdminToken);
                        SetSessionStorage();
                    });
                }
            })
            .catch((err) => {
                if (String(err).includes('http: named cookie not present')) {
                    RemoveSessionStorage();
                    window.location.href = '/login';
                }
                if (err.response.status == 401) {
                    // RemoveCookie();
                    RemoveSessionStorage();
                    window.location.href = '/login';
                }
                if (username == '') {
                    setErr('Username field error: username not register');
                }
                if (password == '') {
                    setErr('Password field error: password not register');
                }
            });
    }

    useEffect(() => {});

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Management</p>
                    </div>

                    <div>
                        {err != '' && (
                            <div className={styles.err}>
                                <p>{err}</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>UserId</p>
                        <input
                            type='text'
                            name='username'
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

                    <div className={styles.adminBox}>
                        <button
                            className={styles.adminButton}
                            onClick={() => {
                                adminHandler();
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLogin;
