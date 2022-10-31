import { useEffect, useState } from "preact/hooks";

import {
  AiFillAccountBook,
  AiFillCloseCircle,
  AiOutlineCamera,
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineFileImage,
  AiOutlineScissor,
} from "react-icons/ai";
import "croppie/croppie.css";
import "./style.scss";

import Croppie from "croppie";

let CropArea = document.createElement("div");
var c;
let bg = new Image();

let DocW = 1000;
let DocH = 1000;
let Cropy = 117;
let Cropx = 150;
let CropH = 736;
let CropW = 736;

export function App(props) {
  let file = document.createElement("input");
  const [cropVis, setcropVis] = useState(false);
  const [BgLoadStatus, setBgLoadStatus] = useState(null);
  const [CroppedImg, setCroppedImg] = useState(null);
  const [CroppedImgStatus, setCroppedImgStatus] = useState(null);
  const [GeneratedData, setGeneratedData] = useState(null);
  const [PreviewAct, setPreviewAct] = useState(null);
  const [Name, setName] = useState(null);

  bg.src = "./frame.png";
  bg.onload = () => {
    setBgLoadStatus(1);
  };

  let CroppedImgTag = new Image();
  CroppedImgTag.src = CroppedImg;
  CroppedImgTag.onload = () => {
    setCroppedImgStatus(1);
  };

  let _canv = document.createElement("canvas");
  let _ctx = _canv.getContext("2d");
  _canv.width = DocW;
  _canv.height = DocH;

  useEffect(()=>{
    draw()
  },[CroppedImgStatus])

  function draw() {
    if (BgLoadStatus && CroppedImgStatus) {
      _ctx.drawImage(CroppedImgTag, Cropx, Cropy);
      _ctx.drawImage(bg, 0, 0, _canv.width,  _canv.height);
      //_ctx.font = "600 30px Roboto";
      //_ctx.fillStyle = "white";

      //let _name = Name.toLocaleUpperCase();

      //let txtW = _ctx.measureText(_name).width;
      //_ctx.shadowBlur = 5;
     // _ctx.shadowColor = "black";

     // _ctx.fillText(_name, Cropx + CropW / 2 - txtW / 2, Cropy + CropH + 160);
      setGeneratedData(_canv.toDataURL("image/jpeg"));
      //console.log(_data);
      // window.open(_data);
    } else {
      console.log(BgLoadStatus, CroppedImgStatus);
    }
  }

  file.type = "file";
  let Img;
  file.onchange = () => {
    let _file = file.files[0];
    let fileReader = new FileReader();

    fileReader.readAsDataURL(_file);
    fileReader.onload = () => {
      Img = fileReader.result;
      Crop();
    };
  };

  function Crop() {
    // console.log(Img);
    //crop.current.append(Img);
    setcropVis(true);
    c = new Croppie(CropArea, {
      url: Img,

      enableOrientation:true,
      
      
      viewport: {
        height: CropH,
        width: CropW,
        type:"circle"
      },
    });
  }

  function Preview() {
    return (
      <>
        {PreviewAct && (
          <div
            onClick={() => {
              setPreviewAct(false);
            }}
            className="preview"
          >
            <img src={GeneratedData} alt="" srcset="" />
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div
        style={{ backgroundImage: `url(${ GeneratedData?GeneratedData:bg.src })` }}
        className="Header"
      ></div>
      <div className="Cont">
        <h1></h1>

        <div className="Actions">
          
       { GeneratedData ?<div>
            <a href={GeneratedData} download="campaign poster">
              <button>
                <AiOutlineDownload size="30" />
                <span>
          Download Profile
          </span>
              </button>
            </a>
            
         
          </div>:
          <button
          onClick={() => {
            file.click();
          }}
        >
          <AiOutlineCamera size="30" />
        
          <span>
          Upload photo
          </span>
         
        </button>
          }
          
          
          
        </div>

        {/* {GeneratedData && (
          <div className="GetAct">
            <a href={GeneratedData} download="campaign poster">
              <button>
                <AiOutlineDownload size="40" />
              </button>
            </a>
         
         
          </div>)
        } */}
      </div>

      <div
        ref={(e) => {
          if (e) {
            e.innerHTML = "";
            // e.append(_canv);
          }
        }}
      ></div>
      <img src="fzone.jpg" className="spBanner" alt="" />
      <Preview></Preview>
      <Cropper
        setCroppedImg={setCroppedImg}
        visible={cropVis}
        set={setcropVis}
      />
    </>
  );
}


function Cropper({ visible, set, setCroppedImg }) {
  return (
    <div className={visible ? "vi" : "hi"}>
      <div
        ref={(e) => {
          if (e) {
            e.innerHTML = "";
            e.append(CropArea);
          }
        }}
        className="Crop"
      ></div>
      <div className="Tools">
        <button
          onClick={() => {
            c.destroy();
            set(false);
          }}
        >
          <AiOutlineClose size="30" />
        </button>
        <button
          onClick={() => {
            //CroppedImg =

            c.result().then((e) => {
              setCroppedImg(e);
              c.destroy();
              set(false);
            });
          }}
        >
          <AiOutlineScissor size="30" />
        </button>
      </div>
    </div>
  );
}
