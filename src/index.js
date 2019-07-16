// https://github.com/vipinkrishna

import React, { Component } from 'react';
import { render } from 'react-dom';

import './index.scss'

class App extends Component {
  constructor() {
    super();
    this.state = {
      department: null,
      employee: null,
      departments: ["HR", "ENGINEERS"],
      hrList: [1,2,3,4,5],
      engineersList: [6,7,8,9],
      selectedList: [1,2,3,4,5],
      data: null,
      showDetails: false
    };
  }

  handleDepartmentChange = (e) => {
    const value = e.target.value
    value === "HR" ?  this.setState({selectedList: this.state.hrList, department: value, employee: this.state.hrList[0]}) : this.setState({selectedList: this.state.engineersList, department: value, employee: this.state.engineersList[0]})
  }

  handleEmployeeIdChange = (e) => {
    const value = e.target.value
    this.setState({employee: value})
  }

  handleShowDetails = (url) => {
    // let url = `https://reqres.in/api/users/${this.state.employee}`
    if(this.state.employee) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.setState({data: data.data, showDetails: true})
        })
    }
  }

  handleClear = () => {
    this.setState({hrList: null, engineersList: null, selectedList: null, departments: null, department: null, employee: null, showDetails: false})
  }

  render() {
    const selectedList = this.state.selectedList && this.state.selectedList.map(id => {
      return <option key={id} value={id}>{id}</option>
    })

    const departments = this.state.departments && this.state.departments.map(dept => {
      return <option key={dept} value={dept}>{dept}</option>
    })

    const details = <>
      <img src={this.state.data && this.state.data.avatar}/>
      <div><strong>ID: </strong>{this.state.data && this.state.data.id}</div>
      <div>{this.state.data && this.state.data.first_name + " "}{this.state.data && this.state.data.last_name}</div>
    </>


    return (
      <>
        <div className="Input">
          <div>
            <select onChange={this.handleDepartmentChange}>
              {departments}
            </select>
          </div>
          <div>
            <select onChange={this.handleEmployeeIdChange}>
              {selectedList}
            </select>
          </div>

          <div>
              <button onClick={() => this.handleShowDetails(`https://reqres.in/api/users/${this.state.employee}`)}>Show Details</button>
          </div>
          <div>
              <button onClick={this.handleClear}>Clear</button>
          </div>
        </div>

        <div className="Output">
          {this.state.showDetails && details}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.setState({department: this.state.departments[0], employee: this.state.selectedList[0]})
  }
}

render(<App />, document.getElementById('root'));
