import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useCreateUserMutation, CreateUserMutationVariables } from '../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client';
import { RemoveAdminCookie } from 'utils/cookie';
import { RemoveSessionStorage } from 'utils/session';

function CreateUser() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [birth, setBirth] = useState<string>('');
    // status
    const [err, setErr] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const variable: CreateUserMutationVariables = {
        username: username,
        password: password,
        email: email,
        sex: sex,
        date_of_birth: birth,
    };
    const mutation = useCreateUserMutation(adminClient, option, NewAdminHeader());

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

    function changeHandlerBirth(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setBirth(e.target.value);
    }

    function createHandler() {
        if (username == '' || password == '' || email == '' || sex == '' || birth == '') {
            setErr('All contents must be fill');
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createUser.is_error) {
                    setSuccess(true);
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
                    setErr('Username field error');
                    return;
                }
                if (password == '') {
                    setErr('Password field error');
                    return;
                }
                if (email == '') {
                    setErr('Email field error');
                    return;
                }
                if (sex == '') {
                    setErr('Gender field error');
                    return;
                }
                if (birth == '') {
                    setErr('Birth field error');
                    return;
                }
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create User</p>
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
                            onChange={(e) => changeHandlerPass(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>email</p>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            className={styles.input}
                            placeholder='email'
                            onChange={(e) => changeHandlerEmail(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>sex</p>
                        <input
                            type='text'
                            name='sex'
                            value={sex}
                            className={styles.input}
                            placeholder='sex'
                            onChange={(e) => changeHandlerSex(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>birth</p>
                        <input
                            type='text'
                            name='birth'
                            value={birth}
                            className={styles.input}
                            placeholder='birth'
                            onChange={(e) => changeHandlerBirth(e)}
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
                        {err && (
                            <div className={styles.err}>
                                <p>error</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
