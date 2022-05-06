import React from "react";
const Select = ({
  name,
  items,
  TextProperty,
  ValuePropery,
  label,
  error,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        className="custom-select d-block w-100"
      >
        <option value=""></option>
        {items.map((item) => (
          <option value={item[ValuePropery]} key={item[ValuePropery]}>
            {item[TextProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
