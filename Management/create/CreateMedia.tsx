import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useCreateMediaMutation, CreateMediaMutationVariables } from '../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client';
import { RemoveAdminCookie } from 'utils/cookie';
import { RemoveSessionStorage } from 'utils/session';

function CreateMedia() {
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [img, setImg] = useState<string | ArrayBuffer>('');
    // status state
    const [err, setErr] = useState<string>('');
    const [success, setSuccess] = useState(false);

    const variable: CreateMediaMutationVariables = {
        title: title,
        contents: contents,
        img: img,
    };

    const mutation = useCreateMediaMutation(adminClient, option, NewAdminHeader());

    function changeHandlerTitle(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setTitle(e.target.value);
    }

    function changeHandlerContents(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault;
        setContents(e.target.value);
    }

    function changeHandlerImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        const file = e?.target?.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImg(e.target?.result!);
        };
        reader.readAsDataURL(file);
    }

    function createHandler() {
        if (title == '' || contents == '' || img == '') {
            setErr('All contents must be fill');
            setSuccess(false);
            return;
        }
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createMedia.is_error) {
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
                if (title == '') {
                    setErr('Title field error');
                    return;
                }
                if (contents == '') {
                    setErr('Contents field error');
                    return;
                }
                if (img == '') {
                    setErr('Image field error');
                    return;
                }
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Media</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>title</p>
                        <input
                            type='text'
                            name='title'
                            value={title}
                            className={styles.input}
                            placeholder='title'
                            onChange={(e) => changeHandlerTitle(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>contents</p>
                        <textarea
                            name='contents'
                            value={contents}
                            className={styles.input}
                            placeholder='contents'
                            onChange={(e) => changeHandlerContents(e)}
                            required
                            rows={7}
                            cols={50}
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>image</p>
                        <input
                            type='file'
                            name='image'
                            accept='image/png, image/jpeg'
                            className={styles.input}
                            placeholder='image'
                            onChange={(e) => changeHandlerImg(e)}
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

export default CreateMedia;
