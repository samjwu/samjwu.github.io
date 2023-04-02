//======================= waveform ==============================================
'use strict';

// Create an instance
var wavesurfer;

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: 'white',
        progressColor: 'orange',
        backgroundColor: 'black',
        cursorColor: 'orange',
        height: 300,
        responsive: true,
        barWidth: 5,
        barGap: 2,
    });

    // // Equalizer
    // wavesurfer.on('ready', function() {
    //     let EQ = [
    //         {
    //             f: 32,
    //             type: 'lowshelf'
    //         },
    //         {
    //             f: 64,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 125,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 250,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 500,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 1000,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 2000,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 4000,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 8000,
    //             type: 'peaking'
    //         },
    //         {
    //             f: 16000,
    //             type: 'highshelf'
    //         }
    //     ];

    //     // Create filters
    //     let filters = EQ.map(function(band) {
    //         let filter = wavesurfer.backend.ac.createBiquadFilter();
    //         filter.type = band.type;
    //         filter.gain.value = 0;
    //         filter.Q.value = 1;
    //         filter.frequency.value = band.f;
    //         return filter;
    //     });

    //     // Connect filters to wavesurfer
    //     wavesurfer.backend.setFilters(filters);

    //     // Delete old range sliders
    //     var inputs = document.getElementsByTagName('input');
    //     while (inputs.length) inputs[0].parentNode.removeChild(inputs[0]);

    //     // Bind filters to vertical range sliders
    //     let container = document.querySelector('#equalizer');
    //     filters.forEach(function(filter) {
    //         let input = document.createElement('input');
    //         Object.assign(input, {
    //             type: 'range',
    //             min: -40,
    //             max: 40,
    //             value: 0,
    //             title: filter.frequency.value,
    //         });
    //         input.style.display = 'inline-block';
    //         input.setAttribute('orient', 'vertical');
    //         wavesurfer.util.style(input, {
    //             webkitAppearance: 'slider-vertical',
    //             width: '50px',
    //             height: '300px'
    //         });
    //         container.appendChild(input);

    //         let onChange = function(e) {
    //             filter.gain.value = ~~e.target.value;
    //         };

    //         input.addEventListener('input', onChange);
    //         input.addEventListener('change', onChange);
    //     });

    //     // For debugging
    //     wavesurfer.filters = filters;
    // });

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
