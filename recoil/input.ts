import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// render body component per functional
export const bodyRenderComponentState = atom<string>({
    key: 'bodyRenderComponentState',
    default: 'top',
});

// product keyword input
export const keywordState = atom<string>({
    key: 'keywordState',
    default: '',
});

// tag search state -> pass tag array
export const getAllTagSearchState = atom<string[]>({
    key: 'getAllTagSearchState',
    default: [],
});

// current category -> dye blue
export const categoryState = atom<string>({
    key: 'categoryState',
    default: '',
});
