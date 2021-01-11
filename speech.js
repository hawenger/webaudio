const stopButton = document.querySelector('.stop');
const startButton = document.querySelector('.start');
const playPauseButton = document.querySelector('.pause');
const volumeControl = document.querySelector('#volume');
const pannerControl = document.querySelector('#panner');
//const waveShaperControl = document.querySelector('#wave');

const audioEl = document.querySelector('audio');

//console.log(window.speechSynthesis);
//const oliver = new SpeechSynthesisUtterance('Hello World, Thank you for having me today');

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const gainNode = audioContext.createGain();
const pannerOptions = { pan:0 };
const shaperOptions = { curve:0, oversample:"none" };

const track = audioContext.createMediaElementSource(audioEl); //creating an input node
const panner = new StereoPannerNode(audioContext, pannerOptions); //creating panning node
//const waveShaper = new WaveShaperNode(audioContext, shaperOptions);
track.connect(gainNode).connect(panner).connect(audioContext.destination); //connectiong to destination "output"

console.log(panner);

pannerControl.addEventListener('input', () => {
    panner.pan.value = pannerControl.value;
}, false);

//waveShaperControl.addEventListener('input', () => {
//    waveShaper.curve.value = waveShaperControl.value;
//}, false);

volumeControl.addEventListener('input', () => {
    gainNode.gain.value = volumeControl.value;
}, false);

playPauseButton.addEventListener('click', () => {
    console.log(playPauseButton.dataset)
    if(audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if(playPauseButton.dataset.playing === 'false') {
        audioEl.play();
        playPauseButton.dataset.playing = 'true';
    } else if (playPauseButton.dataset.playing === 'true') {
        audioEl.pause();
        playPauseButton.dataset.playing = 'false'
    }
}, false);
audioEl.addEventListener('ended', () => {
    playPauseButton.dataset.playing = 'false';
}, false);
