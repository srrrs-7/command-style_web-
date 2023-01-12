import React, { useEffect, useState } from 'react';
import styles from './Collection.module.scss';
import { useRecoilState } from 'recoil';
import { option, client, NewHeader } from 'graphql/client';
import Pagination from 'Body/components/Pagination/Pagination';
import { RemoveCookie } from 'utils/cookie';
import KeyboardCapslockTwoToneIcon from '@mui/icons-material/KeyboardCapslockTwoTone';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import Footer from 'Body/components/Footer/Footer';
import { pageState } from 'recoil/global';
import { codeIdState, collectionModalState } from 'recoil/modal';
import { collectionIdState } from 'recoil/collection';
import CollectionModal from '../Modal/CollectionModal';
import {
    useGetCollectionMutation,
    GetAllCollectionQueryVariables,
    useGetAllCollectionQuery,
    GetCollectionMutationVariables,
} from 'graphql/types/graphql';
import CollectionHeader from '../Header/CollectionHeader';
import { timeRegexp } from 'utils/regexp';
import { RemoveSessionStorage } from 'utils/session';

function TopCollectionBody() {
    // pagination state
    const [page, __] = useRecoilState(pageState);
    // modal state
    const [isCollectionModal, setIsCollectionModal] = useRecoilState<boolean>(collectionModalState);
    // get product modal value  -> pass modal
    const [codeId, setCodeId] = useRecoilState<number>(codeIdState); // code id state for modal
    const [collectionIdForDelete, setCollectionIdForDelete] = useRecoilState<number>(collectionIdState);

    // get a cart mutation
    const getMutation = useGetCollectionMutation(client, option, NewHeader());

    // get all cart
    const getAllVariable: GetAllCollectionQueryVariables = { limit: 30, skip: 30 * (page - 1) };
    const { data, isError, refetch, failureCount } = useGetAllCollectionQuery(client, getAllVariable, option, NewHeader());
    if (failureCount == 2) {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/';
    }

    // show modal
    function collectionModalHandler(id: number, collection_id: number) {
        const getVariable: GetCollectionMutationVariables = { id: id };
        getMutation
            .mutateAsync(getVariable, option)
            .then((res) => {
                setCollectionIdForDelete(collection_id);
            })
            .catch((err) => {
                // RemoveCookie();
                RemoveSessionStorage();
                window.location.href = '/login';
            });

        setCodeId(id);
        setIsCollectionModal(true); // show modal
    }

    // from bottom to top
    function returnTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        refetch();
    }, [isCollectionModal]);

    return (
        <>
            <div>{isCollectionModal && <CollectionModal />}</div>

            <div className={styles.lazy}>
                <p>Are you lazy ?</p>
            </div>

            <div>
                <CollectionHeader />
            </div>

            <div>
                <Pagination />
            </div>

            <div>
                {data?.getAllCollection.length == 0 ? (
                    <div className={styles.flex_box}>
                        <p>No items</p>
                    </div>
                ) : (
                    <div className={styles.flex_box}>
                        <p>{data?.getAllCollection.length} items</p>
                    </div>
                )}
            </div>

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllCollection.map((c) => (
                        <div
                            className={styles.grid_items}
                            key={c?.collection_id}
                            onClick={() => {
                                collectionModalHandler(parseInt(c?.id), c?.collection_id);
                            }}
                        >
                            {c.img == '' ? (
                                <img src='logo.png' alt='code_image' width={60} height={35} />
                            ) : (
                                <img src={c?.img} alt='code_image' width={60} height={35} />
                            )}

                            <div className={styles.code_box}>
                                <p className={styles.text}>{c?.code}</p>
                            </div>

                            {c?.tags.length == 0 ? (
                                <div>No tags</div>
                            ) : (
                                <div className={styles.box_tag}>
                                    {c.tags.map((t, i) => (
                                        <div key={i}>
                                            <p className={styles.tag}>{t}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {c.star.includes(c.user_id) ? (
                                <div className={styles.accessBox}>
                                    <p>{c.access} views</p>

                                    <div className={styles.accessBox}>
                                        <StarRateRoundedIcon className={styles.accessIcon} />
                                        <p>{c.star.length}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.accessBox}>
                                    <p>{c.access} views</p>

                                    <div className={styles.accessBox}>
                                        <StarBorderRoundedIcon className={styles.blankIcon} />
                                        <p>{c.star.length}</p>
                                    </div>
                                </div>
                            )}

                            <p>{timeRegexp(c.created_at)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.top}>
                <KeyboardCapslockTwoToneIcon
                    className={styles.topIcon}
                    onClick={() => {
                        returnTop();
                    }}
                />
                <p>To the top</p>
            </div>

            <div>
                <Footer />
            </div>
        </>
    );
}

export default TopCollectionBody;
