//======================= waveform ==============================================
'use strict';

// Create an instance
var wavesurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: 'orange',
        backgroundColor: 'black',
        cursorColor: 'orange',
        height: 300,
        responsive: true,
        barWidth: 5,
        barGap: 2,
    });

    // Log errors
    wavesurfer.on('error', function(msg) {
        console.log(msg);
    });

    // Progress bar
    (function() {
        const progressDiv = document.querySelector('#progress-bar');
        const progressBar = progressDiv.querySelector('.progress-bar');

        let showProgress = function(percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };

        let hideProgress = function() {
            progressDiv.style.display = 'none';
        };

        wavesurfer.on('loading', showProgress);
        wavesurfer.on('ready', hideProgress);
        wavesurfer.on('destroy', hideProgress);
        wavesurfer.on('error', hideProgress);
    })();

    // Bind playlist controls
    let playPause = document.querySelector('#playPause');
    playPause.addEventListener('click', function() {
        wavesurfer.playPause();
    });

    // Toggle play/pause text
    wavesurfer.on('play', function() {
        document.querySelector('#play').style.display = 'none';
        document.querySelector('#pause').style.display = '';
    });
    wavesurfer.on('pause', function() {
        document.querySelector('#play').style.display = '';
        document.querySelector('#pause').style.display = 'none';
    });

    // The playlist links
    let links = document.querySelectorAll('#playlist a');
    let currentTrack = 0;

    // Load a track by index and highlight the corresponding link
    let setCurrentSong = function(index) {
        links[currentTrack].classList.remove('active');
        currentTrack = index;
        links[currentTrack].classList.add('active');
        wavesurfer.load(links[currentTrack].href);
    };

    // Load the track on click
    Array.prototype.forEach.call(links, function(link, index) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentSong(index);
        });
    });

    // Play on audio load
    // wavesurfer.on('ready', function() {
    //     wavesurfer.play();
    // });

    wavesurfer.on('error', function(e) {
        console.warn(e);
    });

    // Go to the next track on finish
    wavesurfer.on('finish', function() {
        setCurrentSong((currentTrack + 1) % links.length);
    });

    // Load the first track
    setCurrentSong(currentTrack);
});
