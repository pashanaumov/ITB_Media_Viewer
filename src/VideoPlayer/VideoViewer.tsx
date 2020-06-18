import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import MediaControls, { PLAYER_STATES } from ".";
import Video from "react-native-video";

interface Props {
  source: { uri: any };
  currentIndex: number;
  mainVideoColor?: string;
  onHidePageInfo: () => void;
  doSeek: (seeking: boolean) => void;
  toggleHeaderFooter: () => void;
}

export default (props: Props) => {
  const {
    source,
    currentIndex,
    mainVideoColor,
    onHidePageInfo,
    doSeek,
    toggleHeaderFooter,
  } = props;
  const mainColor = mainVideoColor ? mainVideoColor : "rgb(255, 74, 125)";
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  useEffect(() => {
    setPaused(true);
    setPlayerState(PLAYER_STATES.PAUSED);
  }, [currentIndex]);

  const onSeek = (seek: any) => {
    doSeek(false);
    // @ts-ignore
    videoPlayer?.current.seek(seek);
  };

  const onPaused = (playerState: any) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    // @ts-ignore
    videoPlayer?.current.seek(0);
  };

  const onProgress = (data: any) => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
    setIsLoading(false);
    setPaused(true);
    setPlayerState(PLAYER_STATES.PAUSED);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onSeeking = (currentTime: any) => {
    doSeek(true);
    setCurrentTime(currentTime);
  };

  const onFullScreen = () => {
    if (Platform.OS === "ios") {
      setIsFullScreen(true);
    } else {
      onHidePageInfo();
      StatusBar.setHidden(false);
    }
  };

  const onDismissFullScreen = () => setIsFullScreen(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Video
        // @ts-ignore
        ref={(ref: any) => (videoPlayer.current = ref)}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        resizeMode="contain"
        source={{ uri: source.uri }}
        style={styles.mediaPlayer}
        fullscreen={isFullScreen}
        onFullscreenPlayerDidDismiss={onDismissFullScreen}
      />

      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor={mainColor}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        onFullScreen={onFullScreen}
        toggleHeaderFooter={toggleHeaderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").height,
    height: Dimensions.get("window").width,
    minWidth: Dimensions.get("window").height,
    minHeight: Dimensions.get("window").width,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    width: Dimensions.get("window").width,
    flex: 1,
  },
});
