import React, { useEffect } from 'react';
import Footer from '../Body/components/Footer/Footer';
import Header from '../Body/components/Header/Header';
import Error from '../Error/Error';

export default function ErrorPage() {
    return (
        <div>
            <div>
                <div>
                    <Header />
                </div>

                <div>
                    <Error />
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
