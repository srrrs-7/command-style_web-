import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './Modal.module.scss';
import {
    GetCodeQueryVariables,
    useGetCodeQuery,
    CreateCollectionMutationVariables,
    useCreateCollectionMutation,
    UpdateStarMutationVariables,
    useUpdateStarMutation,
} from '../../../graphql/types/graphql';
import { client, NewHeader, option } from 'graphql/client';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { codeIdState, getCodeModalState } from 'recoil/modal';
import anime from 'animejs';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function Modal() {
    const [_, setIsGetCodeModal] = useRecoilState<boolean>(getCodeModalState); // get code and show modal
    const [codeId, __] = useRecoilState<number>(codeIdState);
    // refetch state
    const [star, setStar] = useState<boolean>(false);
    const [session, setSession] = useState<boolean>(false);
    useEffect(() => {
        setSession(GetSessionStorage() != null);
    });
    // anime ref
    const animation = useRef<any>(null);

    // create collection mutation
    const addCollectionMutation = useCreateCollectionMutation(client, option, NewHeader());
    // toggle update star mutation
    const updateStarMutation = useUpdateStarMutation(client, option, NewHeader());
    // get code query
    const getCodeVariable: GetCodeQueryVariables = { id: codeId };
    const { data, isError, refetch } = useGetCodeQuery(client, getCodeVariable, option, NewHeader());
    if (isError && data == undefined) {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/login';
    }

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
            setIsGetCodeModal(false);
        }, 200);
    }

    // toggle star
    function toggleStar() {
        // toggle star animation
        animation.current = anime({
            targets: '#star',
            translateX: [0, 0],
            translateY: [0, 0],
            scale: [1, 2, 1],
            loop: false,
            direction: 'alternate',
            easing: 'easeInOutSine',
            duration: 800,
        });

        setTimeout(() => {
            // update star
            const updateStarVariables: UpdateStarMutationVariables = { code_id: codeId };
            updateStarMutation
                .mutateAsync(updateStarVariables, option)
                .then((res) => {
                    setStar(!star);
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        // RemoveCookie;
                        RemoveSessionStorage();
                        window.location.href = '/login';
                    }
                });
        }, 1000);
    }

    function addCartHandler() {
        const addCollectionVariable: CreateCollectionMutationVariables = { code_id: codeId };
        addCollectionMutation
            .mutateAsync(addCollectionVariable, option)
            .then((res) => {
                // update star
                const updateStarVariables: UpdateStarMutationVariables = { code_id: codeId };
                updateStarMutation
                    .mutateAsync(updateStarVariables, option)
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
                            setIsGetCodeModal(false);
                        }, 200);
                    })
                    .catch((err) => {
                        if (err.response.status == 401) {
                            // RemoveCookie;
                            RemoveSessionStorage();
                            window.location.href = '/login';
                        }
                    });
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    // RemoveCookie();
                    RemoveSessionStorage();
                    window.location.href = '/login';
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

    useEffect(() => {
        refetch();
    }, [star]);

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

                <h3 className={styles.text}>{data?.getCode?.id}</h3>

                <div className={styles.content}>
                    {data?.getCode?.img == '' ? (
                        <img src='penguin.png' alt='no_image' width={100} height={70} />
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
                                <div
                                    className={styles.accessBox}
                                    onClick={() => {
                                        toggleStar();
                                    }}
                                >
                                    <StarRateRoundedIcon id='star' className={styles.starIcon} />
                                    <p>{data?.getCode?.star?.length}</p>
                                </div>
                            ) : (
                                <div
                                    className={styles.accessBox}
                                    onClick={() => {
                                        toggleStar();
                                    }}
                                >
                                    <StarBorderRoundedIcon id='star' className={styles.blankStarIcon} />
                                    <p>{data?.getCode?.star?.length}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.accessBox}>
                            <p>{data?.getCode?.access} views</p>
                            {/* toggle star logic */}
                            {data?.getCode?.star.includes(data.getCode.user_id) ? (
                                <div className={styles.accessBox}>
                                    <StarRateRoundedIcon id='star' className={styles.noActionStarIcon} />
                                    <p>{data?.getCode?.star?.length}</p>
                                </div>
                            ) : (
                                <div>
                                    <div className={styles.accessBox}>
                                        <StarBorderRoundedIcon id='star' className={styles.noActionBlankStarIcon} />
                                        <p>{data?.getCode?.star?.length}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {session ? (
                    <div className={styles.add_cart}>
                        <button
                            className={styles.btn}
                            onClick={() => {
                                addCartHandler();
                            }}
                        >
                            Add Collection
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

export default Modal;
