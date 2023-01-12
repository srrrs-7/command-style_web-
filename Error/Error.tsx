import React, { useEffect } from 'react';
import styles from './Error.module.scss';

function Error() {
    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/';
        }, 5000);
    });

    return (
        <div>
            <div className={styles.box}>
                <div className={styles.board}>
                    <div className={styles.title}>
                        <p>This page is not exist</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
