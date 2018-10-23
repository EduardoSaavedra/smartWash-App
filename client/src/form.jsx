import React from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      size: '1-3 kg',
      specialInd: '',
      service: 'Laundry',
      time: '',
      userId: undefined,
      userName: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.addOrder = this.addOrder.bind(this);
    this.add = this.add.bind(this);
    this.getUserInfo2 = this.getUserInfo2.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleName(e) {
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  handlePhone(e) {
    e.preventDefault();
    this.setState({phone: e.target.value})
  }

  handleAddress(e) {
    e.preventDefault();
    this.setState({address: e.target.value})
  }

  handleSize(e) {
    e.preventDefault();
    this.setState({size: e.target.value})
  }

  handleSpecialInd(e) {
    e.preventDefault();
    this.setState({specialInd: e.target.value})
  }

  handleService(e) {
    e.preventDefault();
    this.setState({service: e.target.value})
  }

getUserInfo2() {
 $.ajax({
   url: '/users/',
   method:'GET',
   success: (data) => {
    console.log(data, "awiwi");
    for ( var i = 0; i < data.length; i++){
      if (data[i].email === this.props.user.email){
        console.log("user found", data[i]);
        const usersInfo = data[i];
        this.setState({
          userId: usersInfo.id,
          userName: usersInfo.userName,
        })
      }
      console.log("user assigned");
    }
   },
   error:(xhr,err) => {
     console.log('la cagaste desde el fronts',err)
   }
 })
}


  addOrder(name, phone, address, size, specialInd, service){
   $.ajax({
     type: "POST",
     url: "/order",
     contentType: 'application/json',
     data: JSON.stringify({
       name: name,
       phone: phone,
       address: address,
       size: size,
       specialInd: specialInd,
       service: service
     }),
     success:(data)=> {
     },
     error: (xhr,status,error) => {
       console.log(error);
     }
   });
  }

  add(event) {
    event.preventDefault();
    this.addOrder(this.state.name, this.state.phone, this.state.address, this.state.size, this.state.specialInd, this.state.service);
    this.setState({
      name: '',
      phone: '',
      address: '',
      size: '',
      specialInd: '',
      service: ''
    })
  }

  componentDidMount2(){
    getUserInfo();
//    console.log("form mounted")
  }

  render () {
    return (
    <div>

      <form>
        <span>Name:</span>
        <input  type= 'name' name="name" className="catInput radius form-control form-control-md" aria-describedby="name" placeholder="Enter Name:" value={this.state.name} onChange={this.handleChange}></input>
      </form>

      <form>
        <span>Cellphone:</span>
        <input type= 'text' name="phone"className="catInput radius form-control form-control-md" placeholder="Enter Number Cellphone:" value={this.state.phone} onChange={this.handleChange}></input>
      </form>

      <form>
        <span>Address:</span>
        <input type= 'text' name="address" className="catInput radius form-control form-control-md" placeholder="Enter Address:" value={this.state.address} onChange={this.handleChange}></input>
      </form>

      <form>
        <span>Size:</span>
        <select
        className="catInput radius form-control form-control-md"
        name="size"
        value={this.state.size}
        onChange={this.handleChange}
        type="select"
        >
          <option>1-3 kg</option>
          <option>3-5 Kg</option>
          <option>5-7 Kg</option>
        </select>
      </form>

      <form>
        <span>Special indications:</span>
        <input type='text' name="specialInd" className="catInput radius form-control form-control-md" placeholder="Enter Special Indications:" value={this.state.specialInd} onChange={this.handleChange}></input>
      </form>

      <form>
        <span>Service:</span>
        <select
        className="catInput radius form-control form-control-md"
        name="service"
        value={this.state.service}
        onChange={this.handleChange}
        type="select"
        >
          <option>Laundry</option>
          <option>Dry-clean</option>
          <option>Ironed and folded</option>
        </select>
        <button className="btn btn-primary mb-2" onClick={this.add}>Crear Orden</button>
      </form>

      <Button bsStyle="info"><NavLink to ='/pickDay'>Ordenar ahora</NavLink></Button>
    </div>);
  }
}

export default Form;
