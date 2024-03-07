import React from 'react';
import Banner from "../../components/Banner";
import Features from '../../components/Features';
import ChatLogo from "../../assets/images/icon-chat.webp";
import MoneyLogo from "../../assets/images/icon-money.webp";
import SecurityLogo from "../../assets/images/icon-security.webp";
import './index.css'

function Home() {
  return (
    <main className='home'>
      <Banner />
      <section className='features'>
        <Features
          src={ChatLogo}
          alt="Chat Icon"
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Features
          src={MoneyLogo}
          alt="Money Icon"
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be!"
        />
        <Features
          src={SecurityLogo}
          alt="Security Icon"
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  )
}

export default Home