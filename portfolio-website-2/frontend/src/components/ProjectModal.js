import { Box, Modal } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '90vh',
    bgcolor: 'background.paper',
    border:'none',
    outline:'none',
    boxShadow: 24,
    p: 2,
};



export default function ProjectModal({open, handleClose}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
                <img src="https://fastly.picsum.photos/id/99/300/200.jpg?blur=5&hmac=P7sdf1dmOK2W9p6lS2QHB1ln7_wpXDgzs6T5NpKGWtY" alt="" style={{ height: '100%', width: '60%' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <span style={{ borderBottom: '1px solid #00000026', fontWeight: 'bold', paddingBottom: '10px' }}>
                        Dummy HEading Dummy HEading Dummy HEading Dummy HEading fsh syh dh fghd dhdb wy hsry dh fgnd hd dhd hd gh gjgj jj fh jfj fh dhjf djghd f jsf
                    </span>
                    <span style={{ fontSize: 'small' }}> description description description description description description description description description description description description description description description</span>
                    <span style={{ fontSize: 'small', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                        <span style={{ borderRadius: '10px', background: '#e3e3e3', padding: '2px 10px' }}>tool</span>
                    </span>
                    <span style={{ fontSize: 'small', display: "flex", gap: '10px', alignItems: "center", justifyContent: 'center' }}><a href="a">View Website </a>  <span style={{ fontSize: 'x-small' }}>•</span>  <a href="a"> View Github</a></span>
                </div>
                <span style={{ textAlign: 'right', cursor: 'pointer' }} onClick={handleClose}><CloseIcon style={{ background: 'gold', borderRadius: '20px', fontWeight: 'bold', padding: '5px' }} /></span>
            </Box>
        </Modal>
    )
}
