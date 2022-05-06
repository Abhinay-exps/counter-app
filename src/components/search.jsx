import React, { Component } from "react";
const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      id="search-input"
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control my-3"
    />
  );
};

export default Search;
