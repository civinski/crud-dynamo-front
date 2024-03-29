import React, { Component } from "react";
import "./styles.css";
import api from "../../services/API";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmes: [],
      productInfo: {},
      page: 1,
      loading: false
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    this.setState({ loading: true });

    await api
      .get("filmes/")
      .then(res => {
        console.log(res);
        this.setState({ filmes: res.data, loading: false });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  apagar = hashcod => {
    api
      .delete(`/filmes/${hashcod}`)
      .then(res => {
        console.log(res);
        if (res.data) {
          this.loadProducts();
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <>
        <div id='adicionarNovo'>
          <Link to={`/cadastro/new`}>Adicionar novo</Link>
        </div>
        <div className='product-list'>
          {this.state.loading ? (
            <div className='loading'>
              <PropagateLoader color={"#37b6ae"} loading={this.state.loading} />
            </div>
          ) : (
            this.state.filmes.map((item, index) => {
              return (
                <article key={item.hashcod}>
                  <strong>{item.nome}</strong>
                  <p>
                    {item.sinopse
                      ? item.sinopse.length > 150
                        ? item.sinopse.slice(0, 150) + "..."
                        : item.sinopse
                      : ""}
                  </p>

                  <Link to={`/filme/${item.hashcod}`}>Detalhes</Link>

                  <button
                    type='button'
                    className='botao'
                    onClick={() => this.apagar(item.hashcod)}
                  >
                    Apagar
                  </button>
                </article>
              );
            })
          )}
        </div>
      </>
    );
  }
}
