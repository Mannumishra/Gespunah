import React, { useEffect, useState } from 'react'
import './Home.css'
import banare2 from "../../Images/banare2.jpg"
import banare1 from "../../Images/banare1.jpeg"
import banare3 from "../../Images/banare3.jpeg"
import banare from "../../Images/banarefirst.jpeg"
import Shop from '../Shop/Shop'
import TraindingCollection from '../TraindingColection/TraindingCollection'
import SeasonCollection from '../Seasoncollection/SeasonCollection'
import Limtedtime from '../Limtedtime/Limtedtime'
import Highquality from '../Highquality/Highquality'
import Widerange from '../WideRange/Widerange'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState([])
  const getApiData = async () => {
    try {
      let res = await axios.get("https://api.gespunah.com/api/banare")
      console.log(res)
      setData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getApiData()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          {data.map((_, index) => (
            <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : ''} aria-label={`Slide ${index + 1}`}></button>
          ))}
        </div>
        <div className="carousel-inner">
          {data.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <img src={item.image} className="d-block w-100" alt="..." />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section style={{ marginTop: 50 }}>
        <Shop />
      </section>
      <section>
        <TraindingCollection />
      </section>
      <section>
        <Highquality />
      </section>
      <section>
        <SeasonCollection />
      </section>
      <section>
        <Widerange />
      </section>
      <section>
        <Limtedtime />
      </section>
      <section style={{ marginTop: 50 }}>
        <Shop />
      </section>
     
    </>
  )
}

export default Home