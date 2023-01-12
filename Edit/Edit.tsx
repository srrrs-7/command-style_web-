import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { useRecoilState } from 'recoil';
import {
    UpdateAccessMutationVariables,
    useUpdateAccessMutation,
    GetAllOwnCodesQueryVariables,
    useGetAllOwnCodesQuery,
} from '../graphql/types/graphql';
import { client, option, NewHeader } from '../graphql/client';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import EditModal from './EditModal/EditModal';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import { pageState, pathState } from 'recoil/global';
import { codeIdState, createCodeModalState, editCodeModalState } from 'recoil/modal';
import { timeRegexp } from 'utils/regexp';
import Pagination from '../Body/components/Pagination/Pagination';
import CreateCodeModal from 'Body/components/CreateCodeModal/CreateCodeModal';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function TopBody() {
    const [_, setPath] = useRecoilState<string>(pathState); // header current state -> blue text
    const [page, __] = useRecoilState<number>(pageState);
    // modal state
    const [createCodeModal, setCreateCodeModal] = useRecoilState<boolean>(createCodeModalState); // create modal state
    const [isEditCodeModal, setIsEditCodeModal] = useRecoilState<boolean>(editCodeModalState); // get code and show modal
    const [___, setCodeId] = useRecoilState<number>(codeIdState); // code id state for modal
    // update access count
    const updateAccessMutation = useUpdateAccessMutation(client, option, NewHeader());

    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() == null);
    });

    // getAllOwnCode
    const variable: GetAllOwnCodesQueryVariables = {
        limit: 30,
        skip: 30 * (page - 1),
    };
    const { data, isError, refetch, failureCount } = useGetAllOwnCodesQuery(client, variable, option, NewHeader());
    if (failureCount == 2) {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/';
    }

    useLayoutEffect(() => {
        setPath('/edit');
    }, []);

    // get a code
    function getCodeHandler(codeId: number) {
        // update access
        const updateAccessVariable: UpdateAccessMutationVariables = { id: codeId, access: 1 };
        updateAccessMutation.mutateAsync(updateAccessVariable, option).catch((err) => {
            console.log(err);
        });
        setCodeId(codeId);
        setIsEditCodeModal(true);
    }

    useEffect(() => {
        refetch();
    }, [createCodeModal, isEditCodeModal]);

    return (
        <>
            {isEditCodeModal && <EditModal />}
            {createCodeModal && <CreateCodeModal />}

            <div className={styles.lazy}>
                <p>Are you lazy ?</p>
            </div>

            <div>
                <Pagination />
            </div>

            <div>
                {data?.getAllOwnCodes.length == 0 ? (
                    <div className={styles.flex_box}>
                        <p>No items</p>
                    </div>
                ) : (
                    <div className={styles.flex_box}>
                        <p>{data?.getAllOwnCodes.length} items</p>
                    </div>
                )}
            </div>

            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {data?.getAllOwnCodes.map((c) => (
                        <div className={styles.grid_items} key={c.id} onClick={() => getCodeHandler(parseInt(c.id))}>
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

            {session ? (
                <div></div>
            ) : (
                <div
                    className={styles.create_code}
                    onClick={() => {
                        setCreateCodeModal(true);
                    }}
                >
                    <NoteAddRoundedIcon className={styles.create_code_icon} />
                </div>
            )}
        </>
    );
}

export default TopBody;
