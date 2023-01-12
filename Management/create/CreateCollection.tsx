import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useCreateAdminCollectionMutation, CreateAdminCollectionMutationVariables } from '../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client';
import { RemoveAdminCookie } from 'utils/cookie';
import { RemoveSessionStorage } from 'utils/session';

function CreateCollection() {
    const [userId, setUserId] = useState<number>(0);
    const [codeId, setCodeId] = useState<number>(0);
    // status
    const [err, setErr] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const mutation = useCreateAdminCollectionMutation(adminClient, option, NewAdminHeader());

    function changeHandlerUserId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setUserId(e.target.valueAsNumber);
    }

    function changeHandlerCodeId(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCodeId(e.target.valueAsNumber);
    }

    function createHandler() {
        if (userId == null || codeId == null) {
            setErr('All contents must be fill');
            setSuccess(false);
            return;
        }

        const variable: CreateAdminCollectionMutationVariables = {
            user_id: userId!,
            code_id: codeId!,
        };
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createAdminCollection.is_error) {
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
                if (userId == 0) {
                    setErr('User id field error');
                    return;
                }
                if (codeId == 0) {
                    setErr('Code id field error');
                    return;
                }
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Collection</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>user id</p>
                        <input
                            type='number'
                            name='userId'
                            value={userId}
                            className={styles.input}
                            placeholder='userId'
                            onChange={(e) => changeHandlerUserId(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>code id</p>
                        <input
                            type='number'
                            name='codeId'
                            value={codeId}
                            className={styles.input}
                            placeholder='codeId'
                            onChange={(e) => changeHandlerCodeId(e)}
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

export default CreateCollection;
