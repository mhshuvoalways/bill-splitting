import { ArrowBigRight, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button1 from "../components/common/Button1";
import Modal from "../components/common/Model";
import ManualInput from "../components/receipt/ManualInput";

const items = [
  {
    item: "Chicken",
    cost: 5,
    uid: "23da1y",
  },
  {
    item: "Briyani",
    cost: 12,
    uid: "93da1a",
  },
  {
    item: "Pasta",
    cost: 12,
    uid: "4afd1y",
  },
  {
    item: "GST",
    cost: 3,
  },
];

const UploadReceipt = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [isEdit, setIsEdit] = useState("");

  const deleteHandler = () => {};

  return (
    <div className="w-full">
      <p className="text-2xl">Bill Splitting</p>
      <p>{isSplit ? "Payee split options" : "Payee"}</p>
      <table className="w-full mt-5 text-start">
        <tr>
          <th className="text-start">Item</th>
          <th className="text-start">Cost</th>
          <th className="text-start">UID</th>
          <th className="text-start">Action</th>
        </tr>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="py-2">{item.item}</td>
            <td className="py-2">${item.cost}</td>
            <td className="py-2">{item.uid}</td>
            {item.uid && (
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <Trash
                    className="cursor-pointer"
                    onClick={() => deleteHandler(item.uid)}
                    size={16}
                  />
                  <Edit
                    className="cursor-pointer"
                    onClick={() => setIsEdit(item.uid)}
                    size={16}
                  />
                </div>
              </td>
            )}
          </tr>
        ))}
      </table>
      {isSplit ? (
        <div className="space-y-2 mt-2">
          <Button1
            buttonLabel={"Split equally"}
            className={"bg-gray-300 hover:bg-gray-400"}
          />
          <Button1
            buttonLabel={"Split per item"}
            className={"bg-red-100 hover:bg-red-200"}
          />
          <div className="flex items-center gap-x-1">
            <input
              type="text"
              className="block outline-0 rounded-md bg-white border w-full py-1 px-2 focus:ring-1"
              placeholder="input for customization..."
            />
            <ArrowBigRight size={40} color="#4ade80" />
          </div>
        </div>
      ) : (
        <Button1
          buttonLabel={"Split options"}
          className={"mt-2 bg-red-100 hover:bg-red-200"}
          onClick={() => setIsSplit(!isSplit)}
        />
      )}
      <Link to="/final-bill">
        <Button1
          buttonLabel={"Complete"}
          className={"mt-5 bg-green-400 hover:bg-green-500 text-white"}
        />
      </Link>
      <Modal isOpen={isEdit ? true : false} onClose={() => setIsEdit("")}>
        <ManualInput items={items} id={isEdit} />
      </Modal>
    </div>
  );
};

export default UploadReceipt;
