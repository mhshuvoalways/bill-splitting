import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenerateLink from "../pages/GenerateLink";
import Home from "../pages/Home";
import UploadReceipt from "../pages/UploadReceipt";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-link/:id" element={<GenerateLink />} />
        <Route path="/upload-receipt" element={<UploadReceipt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
