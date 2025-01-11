import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import Button1 from "../common/Button1";

const ManualInput = ({ items, setItems, id }) => {
  const [values, setValues] = useState({
    item: "",
    cost: "",
  });

  const valuesHandler = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const addHandler = (event) => {
    event.preventDefault();
    const temp = [...items];
    const obj = { ...values };
    obj.uid = uid(6);
    temp.push(obj);
    setItems(temp);
    setValues({ item: "", cost: "" });
  };

  useEffect(() => {
    if (id) {
      const findItem = items.find((el) => el.uid === id);
      setValues(findItem);
    }
  }, [id, items]);

  return (
    <form className="text-start space-y-2" onSubmit={addHandler}>
      <div>
        <label>Item</label>
        <input
          type="text"
          className="block outline-0 rounded-md bg-white border w-full py-1 px-2 focus:ring-1 mt-1"
          placeholder="Chicken"
          name="item"
          onChange={valuesHandler}
          required
          value={values.item}
        />
      </div>
      <div>
        <label>Cost</label>
        <input
          type="number"
          className="block outline-0 rounded-md bg-white border w-full py-1 px-2 focus:ring-1 mt-1"
          placeholder="16"
          name="cost"
          onChange={valuesHandler}
          required
          value={values.cost}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button1
          buttonLabel={"Add"}
          className={"bg-green-400 hover:bg-green-500 text-white"}
        />
        {!id && items.length ? (
          <Link to={"/split"}>
            <Button1 buttonLabel={"Done"} buttonType={"button"} />
          </Link>
        ) : null}
      </div>
    </form>
  );
};

export default ManualInput;
