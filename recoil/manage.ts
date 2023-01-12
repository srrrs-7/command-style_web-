import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// admin state management
export const createState = atom<string>({
    key: 'createState',
    default: 'media',
});

// is admin?
export const adminState = atom<boolean>({
    key: 'adminState',
    default: false,
});
