export {playRandomAttackSound};

function playRandomAttackSound() {
    const selectType = Math.floor(Math.random() * 2) + 1;

    if (selectType === 1) {
        const rand = Math.floor(Math.random() * 5) + 1;
        const audio = new Audio(`../src/audio/memeattack/${rand}.mp3`);
        audio.play();
    } else {
        const rand = Math.floor(Math.random() * 27) + 1;
        const audio = new Audio(`../src/audio/quakeattack/${rand}.wav`);
        audio.play();
    }
}
