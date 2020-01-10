import React, { Component } from 'react'
import { ReactMediaRecorder } from "react-media-recorder";

export default class MobileVideo extends Component {
  render() {
    return (
      <div>
        <VideoRecorder
          isOnInitially={true}
          showReplayControls={true}
          countdownTime={3000}
          timeLimit={30000}
        //onRecordingComplete={handleRecordingComplete}
        />
      </div>
    );
  }
}

