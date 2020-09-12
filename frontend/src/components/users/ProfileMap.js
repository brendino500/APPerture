import React from 'react'
import MapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Popup, NavigationControl } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { getAllPhotos } from '../../lib/api'

class ProfileMap extends React.Component {
  state = {
    photos: [],
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
    const { photos, viewport } = this.state
    return (
      <div className="profile-mapbox">
        <MapGl
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPTOK}
          height={'100vh'}
          width={'100vh'}
          mapStyle="mapbox://styles/heybt/ckezmztnz13f51an83rynvol6"
          onViewportChange={viewport => this.setState({ viewport })}
          zoom={viewport.zoom}
          scrollZoom={false}
        >
          <NavigationControl showZoom={true} showCompass={true} position="top-left" className="map-controls" />
        </MapGl>
      </div>
    )
  }
}

export default ProfileMap