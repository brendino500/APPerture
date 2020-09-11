import React from 'react'
// import { render } from 'react-dom'
import { Parallax } from 'react-parallax'

const image1 = 'https://images.unsplash.com/photo-1504293538349-0be9a181d474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const image2 = 'https://images.unsplash.com/photo-1504293538349-0be9a181d474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const image3 = 'https://images.unsplash.com/photo-1517909277968-946dd06adf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const image4 = 'https://images.unsplash.com/photo-1517909277968-946dd06adf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

const insideStyles = {
  background: 'white',
  padding: 30,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
}

const MyComponent = () => (
  <div style={styles}>
    <Parallax bgImage={image1} strength={500}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>HTML inside the parallax</div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax bgImage={image2} strength={500}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>HTML inside the parallax</div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax bgImage={image3} strength={500}>
      <div style={{ height: 500 }}>
        <div style={insideStyles}>HTML inside the parallax</div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax
      bgImage={image4}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: 'absolute',
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}>renderProp</div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax
      bgImage={image4}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: 'absolute',
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}>renderProp</div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax
      bgImage={image4}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: 'absolute',
              background: `rgba(255, 125, 0, ${percentage * 1})`,
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              width: percentage * 500,
              height: percentage * 500
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 500 }}>
        <div style={insideStyles}>renderProp</div>
      </div>
    </Parallax>
  </div>
)

export default MyComponent