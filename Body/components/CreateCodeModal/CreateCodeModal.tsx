import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './CreateCodeModal.module.scss';
import { CreateCodeMutationVariables, useCreateCodeMutation } from '../../../graphql/types/graphql';
import { client, NewHeader, option } from 'graphql/client';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { createCodeModalState } from 'recoil/modal';
import { distinctArray } from 'utils/utilArray';
import defaultImage from '../../../public/logo.png';
import anime from 'animejs';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';
import { sessionState } from 'recoil/global';

function CreateCodeModal() {
    const [createCodeModal, setCreateCodeModal] = useRecoilState<boolean>(createCodeModalState); // show create code modal
    // input state
    const [code, setCode] = useState<string>('');
    const [img, setImg] = useState<string | ArrayBuffer | null | undefined | any>(defaultImage.src);
    const [imageStr, setImageStr] = useState<string>('/logo.png');
    const [description, setDescription] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    // status
    const [err, setErr] = useState<string>('');
    const [session, setSession] = useRecoilState<boolean>(sessionState);
    useEffect(() => {
        setSession(GetSessionStorage != null);
    }, [err]);
    // animation ref
    const animation = useRef<any>(null);

    // create collection mutation
    const addCodeMutation = useCreateCodeMutation(client, option, NewHeader());

    function modalCloseHandler() {
        animation.current = anime({
            targets: '#modal',
            scale: [1, 0],
            opacity: [1, 0],
            delay: anime.stagger(10),
            loop: false,
            direction: 'alternate',
            duration: 300,
            easing: 'easeInOutSine',
        });
        setTimeout(() => {
            setCreateCodeModal(false);
        }, 200);
        setSession(GetSessionStorage != null);
    }

    function changeHandlerCode(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault;
        setCode(e.target.value);
    }

    function changeHandlerImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        if (e?.target?.files![0] == undefined) {
            return;
        }
        const file = e?.target?.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImg(e.target?.result!);
        };
        reader.readAsDataURL(file);
        setImageStr(e.target.value);
    }

    function deleteImgHandler() {
        setImg(undefined);
        setImageStr('');
    }

    function changeHandlerDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault;
        setDescription(e.target.value);
    }

    function changeHandlerTags(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setTag(e.target.value);
    }

    function createCodeHandler() {
        if (code == '' || img == '' || description == '' || tag == '') {
            setErr('All contents must be fill');
            return;
        }

        const addCodeVariable: CreateCodeMutationVariables = {
            code: code,
            img: img,
            description: description,
            performance: 'good',
            star: [],
            tags: distinctArray(tag.split(',')), // tag -> array tags
            access: 0,
        };
        addCodeMutation
            .mutateAsync(addCodeVariable, option)
            .then((res) => {
                animation.current = anime({
                    targets: '#modal',
                    scale: [1, 0],
                    opacity: [1, 0],
                    delay: anime.stagger(10),
                    loop: false,
                    direction: 'alternate',
                    duration: 300,
                    easing: 'easeInOutSine',
                });
                setTimeout(() => {
                    setCreateCodeModal(false);
                }, 200);
            })
            .catch((err) => {
                if (String(err).includes('http: named cookie not present')) {
                    RemoveSessionStorage();
                    setErr('session timeout error: please login');
                    setSession(false);
                    // window.location.href = '/login';
                }
                if (err.response.status == 401) {
                    RemoveSessionStorage();
                    setErr('session timeout error: please login');
                    setSession(false);
                    // window.location.href = '/login';
                }
                if (String(err.response.errors[0].message).includes('duplicate')) {
                    setErr('Code filed error: This code is already exist');
                }
                if (img == '') {
                    setErr('Img field error: description not fill');
                }
                if (description == '') {
                    setErr('Description field error: description not fill');
                }
                if (tag == '') {
                    setErr('Tag field error: be careful with notation');
                }
            });
    }

    useEffect(() => {
        // modal animation
        animation.current = anime({
            targets: '#modal',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(10),
            loop: false,
            direction: 'alternate',
            duration: 300,
            easing: 'easeInOutSine',
        });
    }, []);

    return (
        <>
            <section id='modal' className={styles.modal}>
                <div className={styles.flex_box}>
                    <button
                        className={styles.close_btn}
                        onClick={() => {
                            modalCloseHandler();
                        }}
                    >
                        ❌
                    </button>
                </div>

                <h1 className={styles.text}>Create Code</h1>

                <div className={styles.input_box}>
                    <p className={styles.text}>image</p>

                    {imageStr == '' ? (
                        <input
                            type='file'
                            name='image'
                            accept='image/png, image/jpeg'
                            value={imageStr}
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
                </div>

                <div>
                    <div className={styles.input_box}>
                        <p className={styles.text}>code</p>
                        <textarea
                            name='code'
                            value={code}
                            rows={120}
                            cols={5}
                            className={styles.input}
                            placeholder='code'
                            onChange={(e) => changeHandlerCode(e)}
                            required
                        />
                    </div>

                    <div className={styles.input_box}>
                        <p className={styles.text}>description</p>
                        <textarea
                            name='description'
                            value={description}
                            rows={120}
                            cols={5}
                            className={styles.input}
                            placeholder='description'
                            onChange={(e) => changeHandlerDescription(e)}
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
                            placeholder='tags (go,rust,sql...)'
                            onChange={(e) => changeHandlerTags(e)}
                            required
                        />
                    </div>
                </div>

                {err != '' && (
                    <div className={styles.err}>
                        <p>{err}</p>
                    </div>
                )}

                {session ? (
                    <div className={styles.btn_box}>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                createCodeHandler();
                            }}
                        >
                            Create
                        </button>
                    </div>
                ) : (
                    <div></div>
                )}
            </section>

            {/* modal background blur */}
            <div className={styles.overlay}></div>
        </>
    );
}

export default CreateCodeModal;
