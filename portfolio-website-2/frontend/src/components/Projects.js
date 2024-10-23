import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { fetchProjects } from '../utils/Projects.utils';

export default function Projects() {
    const [projects, setProjects] = useState([])


    // useEffect(() => {
    //     fetchProjects(setProjects);
    // }, [])


    return (
        <section id='projects' style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }
            } >
                <h1 style={{ marginBottom: '5%', marginTop: '0px', color: 'var(--light-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
                    Projects
                </h1>

                <div style={{ border: 'red solid 2px', height: 'fit-content', width: '100%' }}>
                    <Swiper navigation={true} spaceBetween={30} pagination={{
                        clickable: true,
                    }} slidesPerView={3} modules={[Navigation, Pagination]} className="mySwiper">
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>
            </div>



        </section>
    )
}
