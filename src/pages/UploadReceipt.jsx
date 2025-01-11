import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import Button1 from "../components/common/Button1";

const UploadReceipt = () => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsCameraOpen(false);
    }
  };

  const handleCloseCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  console.log(capturedImage);

  return (
    <div>
      <p className="text-2xl">Bill Splitting</p>
      <div className="mt-10">
        {capturedImage ? (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full max-w-md rounded-md"
            />
            <X
              className="cursor-pointer absolute right-1 top-1 z-10"
              onClick={() => setCapturedImage(null)}
            />
          </div>
        ) : (
          <Camera className="w-full" size={160} />
        )}
        <div className="space-y-2 mt-5">
          <p>* Upload your receipt</p>
          <div>
            <Button1
              buttonLabel={"Upload from files"}
              className={"block mx-auto bg-gray-300 hover:bg-gray-400"}
              onClick={handleFileUploadClick}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileCapture}
            />
          </div>
          <Button1
            buttonLabel={"Camera"}
            className={"block mx-auto bg-gray-300 hover:bg-gray-400"}
            onClick={handleOpenCamera}
          />
          <Button1
            buttonLabel={"Manual input"}
            className={"block mx-auto bg-gray-300 hover:bg-gray-400"}
            onClick={() =>
              alert("Manual input form functionality will go here!")
            }
          />
        </div>
        <Button1 buttonLabel={"Next"} className={"block mx-auto mt-20"} />
        {isCameraOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center z-50">
            <video
              ref={videoRef}
              className="w-full max-w-md bg-black rounded-md"
            ></video>
            <div className="mt-2 space-y-2">
              <Button1
                buttonLabel={"Take Photo"}
                className={"bg-green-500 hover:bg-green-600"}
                onClick={handleTakePhoto}
              />
              <Button1
                buttonLabel={"Close Camera"}
                className={"bg-red-500 hover:bg-red-600"}
                onClick={handleCloseCamera}
              />
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default UploadReceipt;
