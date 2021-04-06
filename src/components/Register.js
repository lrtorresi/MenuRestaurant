import React from 'react';
import {Row, Card, Input, Button} from 'react-materialize';
import * as services from '../services/apiServices'

export default class Register extends React.Component{

 //construtor da classe
 constructor(props) {
  super(props);

  //declarando o state do componente
  //definindo todos os atributos que o componente irá armazenar
  this.state = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    senhaConfirmacao: '',
    result: {
      mensagem_sucesso: '',
      mensagem_erro: '',
      erros_validacao: {
        nome: [],
        email: [],
        telefone: [],
        senha: [],
        senhaConfirmacao: []
      }
    }
  }

  //forçar o componente a sempre registrar estas funções a cada mudança de state
  //com exceção da função render, todas as funções criadas em um componente que
  //precisam manipular o state devem ser registradas no construtor com 'bind'
  this.handleNome = this.handleNome.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.handleTelefone = this.handleTelefone.bind(this);
  this.handleSenha = this.handleSenha.bind(this);
  this.handleSenhaConfirmacao = this.handleSenhaConfirmacao.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

//funções para capturar o evento change em cada campo
handleNome(e) { this.setState({ nome: e.target.value }) }
handleEmail(e) { this.setState({ email: e.target.value }) }
handleTelefone(e) { this.setState({ telefone: e.target.value }) }
handleSenha(e) { this.setState({ senha: e.target.value }) }
handleSenhaConfirmacao(e) { this.setState({ senhaConfirmacao: e.target.value }) }

//função para processar o evento SUBMIT do formulário
handleSubmit(e) {
  e.preventDefault(); //anular o SUBMIT POST do formulário

  //limpar as mensagens..
  this.setState({
    result: {
      mensagem_sucesso: '', //limpando mensagem de sucesso
      mensagem_erro: '', //limpando mensagem de erro
      erros_validacao: { //limpando erros de validação
        nome: [],
        email: [],
        telefone: [],
        senha: [],
        senhaConfirmacao: []
      }
    }
  });

  //executando a chamada da API..
  services.postCliente(this.state)
    .then( //promisse de sucesso da API
      data => {

        //limpar os campos do formulário..
        this.setState({
          nome: '',
          email: '',
          telefone: '',
          senha: '',
          senhaConfirmacao: '',
          result: {
            mensagem_sucesso: data.message
          }
        })

      }
    )
    .catch( //promisse de erro da API
      e => {

        var error = e.response;

        switch (error.status) {

          case 400:

            //guardar os erros de validação obtidos da api
            var val = error.data.errors;

            //armazenar os erros de validação no state
            this.setState({
              result: {
                erros_validacao: { //limpando erros de validação
                  nome: val.Nome !== undefined ? val.Nome : [],
                  email: val.Email !== undefined ? val.Email : [],
                  telefone: val.Telefone !== undefined ? val.Telefone : [],
                  senha: val.Senha !== undefined ? val.Senha : [],
                  senhaConfirmacao: val.SenhaConfirmacao !== undefined ? val.SenhaConfirmacao : []
                }
              }
            });

            break;

          case 500:
            //exibir mensagem de erro..
            this.setState({
              result: {
                mensagem_erro: error.data.message
              }
            })
            break;
        }

      }
    )
}

//função para renderizar o conteudo HTML do componente..
render() {
  return (
    <Row>
      <Card>
        <h4><strong>Crie sua Conta de Cliente</strong></h4>

        <h5 className="green-text text-darken-4">
          <strong>{this.state.result.mensagem_sucesso}</strong>
        </h5>

        <h5 className="red-text text-darken-4">
          <strong>{this.state.result.mensagem_erro}</strong>
        </h5>

        <br />

        <form autoComplete="false" method="post" onSubmit={this.handleSubmit}>

          <Row>
            <Input
              label="Nome do Cliente"
              placeholder="Ex: João da Silva"
              type="text"
              name="nome"
              s={12}
              onChange={this.handleNome}
              value={this.state.nome}
            />
            {
              this.state.result.erros_validacao.nome.map(
                (msg, i) => (
                  <div key={i} className="red-text text-darken-4" style={{ marginLeft: '10px' }}>
                    {msg}
                  </div>
                )
              )
            }
          </Row>

          <Row>
            <Input
              label="Email"
              placeholder="Ex: joaodasilva@gmail.com"
              type="email"
              name="email"
              s={12}
              onChange={this.handleEmail}
              value={this.state.email}
            />
            {
              this.state.result.erros_validacao.email.map(
                (msg, i) => (
                  <div key={i} className="red-text text-darken-4" style={{ marginLeft: '10px' }}>
                    {msg}
                  </div>
                )
              )
            }
          </Row>

          <Row>
            <Input
              label="Telefone"
              placeholder="Ex: 21969575900"
              type="text"
              name="telefone"
              s={12}
              onChange={this.handleTelefone}
              value={this.state.telefone}
            />
            {
              this.state.result.erros_validacao.telefone.map(
                (msg, i) => (
                  <div key={i} className="red-text text-darken-4" style={{ marginLeft: '10px' }}>
                    {msg}
                  </div>
                )
              )
            }
          </Row>

          <Row>
            <Input
              label="Senha de Acesso"
              placeholder="Digite aqui"
              type="password"
              name="senha"
              s={12}
              onChange={this.handleSenha}
              value={this.state.senha}
            />
            {
              this.state.result.erros_validacao.senha.map(
                (msg, i) => (
                  <div key={i} className="red-text text-darken-4" style={{ marginLeft: '10px' }}>
                    {msg}
                  </div>
                )
              )
            }
          </Row>

          <Row>
            <Input
              label="Confirme sua Senha"
              placeholder="Digite aqui"
              type="password"
              name="senhaConfirmacao"
              s={12}
              onChange={this.handleSenhaConfirmacao}
              value={this.state.senhaConfirmacao}
            />
            {
              this.state.result.erros_validacao.senhaConfirmacao.map(
                (msg, i) => (
                  <div key={i} className="red-text text-darken-4" style={{ marginLeft: '10px' }}>
                    {msg}
                  </div>
                )
              )
            }
          </Row>

          <Row>
            <Button
              type="submit"
              className="right deep-orange"
            >
              Realizar Cadastro
          </Button>
          </Row>

        </form>

      </Card>
    </Row>
  )
}
}
