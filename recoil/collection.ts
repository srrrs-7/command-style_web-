import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// collection id state for delete collection item
export const collectionIdState = atom<number>({
    key: 'collectionIdState',
    default: 0,
});

// collection body render state for render search body and top body
export const collectionRenderState = atom<string>({
    key: 'collectionRenderState',
    default: 'top',
});

// input search value
export const collectionSearchState = atom<string>({
    key: 'collectionSearchState',
    default: '',
});
