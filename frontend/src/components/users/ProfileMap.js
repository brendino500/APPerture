import React from 'react'
import MapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Popup, NavigationControl } from 'react-map-gl'
import { getAllPhotos } from '../../lib/api'
import data from './data'

class ProfileMap extends React.Component {
  state = {
    data,
    viewport: {
      latitude: 51,
      longitude: 5,
      zoom: 4,
      bearing: 0,
      pitch: 0
    }
  }

  async componentDidMount() {
    try {
      const res = await getAllPhotos()
      this.setState({ photos: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handlePopupShow = e => {
    if (e.currentTarget.className === 'text-popup') {
      e.currentTarget.className = 'card-popup'
    } else {
      e.currentTarget.className = 'text-popup'
    }
  }

  render() {
    // console.log(data)
    // photo was destructured
    const { viewport } = this.state
    return (
      <div className="profile-mapbox">
        <MapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPTOK}
          height={'100vh'}
          width={'100vh'}
          mapStyle='mapbox://styles/mapbox/dark-v10'
          onViewportChange={viewport => this.setState({ viewport })}
          zoom={viewport.zoom}
          scrollZoom={false}
        >
          {data.map(data => {
            return (
              <div key={`popup${data.credit}`}>
                <Popup
                  latitude={data.lat}
                  longitude={data.long}
                  closeButton={false}
                >
                  <div className="text-popup" onClick={this.handlePopupShow}>
                    <h1>{data.location}, <span role="img" aria-label="marker">📍</span></h1>
                    <div className="popup-image">
                      <img className="index-image" src={data.image} alt={data.location} />
                    </div>
                  </div>
                </Popup>
              </div>
            )
          })}
          <NavigationControl showZoom={true} showCompass={true} position="top-left" className="map-controls" />
        </MapGl>
      </div>
    )
  }
}

export default ProfileMap