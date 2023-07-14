import React, { useState } from "react";
import HeaderMobile from "../../components/header";
import HondaNon from "../../assets/images/honda-non.png";
import giftVoucher from '../../assets/images/gift-voucher.png'
import { Card, Button, Space, Collapse, theme, Modal } from "antd";
import { faChevronLeft, faHeart, faGift, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const ToRedeem = () => {
    document.body.style.backgroundColor = "white";
    const [like, setLike] = useState(false);

    const { Panel } = Collapse;

    const toggleLike = () => {
      if (like){
        setLike(false);
      } else {
        setLike(true);
      }
    }

    const panelStyle = {
      marginBottom: 16,
      background: "#F8F8F8",
      borderRadius: "8px",
      border: 'none',
    };

    const [acceptRedemption, setAcceptRedemption] = useState(false);

    const showModalRedemption = () => {
      setAcceptRedemption(true);
    }

    const closeModalRedemption = () => {
      setAcceptRedemption(false);
    }

    const [accepted, setAccepted] = useState(false);

    const acceptedRedemption = () => {
      window.location.replace("/select-location");
    }

    const clickReadMore = (event) => {
      let readMoreBtn = document.getElementById("read-more-btn");
      let readMoreText = document.getElementById("read-more");

      readMoreBtn.style.display = "none";
      readMoreText.style.display = "block";

      event.preventDefault();
    }
  return (
    <div>
        <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px" style={{margin:"auto"}}/>)} secondBtn={false} />
        <main>
          <img src={giftVoucher} />
          <div className="brand-info p-6">
            <div className="grid grid-cols-2 flex items-center justify-between">
              <div className="block">
                <h5 className="text-xs">ของรางวัล</h5>
                <h2 className="font-bold text-xl">Test</h2>
              </div>
              <div className="block text-right">
                <Space size={12}>
                  <FontAwesomeIcon className={`text-2xl ${like ? "like" : "not-like"}`} icon={faHeart} onClick={toggleLike}/>
                  <FontAwesomeIcon className="text-2xl" style={{color:"#000000CC"}} icon={faShareNodes}/>
                </Space>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-4 pb-2">
              <div className="block pr-4" style={{borderRight:"1px solid #0000001A"}}>
                <p className="text-xs" style={{color:"#00000061"}}>คะแนนที่ใช้</p>
                <h1 className="font-with-inter primary-color text-2xl font-semibold">40 คะแนน</h1>
                <p className="text-xs font-semibold line-through" style={{color:"#00000061"}}>มูลค่า 500 บาท</p>
              </div>
              <div className="block pl-4">
                <p className="text-xs" style={{color:"#00000061"}}>คูปองมีอายุการใช้งาน</p>
                <h1 className="font-with-inter primary-color text-md font-semibold">22 ม.ค. 2022</h1>
              </div>
            </div>

            <div style={{borderTop:"1px solid #0000001A",padding:"20px 0 32px"}}>
              <h2 className="font-bold">รายละเอียด</h2>
              <ul className="text-sm list-disc mt-3 ps-4 list-items">
                <li>สมาชิกหลักเท่านั้นที่มีสิทธิใช้คะแนนเพื่อแลกรับของรางวัล</li>
                <li>ขอสงวนสิทธิ์งดรับการแก้ไข เปลี่ยนแปลงใดหลังจากที่สมาชิกหลักแจ้งความประสงค์ขอแลกคะแนนสะสมไปยังบริษัทฯแล้ว</li>
                <li>บริษัทฯ ขอแจ้งเปลี่ยนแปลงเงื่อนไขการแลกของรางวัล โดยมิได้แจ้งให้ทราบก่อนล่วงหน้า</li>
                <li style={{listStyle:"none"}} className="primary-color font-medium mt-2" id="read-more-btn"><a href="#" onClick={clickReadMore}>อ่านเพิ่มเติม</a></li>
                <div id="read-more">
                  <li>ส่วนลดจากคูปองจะไม่นำมาคำนวณเป็นแต้มสมาชิก</li>
                  <li>สามารถใช้ได้เฉพาะสาขาที่ร่วมรายการ และต้องใช้ก่อนวันหมดอายุ โดยต้องนำคูปองไปใช้แลกที่หน้าร้านเท่านั้น</li>
                  <li>การใช้คูปอง หรือโค้ดส่วนลดในทางที่ไม่ถูกต้อง รวมถึงกรณีคูปอง หรือโค้ดส่วนลด 1 ชุดรหัสได้ถูกใช้โดยหลายบัญชีสมาชิก</li>
                  <li>การใช้คูปอง หรือโค้ดส่วนลด โดยเจตนาที่ไม่สุจริต (รวมถึงการเอาคูปอง หรือโค้ดส่วนลดไปขาย)</li>
                </div>
              </ul>
            </div>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                isActive ? <MinusOutlined /> : <PlusOutlined />
              )}
              expandIconPosition="end"
              style={{
                background: "white",
              }}
            >
              <Panel header="วิธีแลกของรางวัล" key="1" style={panelStyle}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi tincidunt, scelerisque nulla a, volutpat orci. Etiam posuere pharetra enim, eu volutpat mi posuere sit amet. Vivamus porta porttitor finibus. Phasellus porttitor ac nisi suscipit condimentum. Duis volutpat risus eu aliquam dignissim.</p>
              </Panel>
              <Panel header="เงื่อนไขในการแลกของรางวัล" key="2" style={panelStyle}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis nisi tincidunt, scelerisque nulla a, volutpat orci. Etiam posuere pharetra enim, eu volutpat mi posuere sit amet. Vivamus porta porttitor finibus. Phasellus porttitor ac nisi suscipit condimentum. Duis volutpat risus eu aliquam dignissim.</p>
              </Panel>
            </Collapse>

          </div>
        </main>
        <footer className="p-6 fixed bottom-0 w-full">
          <Button className="save-btn active" onClick={showModalRedemption}>
            <Space>
              <FontAwesomeIcon icon={faGift}/>
              <span>ใช้คูปอง</span>
            </Space>
          </Button>
        </footer>

        <Modal className="popup-modal text-center" closable={false} open={acceptRedemption} onCancel={closeModalRedemption} onOk={acceptedRedemption} okText="ยืนยันการใช้" cancelText="ยกเลิก">
          <h2 className="primary-color mb-2">
            <span className="text-lg font-bold inline-block">ยืนยันการใช้คูปอง</span>
          </h2>
          <p className="modal-text-color">ต้องใช้สิทธิ์ภายในวันที่ 22 ม.ค. 2022 <br/> และไม่สามารถยกเลิกการใช้สิทธิ์ภายหลังได้</p>
        </Modal>
    </div>
  )
}

export default ToRedeem