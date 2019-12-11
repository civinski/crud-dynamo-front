import React, { Component } from "react";
import api from "../../services/API";
import "./styles.css";
import { PropagateLoader } from "react-spinners";
import moment from "moment";
import VMasker from "vanilla-masker";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashcod: this.props.match.params.hashcod,
      nome: "",
      sinopse: "",
      data_estreia: "",
      classi_indicativa: "",
      loading: false
    };
  }

  componentDidMount() {
    if (this.state.hashcod !== "new") {
      this.getFilme();
    }
  }

  maskDate = date => {
    return VMasker.toPattern(date, "9999-99-99");
  };

  getFilme = async () => {
    this.setState({ loading: true });

    await api
      .get(`/filmes/${this.state.hashcod}`)
      .then(res => {
        console.log(res);
        this.setState({
          nome: res.data.nome,
          sinopse: res.data.sinopse,
          data_estreia: res.data.data_estreia,
          classi_indicativa: res.data.classi_indicativa,
          loading: false
        });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  enviar = () => {
    console.log("entrei");
    let {
      nome,
      sinopse,
      classi_indicativa,
      data_estreia,
      hashcod
    } = this.state;

    if (this.state.hashcod === "new") {
      api
        .post("/filmes/cadastro", {
          nome,
          sinopse,
          classi_indicativa,
          data_estreia
        })
        .then(res => {
          console.log(res);
          if (res.data) {
            alert("SUCESSO!!");
          }
        })
        .catch(e => console.log(e));
    } else {
      api
        .put(`/filmes/${this.state.hashcod}`, {
          nome,
          sinopse,
          classi_indicativa,
          data_estreia
        })
        .then(res => {
          console.log(res);
          if (res.data) {
            alert("SUCESSO!!");
          }
        })
        .catch(e => console.log(e));
    }
  };

  render() {
    return (
      <div className='main'>
        <div className='product-info'>
          <form>
            <input
              className='input'
              type='text'
              placeholder='Nome'
              name='nome'
              value={this.state.nome}
              onChange={event => this.setState({ nome: event.target.value })}
            />
            <textarea
              className='textArea'
              type='textarea'
              placeholder='Sinopse'
              name='sinopse'
              value={this.state.sinopse}
              onChange={event => this.setState({ sinopse: event.target.value })}
            />
            <input
              className='input'
              type='text'
              placeholder='Data da estreia (YYYY-MM-DD)'
              name='data_estreia'
              value={this.state.data_estreia}
              onChange={event =>
                this.setState({
                  data_estreia: this.maskDate(event.target.value)
                })
              }
            />
            <input
              className='input'
              type='text'
              placeholder='Classificação indicativa'
              name='classi_indicativa'
              value={this.state.classi_indicativa}
              onChange={event =>
                this.setState({ classi_indicativa: event.target.value })
              }
            />

            <button type='button' className='botao' onClick={this.enviar}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
