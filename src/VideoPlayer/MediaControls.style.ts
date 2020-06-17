import {StyleSheet} from 'react-native';

const containerBackgroundColor = 'rgba(4, 5, 6, 0.3)';

const playButtonBorderColor = 'rgba(255,255,255,0.5)';
const white = '#fff';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  controlsRow: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  fullScreenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  playButton: {
    alignItems: 'center',
    borderRadius: 100,
    height: 75,
    justifyContent: 'center',
    width: 75,
  },
  playIcon: {
    height: 28,
    resizeMode: 'contain',

    width: 28,
  },
  progressColumnContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  progressSlider: {
    alignSelf: 'stretch',
  },
  replayIcon: {
    height: 20,
    resizeMode: 'stretch',
    width: 25,
  },
  thumb: {
    backgroundColor: white,
    borderRadius: 50,
    borderWidth: 3,
    height: 12,
    width: 12,
  },
  timeRow: {
    alignSelf: 'stretch',
  },
  timerLabel: {
    color: white,
    fontSize: 11,
    fontFamily: 'System',
    fontWeight: '400',
  },
  timerLabelsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -7,
    marginLeft: 0,
  },
  track: {
    borderRadius: 1,
    height: 4,
    backgroundColor: 'rgb(34, 34, 37)',
  },
});
