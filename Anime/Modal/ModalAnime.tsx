import anime from 'animejs';
import React, { useRef, useState } from 'react';

function ModalAnime() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const animation = useRef<any>(null);

    function modalAnime() {
        setShowModal(true);
        animation.current = anime({
            targets: '#modal',
            opacity: [0, 1],
            delay: anime.stagger(10),
            loop: false,
            direction: 'alternate',
            duration: 1000,
            easing: 'easeInOutSine',
        });
    }

    return (
        <div>
            <button onClick={() => modalAnime()}>button</button>
            {showModal && <div id='modal'>modal</div>}
        </div>
    );
}

export default ModalAnime;
