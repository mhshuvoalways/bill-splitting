import { Check } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button1 from "../components/common/Button1";

const itemArray = [
  {
    item: "Chicken",
    cost: 5,
    uid: "23da1y",
    isCheck: false,
  },
  {
    item: "Briyani",
    cost: 12,
    uid: "93da1a",
    isCheck: true,
  },
  {
    item: "Pasta",
    cost: 12,
    uid: "4afd1y",
    isCheck: false,
  },
  {
    item: "GST",
    cost: 3,
  },
];

const FriendView = () => {
  const [items, setItems] = useState(itemArray);

  const params = useParams();
  console.log(params);

  const checkHandler = (item) => {
    const temp = [...items];
    const findIndex = temp.findIndex((el) => el.uid === item.uid);
    if (findIndex !== -1) {
      item.isCheck = !item.isCheck;
      temp[findIndex] = item;
      setItems(temp);
    }
  };

  return (
    <div className="w-full">
      <p className="text-2xl">Bill Splitting</p>
      <p>Friends</p>
      <table className="w-full mt-5 text-start">
        <tr>
          <th className="text-start">Item</th>
          <th className="text-start">Cost</th>
          <th className="text-start">UID</th>
          <th className="text-start">My Item</th>
        </tr>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="py-2">{item.item}</td>
            <td className="py-2">${item.cost}</td>
            <td className="py-2">{item.uid}</td>
            <td className="py-2">
              {item.item !== "GST" && (
                <Check
                  onClick={() => checkHandler(item)}
                  className={`rounded-full p-1 ${
                    item.isCheck ? "bg-green-400" : "bg-gray-400"
                  }`}
                  color="#ffffff"
                />
              )}
            </td>
          </tr>
        ))}
      </table>
      <Button1
        buttonLabel={"Complete"}
        className={"mt-5 bg-green-400 hover:bg-green-500 text-white"}
      />
    </div>
  );
};

export default FriendView;
