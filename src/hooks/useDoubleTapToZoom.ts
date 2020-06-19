/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback } from "react";
import {
  ScrollView,
  NativeTouchEvent,
  NativeSyntheticEvent,
} from "react-native";

import { Dimensions } from "../@types";

const DOUBLE_TAP_DELAY = 300;
let lastTapTS: number | null = null;

/**
 * This is iOS only.
 * Same functionality for Android implemented inside usePanResponder hook.
 */
function useDoubleTapToZoom(
  scrollViewRef: React.RefObject<ScrollView>,
  scaled: boolean,
  screen: Dimensions,
  toggleHeaderFooter: () => void
) {
  const handleDoubleTap = useCallback(
    (event: NativeSyntheticEvent<NativeTouchEvent>) => {
      if (!scaled) {
        toggleHeaderFooter();
      }
      const nowTS = new Date().getTime();
      const scrollResponderRef = scrollViewRef?.current?.getScrollResponder();
      const { pageX, pageY } = event.nativeEvent;
      if (lastTapTS && nowTS - lastTapTS < DOUBLE_TAP_DELAY) {
        let targetX = 0;
        let targetY = 0;
        let targetWidth = screen.width;
        let targetHeight = screen.height;
        toggleHeaderFooter();
        // Zooming in
        // TODO: Add more precise calculation of targetX, targetY based on touch
        if (!scaled) {
          targetX = pageX / 2;
          targetY = pageY / 2;
          targetWidth = screen.width / 2;
          targetHeight = screen.height / 2;
        }
        // @ts-ignore
        scrollResponderRef?.scrollResponderZoomTo({
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
          animated: true,
        });
      } else {
        lastTapTS = nowTS;
      }
    },
    [scaled]
  );

  return handleDoubleTap;
}

export default useDoubleTapToZoom;
