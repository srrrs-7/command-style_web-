import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { pageState, pathState } from '../../../recoil/global';
import styles from './CollectionHeader.module.scss';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { collectionRenderState, collectionSearchState } from 'recoil/collection';
import { GetSessionStorage, RemoveSessionStorage } from 'utils/session';

function CollectionHeader() {
    const [path, setPath] = useRecoilState<string>(pathState); // header current state -> blue text
    const [_, setPage] = useRecoilState<number>(pageState); // pagination state

    const [keyword, setKeyword] = useRecoilState<string>(collectionSearchState); // input search value for search body

    const [__, setCollectionRender] = useRecoilState<string>(collectionRenderState); // collection render state

    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() == null);
    });

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setKeyword(e.target.value);
    }

    // enter key search
    function enterHandler(e: any) {
        e.preventDefault;
        if (e.key != 'Enter') {
            return;
        }
        window.onkeydown;
        setPage(1);
        setCollectionRender('search');
    }

    function logoutHandler() {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/';
    }

    // cookie logic for initial get
    useLayoutEffect(() => {
        setPath('/collection');
    });

    return (
        <div className={styles.box}>
            <div className={styles.title_box}>
                <Link href='/'>
                    <p
                        className={styles.text}
                        onClick={() => {
                            if (window.location.pathname == '/') {
                                window.location.reload();
                            }
                        }}
                    >
                        Command-Style
                    </p>
                </Link>
            </div>

            <div className={styles.input_box}>
                <div>
                    <input
                        type='text'
                        value={keyword}
                        className={styles.input}
                        placeholder='Search...'
                        onChange={(e) => changeHandler(e)}
                        onKeyDown={(e) => enterHandler(e)}
                    />
                </div>
            </div>

            {session ? (
                <div className={styles.sign_box}>
                    {path == '/signup' ? (
                        <p className={styles.current_path}>Signup</p>
                    ) : (
                        <Link href='/signup'>
                            <p className={styles.sign_text} onClick={() => setPath('/signup')}>
                                Signup
                            </p>
                        </Link>
                    )}

                    {path == '/login' ? (
                        <p className={styles.current_path}>Login</p>
                    ) : (
                        <Link href='/login'>
                            <p className={styles.sign_text} onClick={() => setPath('/login')}>
                                Login
                            </p>
                        </Link>
                    )}
                </div>
            ) : (
                <div className={styles.sign_box}>
                    {path == '/collection' ? (
                        <div>
                            <CasesRoundedIcon sx={{ color: blue[700] }} fontSize='large' />
                        </div>
                    ) : (
                        <Link href='/collection'>
                            <CasesRoundedIcon className={styles.cart_icon} onClick={() => setPath('/collection')} />
                        </Link>
                    )}

                    <div className={styles.sign_text}>
                        <Link href='/edit'>
                            <BorderColorRoundedIcon className={styles.edit_icon} onClick={() => setPath('/edit')} />
                        </Link>
                    </div>

                    <div>
                        <p className={styles.sign_text} onClick={() => logoutHandler()}>
                            Logout
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CollectionHeader;
