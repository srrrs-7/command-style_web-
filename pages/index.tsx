import React, { useEffect } from 'react';
import Body from '../Body/Body';
import Footer from '../Body/components/Footer/Footer';
import Header from '../Body/components/Header/Header';
import Star from '../Anime/Star/Star';
import ModalAnime from 'Anime/Modal/ModalAnime';

export default function Home() {
    useEffect(() => {
        if (window.name == 'reload') {
            window.name = '';
        }
    });

    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Body />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
