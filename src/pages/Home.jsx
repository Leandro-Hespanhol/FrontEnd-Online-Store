import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      searchBar: '',
      actualProduct: [],
      category: '',
      cartList: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  inputText = ({ target }) => {
    const { name, value, type } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (type === 'radio') this.buttonClick();
    });
  }

  buttonClick = async () => {
    const { searchBar, category } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(category, searchBar);
    this.setState({
      actualProduct: results,
    });
  }

  fetchCategories = async () => {
    const categories = await getCategories();

    this.setState({
      categoriesList: categories,
    });
  }

  addToCart = ({ target: { id } }) => {
    const { cartList, actualProduct } = this.state;
    const product = actualProduct.find((item) => item.id === id);
    this.setState({ cartList: [...cartList, product] });
  }

  render() {
    const { categoriesList, searchBar, actualProduct, cartList } = this.state;
    return (
      <main>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            placeholder="Busca..."
            data-testid="query-input"
            name="searchBar"
            value={ searchBar }
            onChange={ this.inputText }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.buttonClick }
          >
            Pesquisar
          </button>
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </p>
        </label>
        <Link
          data-testid="shopping-cart-button"
          to={ {
            pathname: '/cart',
            state: { cartList },
          } }
        >
          Carrinho
        </Link>
        <span data-testid="shopping-cart-product-quantity">
          { cartList.length }
        </span>
        <div className="categories-products-div">
          <div>
            {categoriesList.map(({ id, name }) => (
              <label htmlFor={ id } key={ id }>
                <input
                  type="radio"
                  data-testid="category"
                  name="category"
                  id={ id }
                  value={ id }
                  onChange={ this.inputText }
                />
                {name}
              </label>
            ))}
          </div>
          <div className="list-container">
            { actualProduct.length === 0 ? <h1>Nenhum produto foi encontrado</h1>
              : (
                actualProduct.map((product) => (<Card
                  { ...product }
                  id={ product.id }
                  data-testid={ cartList.includes(product.id)
                    ? 'shopping-cart-product-name'
                    : '' }
                  key={ product.id }
                  addToCart={ this.addToCart }
                />))
              )}
          </div>
        </div>
      </main>
    );
  }
}
