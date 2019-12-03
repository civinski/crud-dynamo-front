import React, { Component } from "react";
import api from "../../services/API";
import "./styles.css";
import { PropagateLoader } from "react-spinners";
import moment from "moment";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashcod: this.props.match.params.hashcod,
      filme: {},
      loading: false
    };
  }

  componentDidMount() {
    this.getFilme();
  }

  getFilme = async () => {
    this.setState({ loading: true });

    await api
      .get(`/filmes/${this.state.hashcod}`)
      .then(res => {
        console.log(res);
        this.setState({
          filme: res.data,
          loading: false
        });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className='main'>
        {this.state.loading ? (
          <div className='loading'>
            <PropagateLoader color={"#37b6ae"} loading={this.state.loading} />
          </div>
        ) : (
          <div className='product-info'>
            <h1>{this.state.filme.nome}</h1>
            <br />
            <p>{this.state.filme.sinopse}</p>
            <br />
            <p>
              <strong>Classificação:</strong>{" "}
              {this.state.filme.classi_indicativa}
            </p>
            <p>
              <strong>Data de estreia:</strong>{" "}
              {moment(this.state.filme.data_estreia).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
      </div>
    );
  }
}
