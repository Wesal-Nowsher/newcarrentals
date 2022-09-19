export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "14px"
    },
  };
  export const customStyles78 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "14px",
      width:"75%"
    },
  };

  export const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "14px",
      width:"90%",
      height: "800px",
      overFlow:"scroll"
    },
  };
  export const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "14px",
      width:"40%"
    },
  };
  export const modelcarousel = {
    content: {
      top: '50%',
      left: '50%',
      overflow:'hidden',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: "14px",
      width:"70vh",
      height:"50vh",
      padding:"0px",
      border:'0px solid transparent'
    },
  };
  export const api ="https://rental-car-api.cybaseuat.com/api/";

  export const  serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}