import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Special from './Special'
import Testimonials from './Testimonials'
import Services from './Services'

export const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <Special/>
      <Testimonials/>
      <Services/>
    </div>
  )
}

export default Home
