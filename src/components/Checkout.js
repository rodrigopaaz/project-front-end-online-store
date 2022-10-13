import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCart } from '../services/api';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      name: '',
      phone: '',
      email: '',
      cpf: '',
      cep: '',
      address: '',
      payment: '',
      isValid: true,
    };
  }

  componentDidMount() {
    this.getItems();
  }

  handleChange = ({ target }) => {
    this.setState({ isValid: true });
    const { name, value, type, id } = target;
    if (type === 'radio') {
      this.setState({ payment: id });
    } else {
      this.setState({ [name]: value });
    }
  };

  getItems = () => {
    const cartUpdate = [];
    const cart2 = getCart();
    return cart2.forEach((elemento) => {
      if (!cartUpdate.find((element) => element.name === elemento.name)) {
        cartUpdate.push(elemento);
        this.setState({ cart: cartUpdate });
      }
    });
  };

  checkInputs = () => {
    const { name, phone,
      email, cpf,
      cep, address,
      payment } = this.state;
    const checkName = name.length > 1;
    const checkPhone = phone.length > 1;
    const checkEmail = email.length > 1;
    const checkCpf = cpf.length > 1;
    const checkCep = cep.length > 1;
    const checkAdress = address.length > 1;
    const checkPaymentMethod = payment.length > 1;
    return checkName && checkPhone && checkCep && checkEmail
    && checkCpf && checkAdress && checkPaymentMethod;
  };

  submitBtn = () => {
    if (this.checkInputs() === true) {
      const { history } = this.props;
      history.push('/');
      localStorage.removeItem('cart');
      this.setState({
        cart: [],
        name: '',
        phone: '',
        email: '',
        cpf: '',
        cep: '',
        address: '',
        payment: '',
        isValid: true,
      });
    } else { this.setState({ isValid: false }); }
  };

  render() {
    const { cart, isValid, name, phone, email, cpf, cep, address } = this.state;
    return (
      <div>
        <div>
          {cart.map((element, index) => (
            <div key={ index }>
              <span>
                {element.title}
              </span>
              <img src={ element.thumbnail } alt="itemPicture" srcSet="" />
            </div>))}
        </div>
        <div>
          <label htmlFor="name">
            {' '}
            Nome Completo:
            <input
              name="name"
              data-testid="checkout-fullname"
              type="text"
              required
              value={ name }
              placeholder="Insira seu nome completo"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            {' '}
            Email:
            <input
              name="email"
              data-testid="checkout-email"
              type="text"
              required
              value={ email }
              placeholder="Insira seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            {' '}
            CPF:
            <input
              name="cpf"
              data-testid="checkout-cpf"
              type="text"
              required
              value={ cpf }
              placeholder="Insira seu CPF"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="phone">
            {' '}
            Telefone:
            <input
              name="phone"
              data-testid="checkout-phone"
              type="text"
              required
              value={ phone }
              placeholder="Insira seu Telefone para contato"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            {' '}
            Cep:
            <input
              name="cep"
              data-testid="checkout-cep"
              type="text"
              required
              value={ cep }
              placeholder="Insira seu CEP"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="address">
            {' '}
            Endereço:
            <input
              name="address"
              data-testid="checkout-address"
              type="text"
              required
              value={ address }
              placeholder="Insira seu nome endereço"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="paymentMethod">
            {' '}
            Boleto:
            <input
              data-testid="ticket-payment"
              name="paymentMethod"
              type="radio"
              id="Boleto"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="paymentMethod">
            Visa:
            <input
              data-testid="visa-payment"
              name="paymentMethod"
              type="radio"
              id="Visa"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="paymentMethod">
            MasterCard:
            <input
              data-testid="master-payment"
              name="paymentMethod"
              type="radio"
              id="MasterCard"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="paymentMethod">
            Elo:
            <input
              data-testid="elo-payment"
              name="paymentMethod"
              type="radio"
              id="Elo"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.submitBtn }
          onChange={ this.handleChange }
        >
          Enviar

        </button>
        {isValid === false && <p data-testid="error-msg">Campos inválidos</p>}
      </div>

    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
