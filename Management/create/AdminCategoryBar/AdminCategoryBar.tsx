import React from 'react';
import { useRecoilState } from 'recoil';
import { createState } from 'recoil/manage';
import styles from './AdminCategoryBar.module.scss';

function AdminCategoryBar() {
    const [adminPath, setAdminPath] = useRecoilState<string>(createState);

    function clickHandler(path: string) {
        setAdminPath(path);
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.grid_box}>
                    {adminPath == 'access' ? (
                        <div className={styles.grid_items_current}>
                            <p>Admin</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('admin')}>
                            <p>Admin</p>
                        </div>
                    )}

                    {adminPath == 'code' ? (
                        <div className={styles.grid_items_current}>
                            <p>code</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('code')}>
                            <p>code</p>
                        </div>
                    )}

                    {adminPath == 'collection' ? (
                        <div className={styles.grid_items_current}>
                            <p>collection</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('collection')}>
                            <p>collection</p>
                        </div>
                    )}

                    {adminPath == 'media' ? (
                        <div className={styles.grid_items_current}>
                            <p>media</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('media')}>
                            <p>media</p>
                        </div>
                    )}

                    {adminPath == 'users' ? (
                        <div className={styles.grid_items_current}>
                            <p>users</p>
                        </div>
                    ) : (
                        <div className={styles.grid_items} onClick={() => clickHandler('users')}>
                            <p>users</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminCategoryBar;
