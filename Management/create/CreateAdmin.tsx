import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useCreateAdminUserMutation, CreateAdminUserMutationVariables } from '../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client';
import { RemoveAdminCookie } from 'utils/cookie';
import { RemoveSessionStorage } from 'utils/session';

function CreateAdmin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // status
    const [err, setErr] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const mutation = useCreateAdminUserMutation(adminClient, option, NewAdminHeader());

    function changeHandlerUsername(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUsername(e.target.value);
    }

    function changeHandlerPassword(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPassword(e.target.value);
    }

    function createHandler() {
        if (username == '' || password == '') {
            setErr('All contents must be fill');
            setSuccess(false);
            return;
        }
        const variable: CreateAdminUserMutationVariables = {
            username: username,
            password: password,
        };
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                setSuccess(true);
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

                setSuccess(false);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Admin User</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>username</p>
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
                        <p className={styles.text}>password</p>
                        <input
                            type='text'
                            name='password'
                            value={password}
                            className={styles.input}
                            placeholder='password'
                            onChange={(e) => changeHandlerPassword(e)}
                            required
                        />
                    </div>

                    <div className={styles.adminBox}>
                        <button
                            className={styles.adminButton}
                            onClick={() => {
                                createHandler();
                            }}
                        >
                            Create
                        </button>
                    </div>
                    <div>
                        {err != '' && (
                            <div className={styles.err}>
                                <p>{err}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAdmin;
