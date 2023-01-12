import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from 'recoil/global';
import { bodyRenderComponentState, categoryState, getAllTagSearchState, keywordState } from 'recoil/input';
import styles from './CategoryBar.module.scss';

function CategoryBar() {
    const [category, setCategory] = useRecoilState(categoryState);
    const [_, setPage] = useRecoilState(pageState);
    const [__, setCurrRender] = useRecoilState<string>(bodyRenderComponentState); // current render state
    const [___, setTags] = useRecoilState<string[]>(getAllTagSearchState); // tags search args
    const [____, setValue] = useRecoilState<string>(keywordState); // input keyword value & 3 category input value

    function clickHandler(category: string) {
        setCategory(category);
        setPage(1);
        setCurrRender(category); // update render state
        setTags([]); // reset tags data
        setValue(''); // reset category
    }

    function clickKeywordSearchHandler(value: string) {
        setCategory(value);
        setValue(value);
        setCurrRender('keyword'); // update render state
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {category == 'access' ? (
                        <div className={styles.grid_items_current}>
                            <p>ACCESS</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('access')}>
                            <p>ACCESS</p>
                        </div>
                    )}

                    {category == 'sql' ? (
                        <div className={styles.grid_items_current}>
                            <p>SQL</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickKeywordSearchHandler('sql')}>
                            <p>SQL</p>
                        </div>
                    )}

                    {category == 'go' ? (
                        <div className={styles.grid_items_current}>
                            <p>GO</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickKeywordSearchHandler('go')}>
                            <p>GO</p>
                        </div>
                    )}

                    {category == 'rust' ? (
                        <div className={styles.grid_items_current}>
                            <p>LINUX</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickKeywordSearchHandler('rust')}>
                            <p>LINUX</p>
                        </div>
                    )}

                    {category == 'star' ? (
                        <div className={styles.grid_items_current}>
                            <p>STAR</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('star')}>
                            <p>STAR</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CategoryBar;
