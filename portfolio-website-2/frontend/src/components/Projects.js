import { useContext, useEffect, useRef, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import ProjectModal from './ProjectModal';
import { ProjectsContext } from '../contexts/ProjectContext';




export default function Projects() {
    const { projects, setProjects } = useContext(ProjectsContext)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <section id='projects' style={{ height: 'fit-content', display: 'flex', justifyContent: 'center', paddingTop: '8%' }}>
            <div style={{ width: '80%' }
            } >
                <h1 style={{ marginBottom: '3%', marginTop: '0px', color: 'var(--light-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
                    Projects
                </h1>

                <p style={{ textAlign: 'right', fontSize: 'small', marginBottom: '20px', fontWeight: 'bold', color: '#ffbf00' }} className='view-projects-button'>
                    <a href="/projects">View All Projects</a>
                </p>

                <div style={{ height: '60vh', width: '100%', display: 'flex', justifyContent: 'center' }}>

                    <Swiper
                        navigation={true}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        slidesPerView={3}
                        modules={[Navigation, Pagination]} className="mySwiper"
                        style={{ background: 'white', height: '100%', paddingBottom: '60px' }}
                    >
                        {projects.length !== 0 &&
                            projects.map((project, index)=>
                                <SwiperSlide className='swiper-slide' onClick={handleOpen}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <img src="https://fastly.picsum.photos/id/99/300/200.jpg?blur=5&hmac=P7sdf1dmOK2W9p6lS2QHB1ln7_wpXDgzs6T5NpKGWtY" alt="dummy img" style={{ width: "100%", height: '60%' }} />


                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%' }}>
                                            <span style={{ textAlign: 'center' }}>Dummy Heading Dummy Heading Dummy Heading</span>
                                            <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                                <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                                <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                                <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                                <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )}


                        <SwiperSlide>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src="https://fastly.picsum.photos/id/99/300/200.jpg?blur=5&hmac=P7sdf1dmOK2W9p6lS2QHB1ln7_wpXDgzs6T5NpKGWtY" alt="dummy img" style={{ width: "100%", height: '60%' }} />


                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%' }}>
                                    <span style={{ textAlign: 'center' }}>Dummy </span>
                                    <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src="https://fastly.picsum.photos/id/99/300/200.jpg?blur=5&hmac=P7sdf1dmOK2W9p6lS2QHB1ln7_wpXDgzs6T5NpKGWtY" alt="dummy img" style={{ width: "100%", height: '60%' }} />


                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%' }}>
                                    <span style={{ textAlign: 'center' }}>Dummy Heading Dummy </span>
                                    <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', boxShadow: '0x 2px 2px 2px #f8f9fa', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src="https://fastly.picsum.photos/id/99/300/200.jpg?blur=5&hmac=P7sdf1dmOK2W9p6lS2QHB1ln7_wpXDgzs6T5NpKGWtY" alt="dummy img" style={{ width: "100%", height: '60%' }} />


                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', width: '80%', justifyContent: 'space-around', height: '100%' }}>
                                    <span style={{ textAlign: 'center' }}>Dummy Heading Dummy Heading Dummy Heading</span>
                                    <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>

            <ProjectModal open={open} handleClose={handleClose} />

            <style>
                {`
          .swiper-button-next,
          .swiper-button-prev {
            color: black;
            font-weight:bold;
            background:gold;
            border-radius:20px;
            font-size: 20px; 
            width: 30px; 
            height: 30px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 15px; 
          }

          .swiper-pagination-bullet-active {
            background-color: goldenrod; 
          }

          .swiper-slide:hover{
          background:#f5f5f5;
          opacity:0.8;
          cursor:pointer;
          }

       
        `}
            </style>

        </section>
    )
}
