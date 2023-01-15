import React, { useState } from 'react';
import styles from './Create.module.scss';
import { useCreateCodeMutation, CreateCodeMutationVariables, Scalars } from '../../graphql/types/graphql';
import { adminClient, NewAdminHeader, option } from 'graphql/client';
import { distinctArray } from 'utils/utilArray';
import { RemoveSessionStorage } from 'utils/session';
import defaultImage from '../../public/logo.png';

function CreateCode() {
    const [code, setCode] = useState<string>('');
    const [img, setImg] = useState<string | ArrayBuffer | null | undefined | any>(defaultImage.src);
    const [imgStr, setImgStr] = useState<string>('/logo.png');
    const [description, setDescription] = useState<string>('');
    const [performance, setPerformance] = useState<string>('');
    const [star, setStar] = useState<number>(0);
    const [tag, setTag] = useState<string>('');
    const [access, setAccess] = useState<number>(0);
    // status
    const [err, setErr] = useState<string>('');
    const [success, setSuccess] = useState(false);

    // create a admin code
    const mutation = useCreateCodeMutation(adminClient, option, NewAdminHeader());

    function changeHandlerCode(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setCode(e.target.value);
    }

    function changeHandlerImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        const file = e?.target?.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImg(e.target?.result!);
        };
        reader.readAsDataURL(file);
        setImgStr(e.target.value);
    }

    function deleteImgHandler() {
        setImg(undefined);
        setImgStr('');
    }

    function changeHandlerDescription(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setDescription(e.target.value);
    }

    function changeHandlerPerformance(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setPerformance(e.target.value);
    }

    function changeHandlerStar(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setStar(e.target.valueAsNumber);
    }

    function changeHandlerTags(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setTag(e.target.value);
    }

    function changeHandlerAccess(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setAccess(e.target.valueAsNumber);
    }

    function createHandler() {
        if (code == '' || img == '' || description == '' || performance == '' || star == null || tag == '' || access == null) {
            setErr('All contents must be fill');
            setSuccess(false);
            return;
        }

        const variable: CreateCodeMutationVariables = {
            code: code,
            img: img,
            description: description,
            performance: performance,
            star: star,
            tags: distinctArray(tag.split(',')), // tag -> array tags
            access: access,
        };
        mutation
            .mutateAsync(variable, option)
            .then((res) => {
                if (!res.createCode.is_error) {
                    setSuccess(true);
                }
            })
            .catch((err) => {
                if (String(err).includes('http: named cookie not present')) {
                    RemoveSessionStorage();
                    window.location.href = '/manage';
                }
                if (err.response.status == 401) {
                    // RemoveCookie();
                    RemoveSessionStorage();
                    window.location.href = '/manage';
                }
                if (code == '') {
                    setErr('Code field error: must be fill');
                    return;
                }
                if (img == '') {
                    setErr('Image field error: must be fill');
                    return;
                }
                if (description == '') {
                    setErr('Description field error: must be fill');
                    return;
                }
                if (performance == '') {
                    setErr('Performance field error: must be fill');
                    return;
                }
                if (star == null) {
                    setErr('Star field error: must be fill');
                    return;
                }
                if (tag == '') {
                    setErr('Tag field error: must be fill');
                    return;
                }
                if (access == null) {
                    setErr('Access field error: must be fill');
                    return;
                }
                setSuccess(false);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>Create Code</p>
                    </div>

                    <div>
                        {success && (
                            <div className={styles.success}>
                                <p>Success</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>code</p>
                        <input
                            type='textarea'
                            name='code'
                            value={code}
                            className={styles.input}
                            placeholder='code'
                            onChange={(e) => changeHandlerCode(e)}
                            required
                        />
                    </div>

                    {imgStr == '' ? (
                        <input
                            type='file'
                            name='image'
                            accept='image/png, image/jpeg'
                            value={imgStr}
                            className={styles.input}
                            placeholder='image'
                            onChange={(e) => changeHandlerImg(e)}
                            required
                        />
                    ) : (
                        <div className={styles.imgBox}>
                            <img src={img} alt='img' width={150} height={80} />
                            <div>
                                <button
                                    className={styles.close_btn}
                                    onClick={() => {
                                        deleteImgHandler();
                                    }}
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.input_box}>
                        <p className={styles.text}>description</p>
                        <input
                            type='textarea'
                            name='description'
                            value={description}
                            className={styles.input}
                            placeholder='description'
                            onChange={(e) => changeHandlerDescription(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>performance</p>
                        <input
                            type='text'
                            name='performance'
                            value={performance}
                            className={styles.input}
                            placeholder='performance'
                            onChange={(e) => changeHandlerPerformance(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>star</p>
                        <input
                            type='number'
                            min={1}
                            max={10}
                            name='star'
                            value={star}
                            className={styles.input}
                            placeholder='star'
                            onChange={(e) => changeHandlerStar(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>tags</p>
                        <input
                            type='text'
                            name='tags'
                            value={tag}
                            className={styles.input}
                            placeholder='tags (need array type -> oo,oo,oo)'
                            onChange={(e) => changeHandlerTags(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>access</p>
                        <input
                            type='number'
                            name='access'
                            value={access}
                            className={styles.input}
                            placeholder='access'
                            onChange={(e) => changeHandlerAccess(e)}
                            required
                        />
                    </div>

                    <div>
                        {err != '' && (
                            <div className={styles.err}>
                                <p>{err}</p>
                            </div>
                        )}
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
                </div>
            </div>
        </div>
    );
}

export default CreateCode;
