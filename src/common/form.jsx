import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const { data, errors } = { ...this.state };
    data[input.name] = input.value;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = { ...this.state };
    return (
      <Input
        type={type}
        name={name}
        onChange={this.handleChange}
        label={label}
        value={data[name]}
        error={errors[name]}
      ></Input>
    );
  }
  renderSelect(name, items, TextProperty, ValuePropery, label) {
    const { data, errors } = { ...this.state };
    return (
      <Select
        name={name}
        items={items}
        TextProperty={TextProperty}
        ValuePropery={ValuePropery}
        onChange={this.handleChange}
        label={label}
        value={data[name]}
        error={errors[name]}
      ></Select>
    );
  }
}

export default Form;
