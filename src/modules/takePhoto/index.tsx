import { Button, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import FilterCamera from "./filterCamera";

function TakePhotoModule() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const filterCameraRef = useRef<any>(null);
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );

  console.log(
    "SupportedConstraints",
    navigator.mediaDevices.getSupportedConstraints()
  );

  // 获取本地音视频流
  const getLocalStream = async (constraints: MediaStreamConstraints) => {
    // 获取媒体流
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 将媒体流设置到 video 标签上播放
    playLocalStream(stream);
  };

  // 播放本地视频流
  const playLocalStream = (stream: MediaStream) => {
    if (videoEl && videoEl.current) {
      videoEl.current.srcObject = stream;
    }
  };

  useEffect(() => {
    getLocalStream({
      audio: false,
      video: true,
      // video: {
      //   width: 1280,
      //   height: 720,
      // },
    });
    getDevices();
  }, []);

  // 获取所有视频输入设备
  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setVideoInputDevices(videoDevices);
  };

  // 切换设备
  const handleDeviceChange = (deviceId: string) => {};

  return (
    <div style={{ display: "flex" }}>
      <div>
        <video
          ref={videoEl}
          id="localVideo"
          autoPlay
          playsInline
          muted
          style={{ width: 400, height: 300 }}
        ></video>
        <div>
          <Space>
            <Select
              style={{ width: 240 }}
              options={videoInputDevices.map((item: any) => ({
                value: item.deviceId,
                label: item.label,
              }))}
            ></Select>
            <Button
              type="primary"
              onClick={() => {
                filterCameraRef.current?.takePhoto();
              }}
            >
              拍照
            </Button>
          </Space>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <FilterCamera videoEl={videoEl} ref={filterCameraRef}></FilterCamera>
      </div>
    </div>
  );
}

export default TakePhotoModule;
