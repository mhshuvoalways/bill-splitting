import { Link, useParams } from "react-router-dom";
import Button1 from "../components/common/Button1";

const Home = () => {
  const params = useParams();
  const link = `${import.meta.env.VITE_BASE_URL}/generate-link/${params.id}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard! 🎉");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  return (
    <div>
      <p className="text-2xl">Bill Splitting</p>
      <div className="mt-10">
        <label>Share this URL with your friends</label>
        <input
          type="text"
          className="block outline-0 rounded-md bg-white border w-full py-1 px-2 focus:ring-1 mt-2 text-center"
          placeholder={link}
          value={link}
          readOnly
        />
        <Button1
          buttonLabel={"Copy"}
          className={"block mx-auto mt-2"}
          onClick={handleCopy}
        />
        <Link to={"/upload-receipt"}>
          <Button1 buttonLabel={"Next"} className={"mt-20 block mx-auto"} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
