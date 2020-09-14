
import React from 'react'
import { config } from 'react-spring/renderprops'
import Grid from './Grid'
import './styles.css'
import 'antd/dist/antd.css'
import Cell from './Cell'
import axios from 'axios'

class ParallaxGrid extends React.Component {
  state = { data: [] }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/photos')
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  filtered = () => {
    // console.log(this.props)
    const searchTerm = this.props.location.search.replace('?search=', '')
    console.log(searchTerm)

    const re = new RegExp(searchTerm, 'i')
    return this.state.data.filter(country => (
      re.test(country.location)
    ))
  }

  render() {
    // console.log(this.state.data)
    console.log(this.filtered())
    return (
      <Grid
        className="grid"
        // Arbitrary data, should contain keys, possibly heights, etc.
        data={this.filtered()}
        // Key accessor, instructs grid on how to fet individual keys from the data set
        keys={d => d.id}
        // Can be a fixed value or an individual data accessor
        heights={200}
        // Number of columns
        columns={2}
        // Space between elements
        margin={30}
        // Removes the possibility to scroll away from a maximized element
        lockScroll={false}
        // Delay when active elements (blown up) are minimized again
        closeDelay={500}
        // Regular react-spring configs
        config={config.slow}>{(data, active, toggle) => (
          <Cell {...data} active={active} toggle={toggle} />
        )}
      </Grid>
    )
  }
}

export default ParallaxGrid