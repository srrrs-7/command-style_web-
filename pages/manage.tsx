import Footer from 'Body/components/Footer/Footer';
import ManageHeader from '../Management/create/Header/ManageHeader';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ManageLogin from '../Management/create/Login/ManageLogin';
import Manage from '../Management/Manage';
import AdminCategoryBar from '../Management/create/AdminCategoryBar/AdminCategoryBar';
import { GetAdminCookie } from 'utils/cookie';
import { adminState } from 'recoil/manage';
import { GetSessionStorage } from 'utils/session';

function manage() {
    const [adminRender, _] = useRecoilState<boolean>(adminState);

    return (
        <>
            <ManageHeader />
            {adminRender && <AdminCategoryBar />}
            {adminRender ? <Manage /> : <ManageLogin />}
            <Footer />
        </>
    );
}

export default manage;
