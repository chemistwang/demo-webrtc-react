import { createBrowserRouter } from "react-router-dom";
import BgReplaceModule from "../modules/bgreplace";
import TakePhotoModule from "../modules/takePhoto";
import WebRTCModule from "../modules/webrtc";
import WorkbenchPage from "../pages/workbench";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WorkbenchPage />,
    children: [
      {
        path: "takephoto",
        element: <TakePhotoModule />,
      },
      {
        path: "webrtc",
        element: <WebRTCModule />,
      },
      {
        path: "bgreplace",
        element: <BgReplaceModule />,
      },
    ],
  },
]);

export default router;
