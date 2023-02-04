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
  volume = `<svg class="volume-icon" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon class="volume-icon__color" points="270,407.7 270,104.4 175.3,192 71,192 71,320 175.3,320  "/>
  <path class="volume-icon__color" d="M326.3,355.6c20.5-27.8,32.8-62.3,32.8-99.6c0-37.4-12.3-71.8-32.8-99.6l-20.4,15.3c17.4,23.6,27.8,52.7,27.8,84.3 
   c0,31.6-10.4,60.7-27.8,84.3L326.3,355.6z"/>
   <path class="volume-icon__color" d="M392.8,401.6c30-40.7,48-91,48-145.6s-18-104.9-48-145.6l-20.4,15.3c26.9,36.4,43,81.4,43,130.3c0,48.9-16.1,93.8-43,130.3  
    L392.8,401.6z"/></g></svg>`
}

export default PlayerIcon;
