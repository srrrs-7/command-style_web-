import Footer from 'Body/components/Footer/Footer';
import Header from 'Body/components/Header/Header';
import Login from 'Body/components/Login/Login';
import React from 'react';

function login() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Login />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default login;
