import React, { useEffect, useState } from 'react';
import styles from './TagBar.module.scss';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useRecoilState } from 'recoil';
import { bodyRenderComponentState, categoryState, getAllTagSearchState, keywordState } from 'recoil/input';
import { distinctArray } from 'utils/utilArray';

function TagBar() {
    const [value, setValue] = useState<string>('');
    const [tags, setTags] = useRecoilState<string[]>(getAllTagSearchState);
    // state update variable
    const [isAddTag, setIsAddTag] = useState<boolean>(false);
    const [isDeleteTag, setIsDeleteTag] = useState<boolean>(false);
    // render state
    const [____, setCurrRender] = useRecoilState<string>(bodyRenderComponentState);
    // category state
    const [_____, setCategory] = useRecoilState(categoryState);
    // keyword search
    const [______, setKeyword] = useRecoilState<string>(keywordState);

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault;
        setValue(e.target.value);
    }

    // enter key search
    function enterHandler(e: any) {
        e.preventDefault;
        if (value == '') {
            return;
        }
        if (e.key != 'Enter') {
            return;
        }
        window.onkeydown;
        setIsAddTag(true);
        const arr = [...tags, value];
        setTags(distinctArray(arr));

        setCurrRender('tags'); // update render state
        setCategory(''); // reset category
        setKeyword(''); // reset keyword
    }

    function deleteTag(i: number) {
        setIsDeleteTag(true);
        const arr = tags.slice(0, i).concat(tags.slice(i + 1, tags.length));
        setTags(arr);
    }

    useEffect(() => {
        setValue('');
        setIsAddTag(false);
        setIsDeleteTag(false);
    }, [isAddTag, isDeleteTag, tags]);

    return (
        <div className={styles.tag_bar_box}>
            {tags.length == 0 ? (
                <div className={styles.box_tag}>
                    <p>No tags...</p>
                </div>
            ) : (
                <div className={styles.box_tag}>
                    {tags.map((t, i) => (
                        <div
                            className={styles.tag}
                            key={i}
                            onClick={() => {
                                deleteTag(i);
                            }}
                        >
                            <p>{t}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.box}>
                <input
                    type='text'
                    value={value}
                    className={styles.input}
                    placeholder='Tags...'
                    onChange={(e) => changeHandler(e)}
                    onKeyDown={(e) => enterHandler(e)}
                />
            </div>
        </div>
    );
}

export default TagBar;
