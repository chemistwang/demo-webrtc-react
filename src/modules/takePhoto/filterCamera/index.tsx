import { Button } from "antd";
import { forwardRef, RefObject, useImperativeHandle, useState } from "react";
import "./index.css";

interface Props {
  videoEl: RefObject<HTMLVideoElement>;
  ref: any;
}

function FilterCamera(props: Props, ref: any) {
  const { videoEl } = props;

  const [imageSrcList, setImageSrcList] = useState<string[]>([]);

  // 添加滤镜
  const filterList = [
    "blur(5px)", // 模糊
    "brightness(0.5)", // 亮度
    "contrast(200%)", // 对比度
    "grayscale(100%)", // 灰度
    "hue-rotate(90deg)", // 色相旋转
    "invert(100%)", // 反色
    "opacity(90%)", // 透明度
    "saturate(200%)", // 饱和度
    "saturate(20%)", // 饱和度
    "sepia(100%)", // 褐色
    "drop-shadow(4px 4px 8px blue)", // 阴影
  ];

  useImperativeHandle(ref, () => ({
    takePhoto: takePhoto,
  }));

  // 拍照
  const takePhoto = () => {
    console.log("take photo...");
    const canvas = document.createElement("canvas") as HTMLCanvasElement;

    if (!videoEl || !videoEl.current) return;
    canvas.width = videoEl.current.videoWidth as number;
    canvas.height = videoEl.current.videoHeight as number;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const imgList = [];
    for (let i = 0; i < filterList.length; i++) {
      ctx.filter = filterList[i];
      ctx.drawImage(videoEl.current, 0, 0, canvas.width, canvas.height);
      const img = canvas.toDataURL("image/png");
      imgList.push(img);
    }
    console.log(imgList, "0-0-0--0-");
    setImageSrcList(imgList);
  };

  const generateFilterImages = () => {
    return imageSrcList.map((item: string, index: number) => {
      return (
        <div key={index} className="takephoto-item">
          <img src={item} alt=""></img>
        </div>
      );
    });
  };

  return <>{generateFilterImages()}</>;
}

export default forwardRef(FilterCamera);
