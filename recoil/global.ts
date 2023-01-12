import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// pagination
export const pageState = atom<number>({
    key: 'pageState',
    default: 1,
});

// current path
export const pathState = atom<string>({
    key: 'pathState',
    default: '/',
});
