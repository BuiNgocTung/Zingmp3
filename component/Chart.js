import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';

import Svg, { Path, Text, Circle, Line } from 'react-native-svg';


// Define image dimensions
const imageWidth = 50;
const imageHeight = 50;

const dataSong1 = [60, 60, 60, 60, 90, 80, 80, 120, 60, 60, 60, 50];
const dataSong2 = [30, 30, 40, 20, 40, 40, 60, 70, 40, 40, 40, 30];
const dataSong3 = [10, 20, 30, 10, 30, 30, 30, 30, 10, 20, 20, 10];
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const maxY = Math.max(...dataSong1, ...dataSong2, ...dataSong3);
const maxX = dataSong1.length - 1;
const deviceWidth = 350;
const scaleX = deviceWidth / (maxX);
const scaleY = 100 / maxY;

const smoothPath = (points) => {
  const path = [];
  path.push(`M0 ${100 - points[0] * scaleY}`);

  for (let i = 0; i < points.length - 1; i++) {
    const xMid = (i + 0.5) * scaleX;
    const yMid = (points[i] + points[i + 1]) / 2 * scaleY;
    path.push(`Q${i * scaleX} ${100 - points[i] * scaleY}, ${xMid} ${100 - yMid}`);
    path.push(`Q${(i + 1) * scaleX} ${100 - points[i + 1] * scaleY}, ${(i + 1) * scaleX} ${100 - points[i + 1] * scaleY}`);
  }

  return path.join(' ');
};

const interpolateColor = (index, brightness) => {
  const colors = [
    [0, 0, 255], // blue
    [0, 255, 0], // green
    [255, 0, 0], // red
  ];

  const scale = 255;
  const colorIndex = index % colors.length;
  const nextColorIndex = (colorIndex + 1) % colors.length;
  const factor = index / colors.length;

  const resultColor = colors[colorIndex].map((channel, i) => {
    const nextChannel = colors[nextColorIndex][i];
    const delta = nextChannel - channel;
    return Math.round(channel + delta * factor * brightness);
  });

  return `rgb(${resultColor.join(',')})`;
};

const ChartComponent = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 2) % 3); // 3 là số lượng màu sắc
    }, 1000); // Đổi màu mỗi giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, []);




  return (
    <View style={styles.container}>
      {/* Đồ thị */}
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Svg height="150" width={`${deviceWidth}px`} onTouchMove={(e) => handleTouchMove(e, setHighlightedIndex)}>
          {/* Data Lines */}
          {renderDataLine(dataSong1, 0, highlightedIndex === 0, currentColorIndex, 'dataSong1')}
          {renderDataLine(dataSong2, 1, highlightedIndex === 1, currentColorIndex, 'dataSong2')}
          {renderDataLine(dataSong3, 2, highlightedIndex === 2, currentColorIndex, 'dataSong3')}

          {/* Highlighted Point */}
          {highlightedIndex !== null && (
            <Circle
              key="highlighted-point"
              cx={highlightedIndex * scaleX}
              cy={100 - dataSong1[highlightedIndex] * scaleY}
              r={5}
              fill="yellow"
            />
          )}

          {/* Labels for X-axis */}
          <Line
            x1="0"
            y1="90%"
            x2={`${deviceWidth}px`}  /* Điều chỉnh chiều dài của X-axis */
            y2="90%"
            stroke="white"
            strokeWidth="2"
          />

          {labels.map((label, index) => (
            <Text
              key={`label-x-${index}`}
              x={(index+0.1) * 31}
              y="100%"
              fill="white"
              fontSize="12"
              textAnchor="middle"  // Thay đổi textAnchor để giữ vị trí giữa của label
            >
              {label}
            </Text>
          ))}
          {/* Labels for Y-axis */}
          {/* {Array.from({ length: maxY + 1 }, (_, i) => (
            <Text
              key={`label-y-${i}`}
              x="-5%"
              y={`${100 - i * scaleY}%`}
              fill="#666"
              fontSize="10"
              textAnchor="end"
            >
              {i * (maxY / maxY)}
            </Text>
          ))} */}
        </Svg>
      </View>
    </View>
  );
};

const renderDataLine = (data, index, isHighlighted, currentColorIndex, dataName) => {
  const path = smoothPath(data);
  const highlightedColor = 'yellow';
  const lineColor = isHighlighted ? highlightedColor : interpolateColor(currentColorIndex * 10 + index, isHighlighted ? 0.5 : 1);

  // Tìm vị trí có giá trị lớn nhất trong mảng data
  const maxDataIndex = data.indexOf(Math.max(...data));

  return (
    <React.Fragment key={`line-fragment-${index}`}>
      <Path
        key={`line-${index}`}
        d={path}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="100"
        opacity={isHighlighted ? 1 : 0.5}
      />
      {isHighlighted &&
        data.map((point, i) => (
          <Circle
            key={`highlighted-circle-${i}`}
            cx={i * scaleX}
            cy={100 - point * scaleY}
            r={5}
            fill={highlightedColor}
          />
        ))}
      {/* Hiển thị ảnh tại vị trí có giá trị lớn nhất */}
      {maxDataIndex !== -1 && (
        <Image
          key={`image-${dataName}-${index}`}
          x={maxDataIndex * scaleX - imageWidth / 2}
          y={100 - data[maxDataIndex] * scaleY - imageHeight / 2}
          width={imageWidth}
          height={imageHeight}
          href={{ uri: 'https://res.cloudinary.com/dahmqix8w/image/upload/v1698849812/348s_s8sstf.jpg' }}
        />
      )}
    </React.Fragment>
  );
};


const handleTouchMove = (event, setHighlightedIndex) => {
  const touches = event.nativeEvent.touches;
  if (touches.length > 0) {
    const touchX = touches[0].locationX;
    const index = Math.round(touchX / scaleX);

    // Check if index is within the valid range
    if (index >= 0 && index < dataSong1.length) {
      setHighlightedIndex(index);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

});

export default ChartComponent;
