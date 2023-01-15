import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { pageState, pathState, sessionState } from '../../../recoil/global';
import styles from './Header.module.scss';
import CasesRoundedIcon from '@mui/icons-material/CasesRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import { GetCookie, RemoveCookie } from 'utils/cookie';
import { bodyRenderComponentState, categoryState, keywordState } from 'recoil/input';
import { RemoveSessionStorage, GetSessionStorage } from 'utils/session';

function Header() {
    const [path, _] = useRecoilState<string>(pathState); // header current state -> blue text
    const [__, setPage] = useRecoilState<number>(pageState); // pagination state

    // keyword search value
    const [value, setValue] = useRecoilState<string>(keywordState);
    // render state
    const [___, setCurrRender] = useRecoilState<string>(bodyRenderComponentState);
    // category state
    const [____, setCategory] = useRecoilState(categoryState);
    const [session, setSession] = useRecoilState<boolean>(sessionState);

    useEffect(() => {
        setSession(GetSessionStorage() != null);
    }, []);

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setValue(e.target.value);
    }

    // enter key search
    function enterHandler(e: any) {
        e.preventDefault;
        if (e.key != 'Enter') {
            return;
        }
        window.onkeydown;
        setPage(1);
        setCategory('');
        setCurrRender('keyword'); // update render state
    }

    function logoutHandler() {
        // RemoveCookie();
        RemoveSessionStorage();
        window.location.href = '/';
    }

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
                {path == '/' && (
                    <div>
                        <input
                            type='text'
                            value={value}
                            className={styles.input}
                            placeholder='Search...'
                            onChange={(e) => changeHandler(e)}
                            onKeyDown={(e) => enterHandler(e)}
                        />
                    </div>
                )}
            </div>

            {session ? (
                <div className={styles.sign_box}>
                    {path == '/collection' ? (
                        <div>
                            <CasesRoundedIcon sx={{ color: blue[700] }} fontSize='large' />
                        </div>
                    ) : (
                        <Link href='/collection'>
                            <CasesRoundedIcon className={styles.cart_icon} />
                        </Link>
                    )}

                    {path == '/edit' ? (
                        <div className={styles.sign_text}>
                            <BorderColorRoundedIcon sx={{ color: blue[700] }} fontSize='large' />
                        </div>
                    ) : (
                        <Link href='/edit'>
                            <div className={styles.sign_text}>
                                <BorderColorRoundedIcon className={styles.edit_icon} />
                            </div>
                        </Link>
                    )}

                    <div>
                        <p className={styles.sign_text} onClick={() => logoutHandler()}>
                            Logout
                        </p>
                    </div>
                </div>
            ) : (
                <div className={styles.sign_box}>
                    {path == '/signup' ? (
                        <p className={styles.current_path}>Signup</p>
                    ) : (
                        <Link href='/signup'>
                            <p className={styles.sign_text}>Signup</p>
                        </Link>
                    )}

                    {path == '/login' ? (
                        <p className={styles.current_path}>Login</p>
                    ) : (
                        <Link href='/login'>
                            <p className={styles.sign_text}>Login</p>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
