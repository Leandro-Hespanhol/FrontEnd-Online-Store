import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();

    this.setState({
      categoriesList: categories,
    });
  }

  render() {
    const { categoriesList } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            type="text"
            id="search"
            placeholder="Busca..."
          />
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.

          </p>
        </label>
        <Link to="/cart" data-testid="shopping-cart-button"> Carrinho </Link>
        <ul>
          {categoriesList.map((category) => (
            <li
              data-testid="category"
              key={ category.id }
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
