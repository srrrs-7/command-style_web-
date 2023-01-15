import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './EditModal.module.scss';
import { UpdateCodeMutationVariables, useUpdateCodeMutation, GetCodeQueryVariables, useGetCodeQuery } from '../../graphql/types/graphql';
import { client, NewHeader, option } from 'graphql/client';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { codeIdState, editCodeModalState } from 'recoil/modal';
import { distinctArray } from 'utils/utilArray';
import anime from 'animejs';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function EditModal() {
    const [codeText, setCodeText] = useState<string>('');
    const [img, setImg] = useState<string | ArrayBuffer | null | undefined | any>();
    const [imageStr, setImageStr] = useState<string>();
    const [description, setDescription] = useState<string>('');
    const [performance, setPerformance] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    // show edit display
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    // update code modal state
    const [isEditCodeModal, setIsEditCodeModal] = useRecoilState<boolean>(editCodeModalState); // get code and show modal
    const [codeId, __] = useRecoilState<number>(codeIdState); // code id state for modal
    // error state
    const [err, setErr] = useState<string>('');
    const [session, setSession] = useState<boolean>(false);
    // animation ref
    const animation = useRef<any>(null);

    // toggle update star mutation
    const updateCodeMutation = useUpdateCodeMutation(client, option, NewHeader());

    const getCodeVariable: GetCodeQueryVariables = { id: codeId };
    const { data, isError, refetch, failureCount } = useGetCodeQuery(client, getCodeVariable, option, NewHeader());
    if (failureCount == 2) {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/login';
    }

    useEffect(() => {
        setSession(GetSessionStorage() == null);
        refetch();
    }, [showEditModal, isEditCodeModal, session]);

    useLayoutEffect(() => {
        setCodeText(data?.getCode?.code!);
        setImg(data?.getCode?.img!);
        setImageStr(data?.getCode?.img!);
        setDescription(data?.getCode?.description!);
        setPerformance(data?.getCode?.performance!);
        setTag(data?.getCode?.tags!.join(',')!);
    }, []);

    useEffect(() => {
        setCodeText(data?.getCode?.code!);
        setImg(data?.getCode?.img!);
        setImageStr(data?.getCode?.img!);
        setDescription(data?.getCode?.description!);
        setPerformance(data?.getCode?.performance!);
        setTag(data?.getCode?.tags!.join(',')!);
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
    }, [showEditModal]);

    // modal close
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
            setIsEditCodeModal(false);
            setShowEditModal(false);
        }, 200);
    }

    function updateCodeHandler(codeId: number) {
        if (codeText == '' || img == '' || description == '' || tag == '') {
            setErr('All contents must be fill');
            return;
        }
        const updateCodeVariable: UpdateCodeMutationVariables = {
            id: codeId,
            code: codeText,
            img: img,
            description: description,
            performance: performance,
            tags: distinctArray(tag.replaceAll(/\s+/g, '').split(',')), // tag -> array tags
        };
        updateCodeMutation
            .mutateAsync(updateCodeVariable, option)
            .then((res) => {
                setShowEditModal(false);
                setIsEditCodeModal(false);
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

    // show edit display
    function showEditDisplay() {
        setShowEditModal(true);
    }

    function changeHandlerCode(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault;
        setCodeText(e.target.value);
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

    return (
        <>
            {showEditModal ? (
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
                            <label className={styles.text}>code</label>
                            <textarea
                                name='code'
                                value={codeText}
                                rows={120}
                                cols={5}
                                className={styles.input}
                                placeholder='code'
                                onChange={(e) => changeHandlerCode(e)}
                                required
                            />
                        </div>

                        <div className={styles.input_box}>
                            <label className={styles.text}>description</label>
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
                            <label className={styles.text}>tags</label>
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

                    <div>
                        {err && (
                            <div className={styles.err}>
                                <p>error: please all element fill</p>
                            </div>
                        )}
                    </div>

                    {session ? (
                        <div></div>
                    ) : (
                        <div className={styles.btn_box}>
                            <button
                                className={styles.btn}
                                onClick={() => {
                                    updateCodeHandler(parseInt(data?.getCode?.id!));
                                }}
                            >
                                Update
                            </button>
                        </div>
                    )}
                </section>
            ) : (
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

                    <h3 className={styles.text}>{data?.getCode?.id}</h3>

                    <div className={styles.content}>
                        {data?.getCode?.img == '' ? (
                            <img src='logo.png' alt='no_image' width={100} height={70} />
                        ) : (
                            <img src={data?.getCode?.img} alt='no_image' width={100} height={70} />
                        )}

                        <div className={styles.text_box}>
                            <p className={styles.text}>{data?.getCode?.code}</p>
                        </div>

                        {data?.getCode?.description == '' ? (
                            <div>
                                <p>No description</p>
                            </div>
                        ) : (
                            <div>
                                <p>{data?.getCode?.description}</p>
                            </div>
                        )}

                        {data?.getCode?.tags.length == 0 ? (
                            <div>No tags</div>
                        ) : (
                            <div className={styles.box_tag}>
                                {data?.getCode?.tags.map((t: string, i: number) => (
                                    <div key={i}>
                                        <p className={styles.tag}>{t}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {session ? (
                            <div className={styles.accessBox}>
                                <p>{data?.getCode?.access} views</p>
                                {/* toggle star logic */}
                                {data?.getCode?.star.includes(data.getCode.user_id) ? (
                                    <div className={styles.accessBox}>
                                        <StarRateRoundedIcon className={styles.noActionStarIcon} />
                                        <p>{data?.getCode?.star?.length}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className={styles.accessBox}>
                                            <StarBorderRoundedIcon className={styles.noActionBlankStarIcon} />
                                            <p>{data?.getCode?.star?.length}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.accessBox}>
                                <p>{data?.getCode?.access} views</p>
                                {/* toggle star logic */}
                                {data?.getCode?.star.includes(data.getCode.user_id) ? (
                                    <div className={styles.accessBox}>
                                        <StarRateRoundedIcon className={styles.starIcon} />
                                        <p>{data?.getCode?.star?.length}</p>
                                    </div>
                                ) : (
                                    <div className={styles.accessBox}>
                                        <StarBorderRoundedIcon className={styles.blankStarIcon} />
                                        <p>{data?.getCode?.star?.length}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.edit}>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                showEditDisplay();
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </section>
            )}

            {/* modal background blur */}
            <div className={styles.overlay}></div>
        </>
    );
}

export default EditModal;
