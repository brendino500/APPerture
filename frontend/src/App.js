import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notification from 'react-notify-toast'

import ParallaxGrid from './components/parallax/ParallaxGrid'
import Navbar from './components/common/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ErrorPage from './components/common/ErrorPage'

import Profile from './components/users/Profile'
// import ProfileEdit from './components/users/ProfileEdit'
// import ProfileForm from './components/users/ProfileForm'

import PhotoCard from './components/photos/PhotoCard'

import IntroParallax from './components/parallax/introPage/Intro'

const App = () => {
  
  return (
    <BrowserRouter>
      <main>
        <Notification />
        <Navbar />
        <Switch>
          <Route exact path="/" component={IntroParallax} />
          {/* <Route path="/photos/new" component={} /> */}
          <Route path="/photos/:id/" component={PhotoCard} />
          <Route path="/photos/" component={ParallaxGrid} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route path="/register/" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
