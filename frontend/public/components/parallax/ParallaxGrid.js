
import React from 'react'
import { config } from 'react-spring/renderprops'
import { getAllPhotos } from '../../lib/api'
import Grid from './Grid'
import Cell from './Cell'
import './styles.css'
import 'antd/dist/antd.css'

class ParallaxGrid extends React.Component {
  state = { data: [] }

  async componentDidMount() {
    try {
      const res = await getAllPhotos()
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
        heights={450}
        // Number of columns
        columns={4}
        // Space between elements
        margin={30}
        // Removes the possibility to scroll away from a maximized element
        lockScroll={false}
        // Delay when active elements (blown up) are minimized again
        closeDelay={400}
        // Regular react-spring configs
        config={config.slow}>{(data, active, toggle) => (
          <Cell {...data} active={active} toggle={toggle} />
        )}
      </Grid>
    )
  }
}

export default ParallaxGrid