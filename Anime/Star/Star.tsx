import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Star.module.scss';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import anime from 'animejs';

const ticks = Array.from(Array(8));

function Star() {
    const animation = useRef<any>(null);

    function starAnime() {
        animation.current = anime({
            targets: '.star',
            translateX: [0, 0],
            translateY: [0, 0],
            scale: [1, 2, 1],
            delay: anime.stagger(50),
            loop: false,
            direction: 'alternate',
            easing: 'easeInOutSine',
        });
    }

    return (
        <div>
            <button onClick={() => starAnime()}>restart</button>
            <StarRateRoundedIcon className='star' />
        </div>
    );
}

export default Star;
