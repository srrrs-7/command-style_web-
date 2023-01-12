import Edit from '../Edit/Edit';
import Footer from 'Body/components/Footer/Footer';
import Header from 'Body/components/Header/Header';
import React from 'react';

function edit() {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>
                <Edit />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default edit;
