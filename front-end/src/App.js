import React, { Component } from "react";
import clienteAxios from "./config/axios";
import Axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      description: "",
      tasks: []
    };

    this.addtask = this.addtask.bind(this);
    this.handelChange = this.handelChange.bind(this);
  }

  // cuando agrego una tarea en mi formulario el onSubmit busca mi funcion addtask y captura el evente = e
  addtask(e) {
    //envio datos a mi api en en api/tasks en el back !!!
    const { title, description } = this.state;
    clienteAxios
      .post("/", { title, description })
      .then(res => {
        console.log(res.data, this.state);
        this.setState({ title: " ", description: " " });
        this.fechtData();
      })
      //me traes el res.json("del back que dice datos guardados")
      .catch(erro => console.log(erro));

    e.preventDefault();
    //cancelo el evento de refrescar para poder capturar que ingresa correctamente a mi funcion
  }
  //va a capturar lo que tipea el usuario en el input title, capturo el evento de con e
  handelChange(e) {
    // capturo nombre de mi input (title,description) de mi formulario
    const { name, value } = e.target;
    //cambio mi estado con lo ingresado
    this.setState({ [name]: value });
  }
  // vamos a traer la info de la base de datos
  fechtData() {
    Axios.get("/");
    clienteAxios
      .get("/")
      .then(data => {
        ///aqui traigo el arreglo de informacion
        this.setState({ tasks: data.data });
        console.log(this.state.tasks);
      })
      .catch(erro => console.log(erro));
  }

  // va siempre antes del render
  componentDidMount() {
    this.fechtData();
    //verifico que se conecta a la base de dato
  }
  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN STACK
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addtask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handelChange}
                          type="text"
                          placeholder="titulo-tarea"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          placeholder="descripcion de tarea"
                          className="materialize-textarea"
                          name="description"
                          onChange={this.handelChange}
                          value={this.state.description}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      ENVIAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>DESCRIPCION</th>
                  </tr>
                </thead>
                {this.state.tasks.map(task => {
                  return (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                    </tr>
                  );
                })}

                <tbody />
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
