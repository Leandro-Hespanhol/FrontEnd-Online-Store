import React, { Component } from 'react';
import { getCart } from '../services/storage';

export default class Checkout extends Component {
  constructor() {
    super();

    const cart = getCart();

    this.state = {
      cartItems: cart,
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  renderInput = (label, data, value) => (
    <label htmlFor={ data }>
      {label}
      <input
        type="text"
        data-testid={ `checkout-${data}` }
        id={ data }
        name={ data }
        value={ value }
        onChange={ this.handleChange }
      />
    </label>
  )

  render() {
    const { cartItems, fullname, email, cpf, phone, cep, address } = this.state;
    return (
      <div>
        {cartItems.map((e) => <p key={ e.id }>{e.title}</p>)}
        {/* ADD PRODUCT CART TOTAL LIST */}
        <form>
          {this.renderInput('Nome completo: ', 'fullname', fullname)}
          <br />
          {this.renderInput('Email: ', 'email', email)}
          <br />
          {this.renderInput('CPF: ', 'cpf', cpf)}
          <br />
          {this.renderInput('Telefone: ', 'phone', phone)}
          <br />
          {this.renderInput('CEP: ', 'cep', cep)}
          <br />
          {this.renderInput('Endereço: ', 'address', address)}
          <br />
        </form>
      </div>
    );
  }
}
