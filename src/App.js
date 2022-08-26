import React, { Component } from 'react'
import NavBar from './Components/NavBar'
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  // apikey = `${process.env.REACT_APP_APIKEY}`;
  apikey = `${process.env.REACT_APP_APIKEY2}`;
  pagesize = 11;
  country = "in";

  state = {
    progress: 0
  }
  setprogress = (prog) => {
    this.setState({ progress: prog })

  }

  render() {
    return (
      <>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            color=' #ff6666'
            loaderSpeed={350}
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setprogress={this.setprogress} pagesize={this.pagesize} key="general" apikey={this.apikey} category={"general"} country={this.country} bg="dark" />} />
            <Route exact path="/business" element={<News setprogress={this.setprogress} key="business" pagesize={this.pagesize} apikey={this.apikey} category={"business"} country={this.country} bg="primary" />} />
            <Route exact path="/entertainment" element={<News setprogress={this.setprogress} key="entertainment" pagesize={this.pagesize} apikey={this.apikey} category={"entertainment"} country={this.country} bg="info" />} />
            <Route exact path="/health" element={<News setprogress={this.setprogress} key="health" pagesize={this.pagesize} apikey={this.apikey} category={"health"} country={this.country} bg="secondary" />} />
            <Route exact path="/science" element={<News setprogress={this.setprogress} key="science" pagesize={this.pagesize} apikey={this.apikey} category={"science"} country={this.country} bg="dark" />} />
            <Route exact path="/sports" element={<News setprogress={this.setprogress} key="sports" pagesize={this.pagesize} apikey={this.apikey} category={"sports"} country={this.country} bg="success" />} />
            <Route exact path="/technology" element={<News setprogress={this.setprogress} key="technology" pagesize={this.pagesize} apikey={this.apikey} category={"technology"} country={this.country} bg="secondary" />} />
          </Routes>
        </BrowserRouter>

      </>
    )
  }
}

export default App