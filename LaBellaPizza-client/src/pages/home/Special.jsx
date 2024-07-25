import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from '../../components/Cards';

const Special = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("/menu.json")
            .then(res => res.json())
            .then(data => {
                const Specials = data.filter((item) => item.category === "popular")
                // console.log(Specials)
                setRecipes (Specials)
            });
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

  return (
    <div className='section-container my-20'>
        <div className='text-left'>
            <p className='subtitle'>Chef’s Specials</p>
            <h3 className='title'>House Specialties</h3>
        </div>

        <Slider {...settings}>
        {
            recipes.map((item,i)=> (
                <Cards key={i} item={item}/>
            ))
        }
      </Slider>
    </div>
  )
}

export default Special