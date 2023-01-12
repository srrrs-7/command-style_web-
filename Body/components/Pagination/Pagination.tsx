import React from 'react';
import styles from './Paginatioin.module.scss';
import FirstPageTwoToneIcon from '@mui/icons-material/FirstPageTwoTone';
import LastPageTwoToneIcon from '@mui/icons-material/LastPageTwoTone';
import { useRecoilState } from 'recoil';
import { pageState } from 'recoil/global';

function Pagination() {
    const [page, setPage] = useRecoilState(pageState);

    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // page that visited once is data cache
    function onClickHandler(num: number) {
        if (num < 1) return;
        else if (num > 9) return;
        else setPage(num);
    }

    return (
        <>
            <div className={styles.box}>
                <div
                    className={styles.pageIcon}
                    onClick={() => {
                        onClickHandler(page - 1);
                    }}
                >
                    <FirstPageTwoToneIcon />
                </div>

                {pages.map((p) => (
                    <div className={styles.page} key={p}>
                        {page == p ? (
                            <p
                                className={styles.select}
                                onClick={() => {
                                    onClickHandler(p);
                                }}
                            >
                                {p}
                            </p>
                        ) : (
                            <p
                                className={styles.text}
                                onClick={() => {
                                    onClickHandler(p);
                                }}
                            >
                                {p}
                            </p>
                        )}
                        {pages.length != p && <p className={styles.border}> | </p>}
                    </div>
                ))}

                <div
                    className={styles.pageIcon}
                    onClick={() => {
                        onClickHandler(page + 1);
                    }}
                >
                    <LastPageTwoToneIcon />
                </div>
            </div>
        </>
    );
}

export default Pagination;
