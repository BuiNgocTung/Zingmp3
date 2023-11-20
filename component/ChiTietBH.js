import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome, Feather, Ionicons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ChiTietBH({ navigation, route }) {
  const { songId,data } = route.params;
  const [songData, setSongData] = useState([]);
  const [playedTime, setPlayedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackStatus, setPlaybackStatus] = useState({ isPlaying: false, shouldPlay: false });
  const [buttonIsPlaying, setButtonIsPlaying] = useState(true);
  const [isStopped, setIsStopped] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handlePrevious = async () => {
    try {
      // Giảm index của bài hát hiện tại
      const previousIndex = (currentSongIndex - 1 + data.length) % data.length;
  
      // Lấy id của bài hát trước đó từ danh sách
      const previousSongId = data[previousIndex].id;
  
      // Gọi hàm fetchSongData với id của bài hát trước đó
      await fetchSongData(previousSongId);
  
      // Cập nhật index hiện tại
      setCurrentSongIndex(previousIndex);
      setButtonIsPlaying(true)
    } catch (error) {
      console.error('Lỗi:', error.message);
      // Xử lý lỗi ở đây nếu cần
    }
  };
  const handleNext = async () => {
    try {
      // Tăng index của bài hát hiện tại
      const nextIndex = (currentSongIndex + 1) % data.length;
  
      // Lấy id của bài hát tương ứng với index mới
      const nextSongId = data[nextIndex].id;
  
      // Gọi hàm fetchSongData với id mới
      await fetchSongData(nextSongId);
  
      // Cập nhật index hiện tại
      setCurrentSongIndex(nextIndex);
      setButtonIsPlaying(true)

    } catch (error) {
      console.error('Lỗi:', error.message);
      // Xử lý lỗi ở đây nếu cần
    }
  };
  
  const fetchSongData = async (nextSongId) => {
    try {
      const response = await fetch(`http://localhost:3001/song/${nextSongId}`);
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu bài hát');
      }
      const result = await response.json();
      setSongData(result);
  
      // Cập nhật thời lượng và các giá trị khác nếu cần
      const durationInSeconds = convertTimeStringToSeconds(result.duration);
      setDuration(durationInSeconds);
      setRemainingTime(durationInSeconds);
  
      // Unload và load lại âm thanh mới
      if (sound) {
        sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: result.url },
        { shouldPlay: isPlaying }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Lỗi:', error.message);
      // Xử lý lỗi ở đây nếu cần
    }
  };
  
  const convertTimeStringToSeconds = (timeString) => {
    try {
      const [minutes, seconds] = timeString.split(':').map(Number);
      return minutes * 60 + seconds;
    } catch (error) {
      console.error('Lỗi khi chuyển đổi chuỗi thời lượng', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/song/${songId}`);
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu bài hát');
        }
        const result = await response.json();
        setSongData(result);

        const durationInSeconds = convertTimeStringToSeconds(result.duration);
        setDuration(durationInSeconds);
        setRemainingTime(durationInSeconds);

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: result.url },
          { shouldPlay: JSON.parse(await AsyncStorage.getItem('isPlaying')) || true } // Sử dụng trạng thái từ AsyncStorage hoặc mặc định là true
          );
        setSound(newSound);
        handlePlayPause();
      } catch (error) {
        console.error('Lỗi:', error.message);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo cho người dùng
      }
    };

    fetchData();
  }, [songId]);
  useEffect(() => {
    const cleanup = () => {
      if (sound) {
        sound.unloadAsync();
      }
    };

    return cleanup;
  }, [sound]);


  const handlePlayPause = async () => {
    if (sound) {
      if (playbackStatus.isPlaying) {
        const status = await sound.pauseAsync();
        setCurrentPosition(status.positionMillis);
        setIsStopped(true);
      } else {
        if (currentPosition === duration * 1000) {
          setCurrentPosition(0);
        }
        await sound.playFromPositionAsync(currentPosition);
        setIsStopped(false);
      }
      setPlaybackStatus({ isPlaying: !playbackStatus.isPlaying, shouldPlay: !playbackStatus.shouldPlay });
      setButtonIsPlaying(!playbackStatus.isPlaying); // Cập nhật trạng thái của nút play/pause
      await AsyncStorage.setItem('isPlaying', JSON.stringify(!playbackStatus.isPlaying));

    }
  };

  useEffect(() => {
    const handlePlaybackStatusUpdate = (status) => {
      if (!status.isLoaded) {
        return;
      }

      if (status.didJustFinish) {
        setPlaybackStatus({ ...playbackStatus, isPlaying: false });
        setCurrentPosition(0);
        setPlayedTime(duration); // Đặt giá trị playedTime là duration khi kết thúc bài hát
        setRemainingTime(0);
        handleNext();
      } else {
        setPlayedTime(status.positionMillis / 1000);
        setRemainingTime(duration - (status.positionMillis / 1000));
      }
    };

    if (sound) {
      sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }

    return () => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(null);
      }
    };
  }, [sound, playbackStatus, duration]);

  const handleSliderChange = (value) => {
    setPlayedTime(value);
  };

  const handleSliderComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000); // Chuyển đổi giây thành mili giây
      setPlayedTime(value);
      if (isStopped) {
        // Nếu bài hát đang ở trạng thái dừng, tự động phát lại từ vị trí mới
        await sound.playFromPositionAsync(value * 1000);
        setPlaybackStatus({ isPlaying: true, shouldPlay: true });
        setButtonIsPlaying(true);
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
      <TouchableOpacity onPress={() => {
      
        navigation.goBack();
        }}>
  <AntDesign name="down" size={24} color="white" />
</TouchableOpacity>
        <Text style={styles.text1}>PHÁT TỪ #zingChart</Text>
        <TouchableOpacity>  <AntDesign name="ellipsis1" size={24} color="white" /></TouchableOpacity>
      </View>

      <View style={styles.view2}>
        <Image style={styles.img} resizeMode="cover" source={{ uri: songData.img }} />

      </View>

      <View style={styles.view3}>
        <TouchableOpacity>
          <Icon name='download' size={26} style={styles.downloadIcon} color={'white'} />
        </TouchableOpacity>

        <View >
          <Text style={styles.text2}>{songData.title}</Text>
          <Text style={styles.text2}>{songData.artist}</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="hearto" style={{ top: 3 }} size={22} color="white" />
        </TouchableOpacity>

      </View>

      <View style={styles.audioBar}>
        <Slider
          style={{ width: '100%' }}
          minimumValue={0}
          maximumValue={duration}
          value={playedTime}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          thumbTintColor="white"
          step={6}
          onValueChange={handleSliderChange}
          onSlidingComplete={handleSliderComplete}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 46, marginBottom: 5 }}>
        <Text style={styles.timeText}>{formatTime(playedTime)}</Text>
        <Text style={styles.timeText}>{formatTime(remainingTime)}</Text>
      </View>


      <View style={styles.view4}>
       
        <TouchableOpacity >
          <FontAwesome name="random" size={30} color="white" />
        </TouchableOpacity>
     {/* lui */}
        <TouchableOpacity onPress={handlePrevious}>
          <AntDesign style={{ left: 20 }} name="stepbackward" size={35} color="white" />
        </TouchableOpacity>
        {/* button stop */}
        <TouchableOpacity onPress={handlePlayPause}>
          <AntDesign name={buttonIsPlaying ? 'pausecircleo' : 'playcircleo'} size={35} color="white" />
        </TouchableOpacity>
        {/* next music */}
        <TouchableOpacity onPress={handleNext}>
          <AntDesign style={{ right: 20 }} name="stepforward" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="repeat" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {/* bottom */}
      <View style={styles.view4}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="message-reply-outline" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="md-musical-note" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <EvilIcons name="arrow-down" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="music-note-plus" size={30} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: "linear-gradient( #150D76 0%, #9896E7 100%, #FFFFFF 45.22%)",

  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  text1: {
    fontSize: 11,
    fontWeight: 700,
    color: 'white',
    lineHeight: 13,
    width: 64,
    textAlign: 'center'
  },
  view2: {
    alignItems: 'center',
    top: 30
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    marginBottom: 40
  },
  view3: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  view4: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10
  },
  img1: {
    width: 15,
    height: 20,

  },
  text2: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: 600,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5
  },
  audioBar: {
    height: 3,
    width: '80%',
    backgroundColor: 'white',
    marginLeft: 30

  },
  progress: {
    height: '100%', // Chiều cao của thanh tiến triển bằng với thanh thời lượng
    backgroundColor: 'black',
  },
  timeText: {
    color: 'white',
    marginTop: 10,
    marginLeft: 30
  },

});
