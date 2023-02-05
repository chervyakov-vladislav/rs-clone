const enum PlayerIcon {
  playButton = `<svg class="player__play" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path
    d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20
    c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z"/></svg>`,
  pauseButton = `<svg class="player__pause" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
   <g><path d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6  
    C218.6,448,224,442.6,224,435.8z"/><path d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1
   C384,69.4,378.6,64,371.8,64z"/></g></svg>`,
  fullScreen = `<?xml version="1.0" ?><svg class="fullscreen-icon" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><g>
  <path class="fullscreen-icon__color" d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z"/>
  <path class="fullscreen-icon__color" d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z"/>
  <path class="fullscreen-icon__color" d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z"/>
  <path class="fullscreen-icon__color" d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z"/></g></svg>`,
  volume = `<svg class="volume-icon" style="enable-background:new 0 0 512 512;" version="1.1"
   viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="volume-icon__color" points="270,407.7 270,104.4 175.3,192 71,192 71,320 175.3,320  "/>
  <path class="volume-icon__color" d="M326.3,355.6c20.5-27.8,32.8-62.3,32.8-99.6c0-37.4-12.3-71.8-32.8-99.6l-20.4,15.3c17.4,23.6,27.8,52.7,27.8,84.3 
   c0,31.6-10.4,60.7-27.8,84.3L326.3,355.6z"/>
   <path class="volume-icon__color" d="M392.8,401.6c30-40.7,48-91,48-145.6s-18-104.9-48-145.6l-20.4,15.3c26.9,36.4,43,81.4,43,130.3c0,48.9-16.1,93.8-43,130.3  
    L392.8,401.6z"/></g></svg>`,
  muted = `<svg class="mute-icon"  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><title/>
  <line class="mute-icon__color" style="fill:none;stroke:#ff5500;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px" x1="416" x2="64" y1="432" y2="80"/>
  <path class="mute-icon__color" d="M243.33,98.86a23.89,23.89,0,0,0-25.55,1.82l-.66.51L188.6,124.54a8,8,0,0,0-.59,11.85l54.33,54.33A8,
  8,0,0,0,256,185.06V120.57A24.51,24.51,0,0,0,243.33,98.86Z"/>
  <path  class="mute-icon__color"d="M251.33,335.29,96.69,180.69A16,16,0,0,0,85.38,176H56a24,24,0,0,0-24,24V312a24,24,0,0,0,24,24h69.76l92,
  75.31A23.9,23.9,0,0,0,243.63,413,24.51,24.51,0,0,0,256,391.45V346.59A16,16,0,0,0,251.33,335.29Z"/>
  <path class="mute-icon__color" d="M352,256c0-24.56-5.81-47.87-17.75-71.27a16,16,0,1,0-28.5,14.55C315.34,218.06,320,236.62,320,256q0,4-.31,8.13a8,
  8,0,0,0,2.32,6.25l14.36,14.36a8,8,0,0,0,13.55-4.31A146,146,0,0,0,352,256Z"/>
  <path class="mute-icon__color" d="M416,256c0-51.18-13.08-83.89-34.18-120.06a16,16,0,0,0-27.64,16.12C373.07,184.44,384,211.83,384,256c0,23.83-3.29,42.88-9.37,60.65a8,
  8,0,0,0,1.9,8.26L389,337.4a8,8,0,0,0,13.13-2.79C411,311.76,416,287.26,416,256Z"/>
  <path class="mute-icon__color" d="M480,256c0-74.25-20.19-121.11-50.51-168.61a16,16,0,1,0-27,17.22C429.82,147.38,448,189.5,448,256c0,46.19-8.43,80.27-22.43,110.53a8,8,0,0,0,1.59,
  9l11.92,11.92A8,8,0,0,0,452,385.29C471.6,344.9,480,305,480,256Z"/></svg>`,
}

export default PlayerIcon;
