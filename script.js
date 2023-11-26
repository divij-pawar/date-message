const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

// Spotify Web Playback SDK initialization
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'AQBdG2lnBbVUUt4Szx3ChsgGDiSGb4uTgTIixLuLxAgPanyQhoy2d7hzmJbgnY-Dq7uiyGbHS5pRv0dE7DXKKAkXN2YHaUZXfO4xLl9Tz52G7t1hyXdreVa_WKkM3TjQgg3FsBEyuk3DLPOjXo2LTR408gFxiaq09zzultwpkSjTfbFv9HpBqjasSASQas66u2UXGvAKmuYdR2mGy66rQjzvoOiHxcQE4L2STBVa6I9cVz0'; // Replace with a valid Spotify access token

  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    // Function to play the song
    const playSong = () => {
      player
        .play({
          uris: ['spotify:track:YOUR_TRACK_ID'], // Replace with the track ID of "King of My Heart"
          device_id: device_id,
        })
        .then(() => {
          console.log('Playing');
        })
        .catch(error => {
          console.error('Error playing:', error);
        });
    };

    // Event listener for button click to play the song
    yesBtn.addEventListener('click', () => {
      question.innerHTML = "Yay, see you on the 27th!";
      gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";
      playSong(); // Call the function to play the song
    });
  });

  // Connect to the player
  player.connect();
};

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});