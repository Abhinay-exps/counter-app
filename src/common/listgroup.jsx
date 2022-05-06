import React from "react";
const ListGroup = (props) => {
  const {
    items,
    TextProperty,
    ValueProperty,
    selectedItem,
    onItemSelect,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[ValueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[TextProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  TextProperty: "name",
  ValueProperty: "_id",
};

export default ListGroup;
