import React, { useCallback, useEffect, useRef, useState } from 'react';
import './DraftEditor.module.scss';
import { Editor, EditorCommand, EditorState, RichUtils } from 'draft-js';
import styles from './DraftEditor.module.scss';

function DraftEditor() {
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    // editor ref
    const editor = useRef<null | Editor>(null);

    // bold button
    function boldHandler() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'bold'));
    }
    // under line button
    function underLineHandler() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    const focusEditor = useCallback(() => {
        editor.current && editor.current.focus();
    }, []);

    const handleShortcutKey = useCallback((command: EditorCommand, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }, []);

    useEffect(() => {
        setShowEditor(true);
    }, [editorState]);

    return (
        <>
            <div>
                <div className={styles.btn_box}>
                    <h2 className={styles.btn} onClick={() => boldHandler()}>
                        B
                    </h2>
                    <h2 className={styles.btn} onClick={() => underLineHandler()}>
                        U
                    </h2>
                </div>

                {showEditor && (
                    <div className={styles.editor} onClick={() => focusEditor()}>
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            handleKeyCommand={handleShortcutKey}
                            readOnly={false}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default DraftEditor;
