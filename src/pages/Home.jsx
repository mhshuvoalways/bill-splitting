import { useState } from "react";
import { Link } from "react-router-dom";
import Button1 from "../components/common/Button1";

const Home = () => {
  const [value, setValue] = useState("");

  const handler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <p className="text-2xl">Bill Splitting</p>
      <div className="mt-10">
        <label>Mobile Number</label>
        <input
          type="text"
          className="block outline-0 rounded-md bg-white border w-full py-1 px-2 focus:ring-1 mt-2 text-center"
          placeholder="1234567890"
          value={value}
          onChange={handler}
        />
        {value ? (
          <Link to={`/generate-link/${value}`}>
            <Button1
              buttonLabel={"Next"}
              className={"bg-green-500 hover:bg-green-600 text-white mt-20"}
            />
          </Link>
        ) : (
          <Button1 buttonLabel={"Next"} className={"mt-20"} />
        )}
      </div>
    </div>
  );
};

export default Home;
