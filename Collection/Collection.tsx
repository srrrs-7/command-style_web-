import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { collectionRenderState } from 'recoil/collection';
import { GetCookie } from 'utils/cookie';
import SearchCollectionBody from './components/Body/SearchCollectionBody';
import TopCollectionBody from './components/Body/TopCollectionBody';
import { GetSessionStorage } from 'utils/session';

function Collection() {
    const [collectionRender, _] = useRecoilState<string>(collectionRenderState);
    const [session, setSession] = useState<boolean>(false);

    useEffect(() => {
        setSession(GetSessionStorage() != null);
    });

    useEffect(() => {
        if (session) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div>
            {collectionRender == 'top' && <TopCollectionBody />}
            {collectionRender == 'search' && <SearchCollectionBody />}
        </div>
    );
}

export default Collection;
