import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// pass data to modal
export const codeIdState = atom<number>({
    key: 'codeState',
    default: 0,
});

// all product search ? or sort product search?
export const getCodeModalState = atom<boolean>({
    key: 'getCodeModalState',
    default: false,
});

// collection modal state
export const collectionModalState = atom<boolean>({
    key: 'collectionModalState',
    default: false,
});

// create code modal state
export const createCodeModalState = atom<boolean>({
    key: 'createCodeModalState',
    default: false,
});

// edit code modal
export const editCodeModalState = atom<boolean>({
    key: 'editCodeModalState',
    default: false,
});

// update code modal
export const updateCodeModalState = atom<boolean>({
    key: 'updateCodeModalState',
    default: false,
});
