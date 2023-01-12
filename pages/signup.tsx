import Footer from 'Body/components/Footer/Footer';
import Header from 'Body/components/Header/Header';
import Signup from 'Body/components/Signup/Signup';
import React from 'react';

function signup() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Signup />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default signup;
