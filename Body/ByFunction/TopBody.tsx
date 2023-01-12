import React, { useEffect } from 'react';
import styles from './Function.module.scss';
import { useRecoilState } from 'recoil';
import { GetAllCodesQueryVariables, UpdateAccessMutationVariables, useGetAllCodesQuery, useUpdateAccessMutation } from '../../graphql/types/graphql';
import { client, option, NewHeader } from '../../graphql/client';
import { RemoveCookie } from 'utils/cookie';
import Modal from '../components/Modal/Modal';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { pageState } from 'recoil/global';
import { codeIdState, createCodeModalState, getCodeModalState } from 'recoil/modal';
import { timeRegexp } from 'utils/regexp';
import CreateCodeModal from 'Body/components/CreateCodeModal/CreateCodeModal';
import { RemoveSessionStorage } from 'utils/session';

function TopBody() {
    const [page, _] = useRecoilState<number>(pageState);
    // modal state
    const [__, setCodeId] = useRecoilState<number>(codeIdState);
    const [isGetCodeModal, setIsGetCodeModal] = useRecoilState<boolean>(getCodeModalState); // get product and show modal
    const [createCodeModal, ___] = useRecoilState<boolean>(createCodeModalState); // create modal state

    // update access count
    const updateAccessMutation = useUpdateAccessMutation(client, option, NewHeader());

    // get all products
    const variable: GetAllCodesQueryVariables = { limit: 30, skip: 30 * (page - 1) };
    const { data, isError, refetch, fetchStatus, status, failureReason, failureCount } = useGetAllCodesQuery(client, variable, option, NewHeader());
    if (failureCount == 4) {
        RemoveSessionStorage();
    }

    // modal handler
    function showModalHandler(codeId: number) {
        // update access
        const updateAccessVariable: UpdateAccessMutationVariables = { id: codeId, access: 1 };
        updateAccessMutation.mutateAsync(updateAccessVariable, option).catch((err) => {
            console.log(err);
        });

        setCodeId(codeId); // set code id for modal
        setIsGetCodeModal(true); // show modal
    }

    // refetch when toggle star
    useEffect(() => {
        refetch();
    }, [isGetCodeModal, createCodeModal]);

    return (
        <>
            {isGetCodeModal && <Modal />}
            {createCodeModal && <CreateCodeModal />}

            <div>
                {data?.getAllCodes.length == 0 ? (
                    <div className={styles.flex_box}>
                        <p>No items</p>
                    </div>
                ) : (
                    <div className={styles.flex_box}>
                        <p>{data?.getAllCodes.length} items</p>
                    </div>
                )}
            </div>

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllCodes.map((c) => (
                        <div id='image_icon' className={styles.grid_items} key={c.id} onClick={() => showModalHandler(parseInt(c.id))}>
                            {c.img == '' ? (
                                <img src='logo.png' alt='no_image' width={60} height={35} />
                            ) : (
                                <img src={c?.img} alt='no_image' width={60} height={35} />
                            )}

                            <div className={styles.code_box}>
                                <p className={styles.text}>{c?.code}</p>
                            </div>

                            {c.tags.length == 0 ? (
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
        </>
    );
}

export default TopBody;
