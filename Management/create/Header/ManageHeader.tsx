import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './ManageHeader.module.scss';
import Link from 'next/link';
import { GetAdminCookie, GetCookie, RemoveAdminCookie } from 'utils/cookie';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function ManageHeader() {
    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() == null);
    });
    function logoutHandler() {
        // RemoveAdminCookie();
        RemoveSessionStorage();
        window.location.reload();
    }

    return (
        <div className={styles.box}>
            <div className={styles.title_box}>
                <Link href={'/'}>
                    <p className={styles.text}>Loose Style</p>
                </Link>
                {session ? (
                    <div>
                        <p className={styles.login_text}>login</p>
                    </div>
                ) : (
                    <div>
                        <p className={styles.logout_text} onClick={() => logoutHandler()}>
                            Logout
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageHeader;
