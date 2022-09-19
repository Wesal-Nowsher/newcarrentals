
import React,{useEffect,useState} from "react" 
import {modelcarousel} from "../utils";;

import Modal from 'react-modal';

import { Carousel } from 'react-responsive-carousel';
// import { ToastContainer, toast } from 'react-toastify';
// import CursorZoom from 'react-cursor-zoom';
// import axios from "axios";
// import {api} from "../utils"
export default function Modalbooking(props){
     
    return(
        <Modal
        isOpen={props.modalBigImages}
       
        onRequestClose={()=> {props.setModelBigImage(false);props.setItemBigImages({})}}
        style={modelcarousel}
        contentLabel="Example Modal"
        
      >
            <div className="modalcarousel"> 
           <Carousel
            
          showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
               {              
                           props?.itemBigImages?.urls?.map((ite,indx)=>{
                         return(
                             <div key={indx}  >
                                
                                    {/* <CursorZoom
                                            image={{
                                                src: ite,
                                                width: 400,
                                                height: 300
                                            }}
                                            zoomImage={{
                                                src: ite,
                                                width: 1600,
                                                height: 1200
                                            }}
                                            cursorOffset={{ x: -80, y: -80 }}
                                        /> */}
                             <img className="d-block w-100" src={ite} 
                              alt="First slide" />  
                       </div>
                     )
                     })
               }
           </Carousel>
           </div>
      </Modal>
    )
}










