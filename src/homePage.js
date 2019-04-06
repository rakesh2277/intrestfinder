import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Modal from 'react-responsive-modal';
import { Button, FormGroup, FormControl, } from "react-bootstrap";
class HomePage extends Component {
    constructor(props) {
        super(props);    
        this.state = {
          amount: '',
          month:6,
          interestRate:'',        
          totalAmount:'',
          principleAmount:'',
          monthlyAmount:'',
          getAmount:'' ,
          open: false,    
        
        };
      }
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
   
    
      handleSubmit = event => {
        event.preventDefault();
      }
      handleChangemonth=event=>{
        this.setState({
          month:event.target.value
        })
      } 
    
      handleChange = event => {
        this.setState({
        amount:event.target.value
        });
      }    
    
      handleSubmit = event => {
        event.preventDefault();
       
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.month}`)
        .then (response=> {
          // console.log(response.data)
          this.setState({     
            interestRate:response.data.interestRate,
          totalAmount:JSON.stringify(response.data.monthlyPayment),
          principleAmount:JSON.stringify(response.data.principal),
          open: true 
          })
          var n1 =this.state.totalAmount.replace(/[{}]/g, "").split(',')[0]
          var n2=n1.replace(/"/g, "")
          var val1 =this.state.principleAmount.replace(/[{}]/g, "").split(',')[0] 
          var val2=val1.replace(/"/g, "")       
          
            this.setState({
              getAmount:val2,
              monthlyAmount:n2
            })
          })
          .catch(error=> {
            console.log(error);
          });
        
      }      
    
  render() {
    const {open} = this.state;      
      return (
        <div>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <div className="slider">
              <input
                className="slider"
                id="typeinp"
                type="range"
                min="6"
                max="24"
                value={this.state.month}
                onChange={this.handleChangemonth}
                step="1"
              />
              <input
                className="slider"
                type="text"
                readOnly={true}
                placeholder="Selected Month"
                value={this.state.month}
                step="1"
              />
            </div>
            <FormGroup controlId="email">
              <div>value should be between $500 and $5000</div>
              <label>Amount</label>
      
              <FormControl
                autoFocus
                min="500"
                max="5000"
                type="number"
                required={true}
                value={this.state.amount}
                onChange={this.handleChange}
              />
              {this.state.amount.length > 4 ? (
                <div>please inter only four digit and less then or equal 5000</div>
              ) : null}
            </FormGroup>
            <Button block type="submit">
              Find total
            </Button>
          </form>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h1>youre inters rate {this.state.interestRate}</h1>
          <h1>youre monthly {this.state.monthlyAmount}</h1>
          <h1>youre Entered principal {this.state.getAmount} </h1>
        </Modal>
      </div>
      

    );
  }
}

export default HomePage;
