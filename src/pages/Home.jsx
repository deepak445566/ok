import React from 'react'


import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import OurStory from '../components/OurStory'
import Reviews from '../components/Reviews'
import FloatingButtons from '../components/FloatingButtons'
import HeroSection from './HeroSection'
import FeaturedCollection from './FeaturedCollection'
import WhyChooseUs from './WhyChooseUs'

export default function() {
  return (
   <>
   <div className='mt-10'>
    <HeroSection />
    <FeaturedCollection />
    <WhyChooseUs />
   </div>
   </>
  )
}
