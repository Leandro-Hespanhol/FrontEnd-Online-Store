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
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  inputText = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
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

  render() {
    const { categoriesList, searchBar, actualProduct } = this.state;
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
        <Link to="/cart" data-testid="shopping-cart-button"> Carrinho </Link>
        <div className="categories-products-div">
          {categoriesList.map((category) => (
            <div key={ category.id }>
              <input
                type="radio"
                data-testid="category"
                name="category"
                onClick={ this.buttonClick }
                onChange={ this.inputText }
              />
              {category.name}
            </div>
          ))}
          <div className="list-container">
            { actualProduct.length === 0 ? <h1>Nenhum produto foi encontrado</h1>
              : (
                actualProduct.map((product) => (<Card
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                  title={ product.title }
                  key={ product.id }
                />))
              )}
          </div>
        </div>
      </main>
    );
  }
}
