// import React, { useState, useRef, useEffect } from 'react';

// export default function Login({ navigation }) {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);

//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//   }, [isPlaying]);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//   };

//   const handleSeekBarChange = (e) => {
//     const newTime = (e.target.value * audioRef.current.duration) / 100;
//     setCurrentTime(newTime);
//     audioRef.current.currentTime = newTime;
//   };

//   return (
//     <div className="mini-player">
//       <audio
//         ref={audioRef}
//         src="link_audio.mp3" // Thay link_audio.mp3 bằng link bài hát của bạn
//         onTimeUpdate={handleTimeUpdate}
//       ></audio>
//       <div className="song-info">
//         <span className="song-title">Tên bài hát</span>
//         <span className="artist">Nghệ sĩ</span>
//       </div>
//       <div className="controls">
//         <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <input
//           type="range"
//           min="0"
//           max={audioRef.current ? audioRef.current.duration : 0}
//           value={(currentTime / audioRef.current?.duration) * 100 || 0}
//           onChange={handleSeekBarChange}
//         />
//       </div>
//     </div>
//   );
// };


