
import React,{useEffect,useState,useRef} from "react" 
import {customStyles1} from "../../utils";;

import Modal from 'react-modal';
// import ReactRichEditor from 'react-rich-text-editor'

// import { RichTextEditor } from '@mantine/rte';

import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {api} from "../../utils"
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const config={
  toolbar:  [
    'heading',
    '|',
    'bold',
    'italic',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'alignment',
    'insertTable',
    '|', 
    'undo',
    'redo', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify'
  ],
  alignment: {
    options: [
      [ 'left', 'right' ]
    ]
},
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells','insertCodeBlock', ]
  },
  language: 'en'
};
const configar={
  toolbar:  [
    'heading',
    '|',
    'bold',
    'italic',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'alignment',
    'insertTable',
    '|', 
    'undo',
    'redo', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify'
  ],
  alignment: {
    options: [
      [ 'left', 'right' ]
    ]
},
  table: {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells','insertCodeBlock', ]
  },
  language: 'ar'
};

export default function Modalblogs(props){ 
    let editorRef = useRef();
         const { CKEditor, ClassicEditor } = editorRef.current || {};
         let [loaded, setLoaded] = useState(false);
         const [editor, setEditor] = useState(null);
        const [images, setImages]= useState([]);  
        const [value, onChange] = useState("");
        const [blog, setBlog]=useState({
            id: "",
            header: "",
            headerArabic: "",
            headerGerman: "",
            headerRussian: "",
            headerIndian: "",
            content: "",
            contentArabic: "",
            contentGerman: "",
            contentRussian: "",
            contentIndian: "",
            urls: []
          })  
           
        useEffect(()=>{
            editorRef.current = {
                CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
                ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
              };
          
              setLoaded(true);
             
        },[]);
        useEffect(()=>{
           
            props.editId && getblogs(props.editId)
        },[props.editId]);

        const getblogs=(id)=>{
          setLoaded(false);
            axios.get(`${api}Blogs/GetById/${id}`).then((res)=>{
                
              res.data && setBlog({...res.data});
              res.data && res.data.urls && setImages([...res.data.urls])
              setLoaded(true);
            })  
          }
        
        const Changing=(e)=>{
          setBlog({...blog, [e.target.name]:e.target.value})
        }
        const removeimage=(index)=>{
          let newimages=[];
          images&& images.map((item,inde)=>{
            if(inde!==index){
              newimages.push(item);
            }
          })
          setImages([...newimages])
        } 
        const Uploadfile=(file)=>{
       
          let files=[...file.files];
          
          let formData = new FormData();
          for (const image of files) {
            formData.append("files", image);
          }
         
          // let datasend={"files":files}; 
          axios.post(`${api}Resource/uploadImage`,formData).then((res)=>{ 
                let lastimages=[...images]; 
                let newimages= res.data && [...res.data]; 
                lastimages=[...lastimages, ...newimages]; 
                setImages([...lastimages]); 
          }).catch((err)=>{
           
          })  
        }
        const Editblog=(e)=>{
          e.preventDefault();
          if(blog.header==="" && blog.headerArabic===""  ){
            toast("Name of the header Either Arabic or English is required!")
            return
          } 
          if(images.length===0 ){
              toast("Please Add one image at minimum!")
              return
            }
            if(blog.content==="" && blog.contentArabic===""){
              toast("Description in Either Arabic or English is requried!")
              return
            }
          blog.id=props.editId;
          blog.urls=[...images];
          

          axios.put(`${api}Blogs/Update`,blog).then((res)=>{
            empty();  
            props.seteditIsOpen(false)
           
      }).catch((err)=>{
       
      }) 
        }
        
        const empty=()=>{
          setBlog({
            id: "",
            header: "",
            headerArabic: "",
            headerGerman: "",
            headerRussian: "",
            headerIndian: "",
            content: "",
            contentArabic: "",
            contentGerman: "",
            contentRussian: "",
            contentIndian: "",
            urls: []
          }) 
        }

    return(
        <Modal
        isOpen={props.editIsOpen}
       
        onRequestClose={()=> {empty();   props.seteditIsOpen(false);}}
        style={customStyles1}
        contentLabel="Example Modal"  >    
            <div className="row">  
             
             <div className="col-lg-12 col-md-12 mb-4 modal-booking" > 
             <h1 className="ml-5">Edit Blog</h1>  
            <form action="#"   className="trip-form  "> 
              <div className="form-group row">
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="header"
                  onChange={(e)=> Changing(e)}
                  defaultValue={blog.header && blog.header}
                  placeholder="Enter you header For English" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" style={{direction:"rtl"}} name="headerArabic"
                  onChange={(e)=> Changing(e)}
                  defaultValue={blog.headerArabic && blog.headerArabic}
                  placeholder="Enter you car complete name" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerGerman"
                  // onChange={(e)=> Changing(e)}
                  defaultValue={ blog.headerGerman &&blog.headerGerman}
                  placeholder="Enter you car complete name" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerRussian"
                  // onChange={(e)=> Changing(e)}
                  defaultValue={blog.headerRussian && blog.headerRussian}
                  placeholder="Enter you car complete name" />
                </div> 
                <div className="col-md-3 mt-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerIndian"
                  // onChange={(e)=> Changing(e)}
                  defaultValue={blog.headerRussian && blog.headerRussian}
                  placeholder="Enter you car complete name" />
                </div> 
              </div>
              <div className="row  mb-4 "> 
              
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                   <input type="file" className=""  onChange={(e)=> Uploadfile(e.target) }  multiple/>
                    
                  </div>
                </div>
                
              </div>
           
              <div className="row">
               
               
               <div className="col-md-6   mt-4    mb-4 mb-lg-0">
                   
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        
                        data={blog.content && blog.content}
                         
                        config={ 
                            config
                         }
                        
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                       
                          
                        }}
                        
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor?.getData();
                        
                          console.log("wesal English")
                            setBlog({...blog, content:data})
                          
                        }}
                        
                        onBlur={(event, editor) => {
                        
                        }}
                        onFocus={(event, editor) => {
                        
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
              
                <div className="col-md-6 mb-4 mt-4  mb-lg-0">
                 
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data={blog.contentArabic && blog.contentArabic}
                        config={ 
                          configar
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        
                        }}  
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor?.getData();
                        
                        //   setBlog({...blog, contentArabic:data})
                            console.log("wesal arabic")
                            setBlog({...blog, contentArabic:data})
                          
                        }}
                        onBlur={(event, editor) => {
                       
                        }}
                        onFocus={(event, editor) => {
                         
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
               
                <div className="col-md-6 mb-4 mb-4 mt-4  mb-lg-0">
                  
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data={blog.contentGerman && blog.contentGerman}
                        config={ 
                            config
                         }
                         
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor?.getData();
                      
                        //   setBlog({...blog, contentGerman:data})
                            console.log("wesal German")
                            // setBlog({...blog, contentGerman:data})
                          
                          
                        }}
                        
                        onBlur={(event, editor) => {
                        
                        }}
                        onFocus={(event, editor) => {
                        
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
              
                <div className="col-md-6 mb-4  mt-4  mb-lg-0">
                  
                      
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data={blog.contentRussian && blog.contentRussian}
                        config={  config}
                         
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                         
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor?.getData();
                        
                        //   setBlog({...blog, contentRussian:data})
                        console.log("wesal Russian")
                            // setBlog({...blog, contentRussian:data})
                        
                        }}
                        onBlur={(event, editor) => {
                         
                        }}
                        onFocus={(event, editor) => {
                         
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
               
                <div className="col-md-6 mt-4 mb-lg-0">
                   
                    {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data={blog.contentIndian && blog.contentIndian}
                        config={ 
                            config
                         }
                        
                        onReady={(editor) => {
                          console.log("wesal Indian")
                          // You can store the "editor" and use when it is needed. 
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor?.getData();
                          
                        // setBlog({...blog, contentIndian:data})
                       
                            // setBlog({...blog, contentIndian:data}) 
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                    
                </div>    
               
               
               </div>
               <div className="col-md-3 mt-5 mr-auto">
                  <button type=""
                  onClick={(e)=> Editblog(e)}
                  className="btn btn-block btn-primary text-white py-3  "   >
                     Edit
                  </button>
                </div>
            </form>
          </div>
          <div className="col-lg-4 col-md-4 mb-4 ">
          <div className="images-category-form position-relative">
                {
                  images && images.map((item,index)=>{
                    return (
                      <div key={index} className="position-relative">
                      
                      <img  src={item} alt="" />
                      <span className="service-1-icon ml-2" onClick={()=> removeimage(index)} ><span className="icon-trash"></span></span>
                      </div>
                    )
                  })
                }
              </div>
          </div>
            </div>
      </Modal>
    )
}