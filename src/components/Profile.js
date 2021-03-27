import React from 'react';
import { Row, Card } from 'react-materialize';
import * as services from '../services/apiServices';

class Profile extends React.Component {

  //construtor
  constructor(props) {
    super(props);

    //declarando os atributos deste componente
    //atraves da ferramenta 'state'
    this.state = {
      nome: '', //armazenar o nome do restaurante
      foto: '', //armazenar a foto do restaurante
      descricao: '' //armazenar a descrição do restaurante
    };
  }

  //evento executado antes do componente ser renderizado
  componentDidMount() {
    //executar a consulta na API..
    services.getDadosRestaurante()
      .then( //retorno de sucesso da API..
        data => {
          this.setState({ ...data });
        }
      )
      .catch( //retorno de erro da API..
        e => {
          console.log(e);
        }
      )
  }

  render() {
    return (
      <Card>
        <Row>
          <img src={services.getApiUrl() + this.state.foto}
            className="responsive-img"
          />
        </Row>
        <Row>
          {this.state.nome}
        </Row>
        <Row>
          {this.state.descricao}
        </Row>
      </Card>
    )
  }
}

export default Profile;


