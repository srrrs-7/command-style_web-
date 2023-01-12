import React from 'react';
import styles from './Loading.module.scss';
import { DotLoader } from 'react-spinners';
import CategoryBar from '../CategoryBar/CategoryBar';

const Loading = () => {
    return (
        <>
            <section>
                <CategoryBar />
            </section>

            <section className={styles.spinnerBox}>
                <div>
                    <DotLoader color='rgb(94, 241, 241)' size={70} speedMultiplier={2} />
                </div>
            </section>
        </>
    );
};

export default Loading;
