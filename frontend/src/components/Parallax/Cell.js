import React, { Component } from 'react'
import { Slug, Fade } from './Primitives'
import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons'
import './styles.css'
import 'antd/dist/antd.css'

class Cell extends Component {

  render() {
    const { toggle, location, active, image, owner } = this.props
    // console.log(owner.username)
    return (
      <div
        className="cell"
        style={{ backgroundImage: `url(${image})`, cursor: !active ? 'pointer' : 'auto' }}
        onClick={!active ? toggle : undefined}>
        <Fade show={active} delay={active ? 500 : 0}>
          <div className="details">
            <Slug delay={600}>
              <div className="circle" style={{ background: image }} />
              <div className="close">
                <Icon
                  type="close"
                  style={{ cursor: 'pointer' }}
                  onClick={toggle}
                />
              </div>
              <h1>
                {<Link to={`/profile/${owner.id}`}>{location}</Link>}
              </h1>
              <h2>
                {<Link style={{ color: 'black' }} to={`/profile/${owner.id}`}>{owner.username}</Link>}
              </h2>
            </Slug>
          </div>
        </Fade>
        <Fade
          show={!active}
          from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
          delay={active ? 0 : 400}>
          <div className="default">
            <div style={{ zIndex: 1 }}>
              {<Link style={{ color: 'white' }} to={`/profile/${owner.id}`}>{location}</Link>}
            </div>
          </div>
        </Fade>
      </div>
    )
  }
}

export default Cell