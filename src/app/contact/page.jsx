import React from 'react'
import Header from '../components/Header'
import ContactComponent from '../components/contact/page'
import Footer from '../components/Footer'

export default function page() {
  return (
    <div className='mt-5'>
       <Header />
      <ContactComponent/>
      <Footer/>
    </div>
  )
}
