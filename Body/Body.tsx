import React, { useEffect, useState } from 'react';
import styles from './Body.module.scss';
import CategoryBar from './components/CategoryBar/CategoryBar';
import Pagination from './components/Pagination/Pagination';
import { useRecoilState } from 'recoil';
import { pathState } from '../recoil/global';
import KeyboardCapslockTwoToneIcon from '@mui/icons-material/KeyboardCapslockTwoTone';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import TopBody from './ByFunction/TopBody';
import Loading from './components/Loading.tsx/Loading';
import TagBar from 'Body/components/TagBar/TagBar';
import { bodyRenderComponentState } from 'recoil/input';
import SortedAccess from './ByFunction/SortedAccess';
import SortedStar from './ByFunction/SortedStar';
import TagsSearch from './ByFunction/TagsSearch';
import KeywordSearch from './ByFunction/KeywordSearch';
import { createCodeModalState } from 'recoil/modal';
import { GetCookie } from 'utils/cookie';
import { blue } from '@mui/material/colors';
import { GetSessionStorage } from 'utils/session';

function Body() {
    const [_, setPath] = useRecoilState<string>(pathState);
    // spinner timer
    const [isFetch, setIsFetch] = useState(true);
    // current render state
    const [currRender, __] = useRecoilState<string>(bodyRenderComponentState);
    // create code modal state
    const [___, setCreateCodeModal] = useRecoilState<boolean>(createCodeModalState);

    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() != null);
    });

    // auto top button
    function returnTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        setPath(window.location.pathname);
        setTimeout(() => {
            setIsFetch(false);
        }, 500);
    }, [currRender]);

    // Loading display render
    if (isFetch) {
        return <Loading />;
    }

    return (
        <>
            <div>
                <CategoryBar />
            </div>

            <div>
                <TagBar />
            </div>

            <div>
                <Pagination />
            </div>

            {currRender == 'top' && <TopBody />}
            {currRender == 'keyword' && <KeywordSearch />}
            {currRender == 'access' && <SortedAccess />}
            {currRender == 'star' && <SortedStar />}
            {currRender == 'tags' && <TagsSearch />}

            <div className={styles.top}>
                <KeyboardCapslockTwoToneIcon
                    className={styles.topIcon}
                    onClick={() => {
                        returnTop();
                    }}
                />
                <p>To the top</p>
            </div>

            {session ? (
                <div>
                    <NoteAddRoundedIcon
                        className={styles.create_code}
                        sx={{ color: blue[700] }}
                        fontSize='large'
                        onClick={() => {
                            setCreateCodeModal(true);
                        }}
                    />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default Body;
