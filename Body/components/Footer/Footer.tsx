import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

function Footer() {
    return (
        <div>
            <div className={styles.box}>
                <p className={styles.text}>Command-Style</p>
                <p className={styles.sub_text}> - To Be Lazy - </p>
                <section className={styles.icon_box}>
                    <Link href={'https://my-protfolio-chi.vercel.app/'} className={styles.oauth_icon}>
                        <h3>My Site</h3>
                    </Link>
                    <Link href={'https://github.com/sRRRs-7'} className={styles.oauth_icon}>
                        <img src='/github.svg' alt='github icon' width={40} height={40} />
                    </Link>
                </section>
            </div>
        </div>
    );
}

export default Footer;
