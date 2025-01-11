import { Check } from "lucide-react";
import Button1 from "../components/common/Button1";

const items = [
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
];

const FinalBill = () => {
  return (
    <div className="w-full">
      <p className="text-2xl">Bill Splitting</p>
      <p>Final bill</p>
      <table className="w-full mt-5 text-start">
        <tr>
          <th className="text-start">UID</th>
          <th className="text-start">Cost</th>
          <th className="text-start">Paid</th>
        </tr>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="py-2">{item.uid}</td>
            <td className="py-2">${item.cost}</td>
            <td className="py-2">
              <Check
                className={`rounded-full p-1 ${
                  item.isCheck ? "bg-green-400" : "bg-gray-400"
                }`}
                color="#ffffff"
              />
            </td>
          </tr>
        ))}
      </table>
      <Button1
        buttonLabel={"Done"}
        className={"mt-5 bg-green-400 hover:bg-green-500 text-white"}
      />
    </div>
  );
};

export default FinalBill;
