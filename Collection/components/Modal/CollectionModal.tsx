import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './CollectionModal.module.scss';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { client, NewHeader, option } from 'graphql/client';
import {
    useDeleteCollectionMutation,
    DeleteCollectionMutationVariables,
    useUpdateStarMutation,
    UpdateStarMutationVariables,
    GetCodeQueryVariables,
    useGetCodeQuery,
} from 'graphql/types/graphql';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { codeIdState, collectionModalState } from 'recoil/modal';
import { collectionIdState } from 'recoil/collection';
import anime from 'animejs';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function CartModal() {
    const [star, setStar] = useState<boolean>(false);
    // cart modal state
    const [_, setIsCollectionModal] = useRecoilState<boolean>(collectionModalState);
    // get product modal value
    const [codeId, __] = useRecoilState<number>(codeIdState); // code id state for modal
    const [collectionIdForDelete, ___] = useRecoilState<number>(collectionIdState);

    // toggle update star mutation
    const updateStarMutation = useUpdateStarMutation(client, option, NewHeader());
    // delete a cart mutation
    const deleteMutation = useDeleteCollectionMutation(client, option, NewHeader());

    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() == null);
    });

    const getCodeVariable: GetCodeQueryVariables = { id: codeId };
    const { data, isError, refetch, failureCount } = useGetCodeQuery(client, getCodeVariable, option, NewHeader());
    if (failureCount == 2) {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/';
    }

    // anime ref
    const animation = useRef<any>(null);

    // close modal
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
            setIsCollectionModal(false);
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
            // update star animation
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
        }, 800);
    }

    // delete a cart item mutation
    function deleteHandler() {
        const deleteCollectionVariable: DeleteCollectionMutationVariables = { id: collectionIdForDelete };

        const ok = window.confirm('Delete a Item ?');
        if (!ok) {
            return;
        }

        deleteMutation
            .mutateAsync(deleteCollectionVariable, option)
            .then((res) => {
                setIsCollectionModal(false);
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    // RemoveCookie;
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
                        <img src='penguin.png' alt='code_image' width={100} height={70} />
                    ) : (
                        <img src={data?.getCode?.img} alt='code_image' width={100} height={70} />
                    )}

                    <div className={styles.text_box}>
                        <p className={styles.text}>{data?.getCode?.code}</p>
                    </div>

                    {data?.getCode?.description == '' ? (
                        <div>
                            <p>No description</p>
                        </div>
                    ) : (
                        <p>{data?.getCode?.description}</p>
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
                    ) : (
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
                    )}
                </div>

                <div className={styles.btn}>
                    <div
                        onClick={() => {
                            deleteHandler();
                        }}
                    >
                        <DeleteOutlineTwoToneIcon className={styles.trash} />
                    </div>
                </div>
            </section>

            <div className={styles.overlay}></div>
        </>
    );
}

export default CartModal;
