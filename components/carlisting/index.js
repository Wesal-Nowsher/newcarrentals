            



            
import React,{useEffect,useState} from "react" 

import CursorZoom from 'react-cursor-zoom';

import ReactImageZoom from 'react-image-zoom';
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Modalbooking from "./modalbooking"
import ModalBigImage from "./big-images"
import axios from "axios";
import {api} from "../utils"
import { ToastContainer, toast } from 'react-toastify';

import { useRouter } from 'next/router'
export default function Carlistings(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalBigImages, setModelBigImage] = useState(false);
    const [itemBigImages, setItemBigImages] = useState({});

    const [itembooking, setItembooking] = useState(false);
    const [indexbooking, setIndexbooking] = useState(false);
    const [carvalues, setCar]=useState([]);
    const [bookId, setBookId]=useState("");
    const [allcategories, setAllcat]=useState([]);
    const router = useRouter();
    const [searchvalues, setSearch]=useState({
      keyword:"",
      type:"",
      
    });

     
    useEffect(()=>{
      getallcategories(); 
      
       if(router.query && router.query.type){
        let {type}=router.query;
       
        setSearch({...searchvalues,type:type})
        getfilterallcars("",type);
       }
       else{
        getallcars();
       } 
    },[router.query])
    
    const getallcars=()=>{
      axios.get(`${api}Cars/GetAll`).then((res)=>{
    
        res.data && setCar([...res.data])
      })   
    }
    const getfilterallcars=(keyword, id)=>{
    
      if(keyword!==undefined && id!==undefined){
        if(keyword!=="" && id!==""){
          axios.get(`${api}Cars/GetAll?CategoryId=${id}&SearchQuery=${keyword}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
        else if(keyword==="" && id!==""){
          axios.get(`${api}Cars/GetAll?CategoryId=${id}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
        else if(id==="" && keyword!==""){
          axios.get(`${api}Cars/GetAll?SearchQuery=${keyword}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
      } 
      
    }
    const getallcategories=()=>{
      axios.get(`${api}CarCategory/GetAll`).then((res)=>{
      
        res.data && setAllcat([...res.data])
      })  
    }
     
   
    
    const filter=(e)=>{
      e.preventDefault();;
      getfilterallcars(searchvalues.keyword, searchvalues.type);
    }

  return (  
    <>
     
          { router && router.pathname!=="/"  &&
          <div className="row mb-5">
            <div className="col-lg-12">
            <form className="trip-form">
               <div className="row align-items-center">
              <div className="mb-3 mb-md-0 col-md-4">
                <div className="form-control-wrap"> 
                    <input type="text" id="cf-4" 
                     onChange={(e)=> setSearch({...searchvalues,keyword:e.target.value})}
                     defaultValue={searchvalues.keyword}
                    placeholder={ props?.fillerdata?.formplace?.Searchwithkeword} className="form-control  px-3" />   
                </div>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
              <select   id=""  className="form-control" name="carCategoryId"
                value={searchvalues.type}
                  onChange={(e)=> setSearch({...searchvalues,type:e.target.value})}>
                    <option value="">{props?.fillerdata?.formplace?.Cartype}</option>
                      {
                        allcategories && allcategories.map((item,inasd)=>{
                         return( <option key={inasd} value={item.id}>
                          {props?.lang==="en" && item?.name}
                    {props?.lang==="ar" && item?.nameArabic}
                          </option>)
                        })
                      }
  
                    </select>
              </div>
              
              <div className="mb-3 mb-md-0 col-md-3">
                
                <button onClick={(e)=> filter(e)}  className="btn btn-primary btn-block py-3" >
                {props.fillerdata && props.fillerdata.herosearch && props.fillerdata.herosearch.searchbtn}
                </button>
              </div>
            </div> 
          </form> 
            </div>
            </div>
          }
       

    <div className="row bg-light">
             {
              router && router.pathname!=="/" &&
              <>
              {
                carvalues && carvalues.map((item,index)=>{
                 return (
                   <div key={index} className={`col-md-6 col-lg-4 mb-4  ${ item.offer===1 ? "add-radius":"" }`}> 
                       <div className="listing d-block position-relative  align-items-stretch">
                         <div className="listing-img  position-relative"
                       
                         >
                {
                 item.discountStatusId===1 && 
                  <p className="discount "   >{item.discountPercentage}%
                 </p>
                }
               <Carousel
                  onClickItem={()=> {setItemBigImages(item);setModelBigImage(true)}}
               showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
                    {              
                              item.urls && item.urls.map((ite,indx)=>{
                              return(
                                  <div key={indx}  >

                                  <img className="d-block w-100" src={ite} 
                                   alt="First slide" /> 
                            </div>
                          )
                          })
                    }
                </Carousel>
                <div className="day-on-you">
                {
                  item.offer===1 &&
                  <>
                 {props?.lang==="en" &&
                    <span className="offer-text splashing">
                    {  item?.offerText?.substring(0,25)}
                    
                    </span>
                 }
                  {props?.lang==="ar" &&
                    <span style={{direction:"rtl"}} className="offer-text splashing">
                    
                    {     item?.offerTextArabic?.substring(0,25)}
                    </span>
                  }
                 
                  </>
                  

                 }
                </div>
                   
               </div>
               <div className="listing-contents  ">
               {props?.lang==="ar" &&
                   <h3 className=" position-relative"> 
                  
                  
                     {props?.lang==="ar" && item?.carNameArabic?.substring(0,25)}
                   
                   
                   </h3>
               }
                {props?.lang==="en" && 
                   <h3 className=" position-relative" style={{direction:"rtl"}}> 
                  
                   { item?.carName?.substring(0,25)}
                    
                   
                   
                   </h3>
               }
                 {
                   item.priceDailyStatus===1 &&
                   <div className="rent-price">
                  
                    <del><strong>AED{item.dailyPriceBefore}</strong><span className="mx-1">/</span>{props?.fillerdata?.formplace?.Daily}</del>
                    &nbsp; <span>  <strong>AED{item.dailyPriceAfter}</strong><span className="mx-1">/</span>{props?.fillerdata?.formplace?.Daily} 
                    </span>
                 </div>
                 }
                 
                 {
                  item.priceMonthlyStatus===1 &&
                   <div className="rent-price">
                  
                    <del><strong>AED {item.monthlyPriceBefore}</strong><span className="mx-1">/</span> {props?.fillerdata?.formplace?.Monthly}</del>
                    &nbsp; <span>  <strong>AED{item.monthlyPriceAfter}</strong><span className="mx-1">/</span> {props?.fillerdata?.formplace?.Monthly}
                    </span>
                 </div>
                 }
                 {
                   item.priceYearlyStatus===1&&
                   <div className="rent-price">
                  
                    <del><strong>AED {item.yearlyPriceBefore}</strong> <span className="mx-1">/</span> {props?.fillerdata?.formplace?.yearly}</del>
                    &nbsp;  <span> <strong>AED{item.yearlyPriceAfter}</strong><span className="mx-1">/</span>
                    {props?.fillerdata?.formplace?.yearly}
                    </span>
                 </div>
                 }
                 
                 <div className="car-decsasdf">
                 { props?.lang==="en" && <p>{item?.description}</p> }
                 { props?.lang==="ar" && <p style={{direction:"rtl"}}>{item?.descriptionArabic}</p>   } 
                 <div className="booking-whatsapp">
                      <a   className="btn btn-primary btn-sm make-red-important" 
                        
                      onClick={()=> {setBookId(item.carId);setIsOpen(true)}}>
                        {props?.fillerdata?.BookNow}
                      </a> 
                     <h6 className=" ml-3 mr-3">{props?.fillerdata?.OR}</h6>
                     <span  className=" whatsapper mr-3">
                         <Link  href={"https://wa.me/+971507060661?text=Hello%21+I+need+to+rent+a+car%21+Can+you+help+with+me+that%3F"} className="nav-link " target="_blank">
                             <a ><i className="icon-whatsapp"></i></a>
                         </Link>
                     </span>
                     <span  className=" whatsapper  mr-3">
                         <Link  href={"tel:+971507060661"} className="nav-link " target="_blank">
                             <a ><i className="icon-phone"></i></a>
                         </Link>
                     </span>
                     </div>
                 </div>
               </div> 
             </div>
                   </div>
                 )
                })
              }
             </>
             }
             {
              router && router.pathname==="/" && (carvalues?.filter(e => e.discountStatusId === 1).length > 0 ||
              carvalues?.filter(e => e.offer === 1).length > 0
              ) &&
              <><div className=" ">
              <div className="">
                <div className="col-lg-12">
                  <h2 className="section-heading mt-5"><strong>{ props?.fillerdata?.offer?.name}</strong></h2>
                     
                </div>
              { 
                carvalues && carvalues.map((item,index)=>{
                
                return (
                 <>
                 {(item.discountStatusId===1 || item.offer===1)   
                  && 
                  <div key={index} className={`col-md-6 col-lg-4 mb-4  ${ item.offer===1 ? "add-radius":"" }`}> 
                  <div className="listing d-block position-relative  align-items-stretch">
                    <div className="listing-img  position-relative"
                   
                    >
           {
            item.discountStatusId===1 && 
             <p className="discount "   >{item.discountPercentage}%
            </p>
           }
          <Carousel
            onClickItem={()=> {setItemBigImages(item);setModelBigImage(true)}}
          showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
               {              
                         item.urls && item.urls.map((ite,indx)=>{
                         return(
                             <div key={indx}  >
                            {/* <ReactImageZoom 
                                
                                img={ite}
                                width={"100%"}
                                height={"100%"}
                                zoomWidth={500}
                                
                                /> */}
                             <img className="d-block w-100" src={ite} 
                              alt="First slide" />   
                       </div>
                     )
                     })
               }
           </Carousel>
           <div className="day-on-you">
           {
             item.offer===1 &&
             <>
            {props?.lang==="en" &&
               <span className="offer-text splashing">
               {  item?.offerText?.substring(0,25)}
               
               </span>
            }
             {props?.lang==="ar" &&
               <span style={{direction:"rtl"}} className="offer-text splashing">
               
               {     item?.offerTextArabic?.substring(0,25)}
               </span>
             }
            
             </>
             

            }
           </div>
              
          </div>
          <div className="listing-contents  ">
          {props?.lang==="ar" &&
              <h3 className=" position-relative"> 
             
             
                {props?.lang==="ar" && item?.carNameArabic?.substring(0,25)}
              
              
              </h3>
          }
           {props?.lang==="en" && 
              <h3 className=" position-relative" style={{direction:"rtl"}}> 
             
              { item?.carName?.substring(0,25)}
               
              
              
              </h3>
          }
            {
              item.priceDailyStatus===1 &&
              <div className="rent-price">
             
               <del><strong>AED{item.dailyPriceBefore}</strong><span className="mx-1">/</span>{props?.fillerdata?.formplace?.Daily}</del>
               &nbsp; <span>  <strong>AED{item.dailyPriceAfter}</strong><span className="mx-1">/</span>{props?.fillerdata?.formplace?.Daily} 
               </span>
            </div>
            }
            
            {
             item.priceMonthlyStatus===1 &&
              <div className="rent-price">
             
               <del><strong>AED {item.monthlyPriceBefore}</strong><span className="mx-1">/</span> {props?.fillerdata?.formplace?.Monthly}</del>
               &nbsp; <span>  <strong>AED{item.monthlyPriceAfter}</strong><span className="mx-1">/</span> {props?.fillerdata?.formplace?.Monthly}
               </span>
            </div>
            }
            {
              item.priceYearlyStatus===1&&
              <div className="rent-price">
             
               <del><strong>AED {item.yearlyPriceBefore}</strong> <span className="mx-1">/</span> {props?.fillerdata?.formplace?.yearly}</del>
               &nbsp;  <span> <strong>AED{item.yearlyPriceAfter}</strong><span className="mx-1">/</span>
               {props?.fillerdata?.formplace?.yearly}
               </span>
            </div>
            }
            
            <div className="car-decsasdf">
            { props?.lang==="en" && <p>{item?.description}</p> }
            { props?.lang==="ar" && <p style={{direction:"rtl"}}>{item?.descriptionArabic}</p>   } 
            <div className="booking-whatsapp">
                 <a   className="btn btn-primary btn-sm make-red-important"  
                 onClick={()=> {setBookId(item.carId);setIsOpen(true)}}>
                   {props?.fillerdata?.BookNow}
                 </a> 
                <h6 className=" ml-3 mr-3">{props?.fillerdata?.OR}</h6>
                <span  className=" whatsapper mr-3">
                    <Link  href={"https://wa.me/+971507060661?text=Hello%21+I+need+to+rent+a+car%21+Can+you+help+with+me+that%3F"} className="nav-link " target="_blank">
                        <a ><i className="icon-whatsapp"></i></a>
                    </Link>
                </span>
                <span  className=" whatsapper  mr-3">
                    <Link  href={"tel:+971507060661"} className="nav-link " target="_blank">
                        <a ><i className="icon-phone"></i></a>
                    </Link>
                </span>
                </div>
            </div>
          </div> 
        </div>
      </div>
        }
        </>
      ) 
      })
    }
   
    <div className="col-12">
    <Link href="/cars">
        <button   className=" col-6 col-md-4 col-lg-3 col-sm-6 btn btn-block btn-primary text-white py-3 px-5"   >
                {props?.fillerdata?.ViewMore}
                </button>
        </Link>
    </div>
    </div>
    </div> 
  </>
             }
              
              <Modalbooking modalIsOpen={modalIsOpen} bookId={bookId} setIsOpen={setIsOpen} />
              <ModalBigImage modalBigImages={modalBigImages}  setModelBigImage={setModelBigImage}  
              setItemBigImages={setItemBigImages} itemBigImages={itemBigImages}
              />
              <ToastContainer />
     </div>  
</>
  )
}

