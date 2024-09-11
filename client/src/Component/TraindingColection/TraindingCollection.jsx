import React, { useEffect, useState } from 'react'
import './Trainding.css'
import image1 from '../../Images/traindingimage1.webp'
import image2 from '../../Images/traindingimage2.webp'
import image3 from '../../Images/traindingimage3.webp'
import image4 from '../../Images/traindingimage4.webp'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TraindingCollection = () => {
    const [data, setData] = useState([])

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/bestseller")
            console.log(res)
            if (res.status === 200) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getApiData()
    }, [data.length])
    return (
        <>
            <section>
                <div className="traindingcollection">
                    <div className="traingindheading">
                        <p>trending collections</p>
                    </div>
                    <div className="traindingbox">
                        {data.map((item, index) => (
                            <Link to={`/shop`} key={index} className="traindingimage">
                                <img src={item.image} alt={item.traindingName} />
                                <div className="traingtext">
                                    <p>{item.traindingName}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TraindingCollection