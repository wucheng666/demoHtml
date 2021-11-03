/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

// Put variables in global scope to make them available to the browser console.
const audio = document.querySelector('audio');

const constraints = window.constraints = {
  audio: true,
  video: false
};

async function handleSuccess(stream) {
  // const audioTracks = stream.getAudioTracks();
  // console.log('Got stream with constraints:', constraints);
  // console.log('Using audio device: ' + audioTracks[0].label);
  // stream.oninactive = function() {
  //   console.log('Stream ended');
  // };
  // window.stream = stream; // make variable available to browser console
  // audio.srcObject = stream;


  let audioContext = new AudioContext({ sampleRate: 16000 });
  document.getElementById('tips').innerHTML = audioContext.sampleRate;

  //创建音频处理的源节点
  let source = audioContext.createMediaStreamSource(stream);
  //创建自定义处理节点

  await audioContext.audioWorklet.addModule('https://wucheng666.github.io/demoHtml/audio/js/white-noise-processor.js')
  // let scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
  const whiteNoiseNode = new AudioWorkletNode(audioContext, 'white-noise-processor')
  //创建音频处理的输出节点
  // let dest = audioContext.createMediaStreamDestination();

  //串联连接
  // whiteNoiseNode.connect(audioContext.destination)
  // source.connect(whiteNoiseNode);
  // scriptNode.connect(dest);

  source.connect(whiteNoiseNode).connect(audioContext.destination)


}

function handleError(error) {
  const errorMessage = 'navigator.MediaDevices.getUserMedia error: ' + error.message + ' ' + error.name;
  document.getElementById('errorMsg').innerText = errorMessage;
  console.log(errorMessage);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
