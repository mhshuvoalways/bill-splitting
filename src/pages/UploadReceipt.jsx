import { Camera, Trash, X } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button1 from "../components/common/Button1";
import Model from "../components/common/Model";
import ManualInput from "../components/receipt/ManualInput";

const UploadReceipt = () => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [items, setItems] = useState([]);

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
    setIsModalOpen(false);
  };

  const deleteHandler = (uid) => {
    const temp = [...items];
    setItems(temp.filter((el) => el.uid !== uid));
  };

  return (
    <div>
      <p className="text-2xl">Bill Splitting</p>
      <div className="mt-10">
        {capturedImage ? (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full max-w-md max-h-96 rounded-md"
            />
            <X
              className="cursor-pointer absolute -right-6 top-0 z-10"
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
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </div>
        <Link to={"/split"}>
          <Button1 buttonLabel={"Next"} className={"block mx-auto mt-20"} />
        </Link>
        {isCameraOpen && (
          <Model
            isOpen={isCameraOpen}
            onClose={handleCloseCamera}
            title={"Take a photo"}
          >
            <video
              ref={videoRef}
              className="w-full bg-black rounded-md"
            ></video>
            <div className="mt-2 space-y-2">
              <Button1
                buttonLabel={"Take Photo"}
                className={"bg-green-400 hover:bg-green-500"}
                onClick={handleTakePhoto}
              />
              <Button1
                buttonLabel={"Close Camera"}
                className={"bg-red-500 hover:bg-red-600"}
                onClick={handleCloseCamera}
              />
            </div>
          </Model>
        )}
        <Model
          isOpen={isModalOpen}
          onClose={handleCloseCamera}
          title={"Upload Manual Input"}
        >
          <ManualInput items={items} setItems={setItems} />
          {items.length ? (
            <table className="w-full mt-5 text-start">
              <tr>
                <th className="text-start">Item</th>
                <th className="text-start">Cost</th>
                <th className="text-start">UID</th>
                <th className="text-start">Action</th>
              </tr>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.cost}</td>
                  <td>{item.uid}</td>
                  <td>
                    <Trash
                      className="cursor-pointer"
                      onClick={() => deleteHandler(item.uid)}
                      size={16}
                    />
                  </td>
                </tr>
              ))}
            </table>
          ) : null}
        </Model>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default UploadReceipt;
