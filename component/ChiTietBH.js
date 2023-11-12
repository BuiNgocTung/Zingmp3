import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';
import { Audio } from 'expo-av';
import { AntDesign,FontAwesome,Feather,Ionicons,EvilIcons,MaterialCommunityIcons } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';

export default function ChiTietBH({navigation, route}) {
  const { songId } = route.params;
  const [songData, setSongData] = useState([]);
  const [playedTime, setPlayedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackStatus, setPlaybackStatus] = useState({ isPlaying: false, shouldPlay: false });
  const [buttonIsPlaying, setButtonIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

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
  fetch(`http://localhost:3001/song/${songId}`)
    .then(response => response.json())
    .then(result => {
      setSongData(result);
      const durationInSeconds = convertTimeStringToSeconds(result.duration);
      setDuration(durationInSeconds);
      setRemainingTime(durationInSeconds);

      const loadSound = async () => {
        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: result.url }, // Sử dụng result.url thay vì songData.url
          { shouldPlay: isPlaying }
        );
        setSound(newSound);
      };

      loadSound();
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu chi tiết bài hát', error));

  return () => {
    // Tắt âm thanh khi thành phần unmount
    if (sound) {
      sound.unloadAsync();
    }
  };
}, [songId, isPlaying]);
    

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
            <TouchableOpacity onPress={()=>navigation.navigate("BHYeuThich")}y><AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.text1}>PHÁT TỪ #zingChart</Text>
            <TouchableOpacity>  <AntDesign name="ellipsis1" size={24} color="white" /></TouchableOpacity>
        </View>

        <View style={styles.view2}>
        <Image style={styles.img} resizeMode="cover" source={{ uri: songData.img }} />

        </View>

        <View style={styles.view3}>
          <TouchableOpacity>
          <Image style={styles.img1} source={require('../img/BHYeuThich/img1.png')}></Image>
          </TouchableOpacity>
          
          <View >
              <Text style={styles.text2}>{songData.title}</Text>
              <Text style={styles.text2}>{songData.artist}</Text>
          </View>
          <TouchableOpacity>
              <AntDesign name="hearto" style={{top: 3}} size={22} color="white" />  
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 46, marginBottom: 5}}>
        <Text style={styles.timeText}>{formatTime(playedTime)}</Text>
       <Text style={styles.timeText}>{formatTime(remainingTime)}</Text>
        </View>


        <View style={styles.view4}>
          <TouchableOpacity>
           <FontAwesome name="random" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign style={{left: 20}} name="stepbackward" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <AntDesign name={buttonIsPlaying  ? 'pausecircleo' : 'playcircleo'} size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign style={{right: 20}}  name="stepforward" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>         
            <Feather name="repeat" size={30} color="white" />
          </TouchableOpacity>
        </View>

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
  view1:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15
  },
  text1:{
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
  view3:{
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  view4:{
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10
  },
  img1:{
    width: 15,
    height: 20,

  },
  text2:{
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
