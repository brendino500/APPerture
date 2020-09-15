import React from 'react'
// import { render } from 'react-dom'
import { Parallax } from 'react-parallax'
import GitHubIcon from '@material-ui/icons/GitHub'
import { IconButton } from '@material-ui/core'

const image1 = 'https://images.unsplash.com/photo-1506574723610-7fe0f0c7f9ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'

const image2 = 'https://images.squarespace-cdn.com/content/v1/561628dfe4b09b3c0d81d97d/1515268984379-1DVXVMOP66KAIQW40964/ke17ZwdGBToddI8pDm48kBFVs2udq9uuGsb4EEKKWXR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UTThiVgEomory_tyVbCjf06-dfjgsh41iMMUJL4RFfJjIeF2EpoLyt6sn0O4yV-0Ew/Alan+Schaller+-+Street+Photographer+-+Dogs+18.jpg?format=1500w'

const image3 = 'https://images.unsplash.com/photo-1517909277968-946dd06adf1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'

const image4 = 'https://images.unsplash.com/photo-1588710252545-a41de3122de1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80'

const image5 = 'https://images.squarespace-cdn.com/content/v1/561628dfe4b09b3c0d81d97d/1515267011545-01TDFRKDM8K8S8YTDZ7D/ke17ZwdGBToddI8pDm48kBbreg9YnI_L5ISjRktGOpZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luj0xCD0oh5KMc0gpox0u-xNhAmwx7aJ2ZxvCgXdonxNI7J94h4GBbFkA2wniPuRA/Alan+Schaller+-+London+Street+Photographer+-+Metropolis6.jpg?format=2500w'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

const insideStyles = {
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '6px',
  padding: 30,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
}

const MyComponent = () => (

  <div style={styles}>
    <Parallax bgImage={image1} strength={500}>
      <div style={{ height: 600 }}>
        <div style={insideStyles}>Monochrome Photography</div>
      </div>
    </Parallax>
    <h1 style={{ color: 'white' }}>| | |</h1>
    <Parallax
      bgImage={image2}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: 'absolute',
              background: `rgba(255, 255, 255, ${percentage * 1})`,
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              width: percentage * 600,
              height: percentage * 600
            }}
          />
        </div>
      )}
    >
      <div style={{ height: 600 }}>
        {/* <div style={insideStyles}>renderProp</div> */}
      </div>
    </Parallax>
    <h1 style={{ color: 'white' }}>| | |</h1>
    <Parallax bgImage={image3} strength={500}>
      <div style={{ height: 600 }}>
        <div style={insideStyles}>It's all about our typos</div>
      </div>
    </Parallax>
    <h1 style={{ color: 'white' }}>| | |</h1>
    <Parallax
      bgImage={image4}
      strength={200}
      renderLayer={percentage => (
        <div>
          <div
            style={{
              position: 'absolute',
              background: `rgba(255, 255, 255, ${percentage * 1})`,
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
      <div style={{ height: 600 }}>
        {/* <div style={insideStyles}>renderProp</div> */}
      </div>
    </Parallax>
    <h1 style={{ color: 'white' }}>| | |</h1>
    <Parallax bgImage={image5} strength={500}>
      <div style={{ height: 600 }}>
        <div style={insideStyles}>
          By Brenda Ty & Julien Xemard
          <br />
          <IconButton aria-label="github link" href="https://github.com/brendino500/APPerture">
            <GitHubIcon />
          </IconButton>
        </div>
      </div>
    </Parallax>
  </div>
)

export default MyComponent