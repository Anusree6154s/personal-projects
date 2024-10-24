import React, { useState } from 'react'
import ProjectModal from '../components/ProjectModal'

export default function ProjectsPage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <section id='projects-page' style={{ display: "flex", justifyContent: 'center' }}>
            <div style={{ width: '80%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '40px' }}>
                <div className='swiper-slide' onClick={handleOpen}>
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
                </div>
                <div className='swiper-slide'>
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
                </div>
                <div className='swiper-slide'>
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
                </div>
                <div className='swiper-slide'>
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
                </div>
                <div className='swiper-slide'>
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
                </div>
                <div className='swiper-slide'>
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
                </div>

            </div>

            <ProjectModal open={open} handleClose={handleClose} />

            <style>
                {`
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
