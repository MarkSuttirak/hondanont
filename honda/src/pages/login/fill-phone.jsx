import React, { useState, useEffect } from "react";
import HeaderMobile from "../../components/header";
import HondaNon from "../../assets/images/honda-non.png";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, InputGroup, InputLeftAddon, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, } from "@chakra-ui/react"
import { useFrappeGetDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { useParams } from "react-router-dom";

const FillPhone = () => {
  const [filled, setFilled] = useState(true);
  const [pass, setPass] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const [modalTimesUp, setModalTimesUp] = useState(true);
  const [regenerateOTP, setRegenerateOTP] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [mustFillPhone, setMustFillPhone] = useState(false);

  const { isOpen: isOpenModalInvalid, onOpen: onOpenModalInvalid, onClose: onCloseModalInvalid } = useDisclosure();
  const { isOpen: isOpenModalAlready, onOpen: onOpenModalAlready, onClose: onCloseModalAlready } = useDisclosure();
  const { isOpen: isOpenModalOTPExpired, onOpen: onOpenModalOTPExpired, onClose: onCloseModalOTPExpired } = useDisclosure();

  const generateOTP = () => {
    const num = "0123456789";
    let code = "";
    for (let i = 0;i < 6;i++) {
      code += num[Math.floor(Math.random() * num.length)];
    }
  }

  const { id } = useParams();

  const { data } = useFrappeGetDocList('Contact', {
    fields: ['name', 'phone'],
    filters: [['phone', '!=', null]]
  })

  console.log(data);

  const handleFilled = () => {
    let phoneInput = document.getElementById("phone-input").value;
    phoneInput.replace('-', '');

    setFilled(true);
    setTimeout(() => {
      if (phoneInput === ""){
        onOpenModalInvalid();
        setFilled(true);
      } else {
        setHideBtn(true);
        setPass(true);
      }
    }, 1000)
  }

  const CountdownTimer = ({ minutes = 1 }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);

    useEffect(() => {
      generateOTP();
      const intervalId = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const minutesRemaining = Math.floor(remainingSeconds / 60);
    const secondsRemaining = remainingSeconds % 60;

    return (
      <span className="primary-color font-semibold">
        {remainingSeconds > 0 ? (
          <span>
            {minutesRemaining.toString().padStart(2, "0")}:
            {secondsRemaining.toString().padStart(2, "0")}
          </span>
        ) : (
          <span>
            <span>00:00</span>
            {/* <Modal className="popup-modal ok-btn" open={modalTimesUp} onOk={closeModalTimesUp} closable={false} okText="ตกลง">
              <div className="text-center">
                <h2 className="primary-color mb-2">
                  <span className="text-lg font-bold mt-5 inline-block">ดำเนินการไม่สำเร็จ</span>
                </h2>
                <p className="modal-text-color">รหัส OTP หมดอายุกด “ขอรหัส OTP อีกครั้ง” เพื่อรับรหัสใหม่</p>
              </div>
            </Modal> */}
            <Modal isOpen={isOpenModalOTPExpired} onClose={onCloseModalOTPExpired} isCentered>
              <ModalOverlay />
              <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
                <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
                  ดำเนินการไม่สำเร็จ
                </ModalHeader>
                <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
                  รหัส OTP หมดอายุกด “ขอรหัส OTP อีกครั้ง” เพื่อรับรหัสใหม่
                </ModalBody>

                <ModalFooter p={0}>
                  <Button h="50px" variant='ghost' fontWeight="bold" bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" onClick={onCloseModalOTPExpired} style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>ตกลง</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </span>
        )}
      </span>
    );
  }

  const handlePhone = (event) => {
    let phone = document.getElementById("phone-input");
    let dashPos = phone.value.indexOf("-");
    if (dashPos === -1 && phone.value.length > 3 && event.inputType !== 'deleteContentBackward') {
     phone.value = phone.value.slice(0, 3) + "-" + phone.value.slice(3);
    } else if (dashPos === 3 && phone.value.length === 4 && event.inputType !== 'deleteContentBackward'){
     phone.value = phone.value.slice(0, 3) + phone.value.slice(4);
    }
  }

  const closeModalAlreadyRegistered = () => {
    setAlreadyRegistered(false);
    setFilled(true);
  }

  const closeModalMustFillPhone = () => {
    setMustFillPhone(false);
    setFilled(true);
  }

  const closeModalTimesUp = () => {
    setRegenerateOTP(false);
  }

  const verifyotpnow = () => {
    if (data && data.phone !== null){
      window.location.href = '/'
    } else {
      window.location.href = '/fill-info'
    }
  }

  const newOTP = (e) => {
    e.preventDefault();
    setRegenerateOTP(false);
    setTimeout(() => setRegenerateOTP(true), 0)
  }

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px"/>)} secondBtn={false} />
      <main className="p-6">
        <h1 className="font-bold text-xl">กรอกหมายเลขโทรศัพท์</h1>
        <p className="secondary-color text-sm">กรุณากรอกหมายเลขโทรศัพท์ของคุณเพื่อรับรหัส OTP</p>

        <div className="tel-input">
          <label className="secondary-color text-sm mt-4 block">กรอกหมายเลขโทรศัพท์</label>
          <InputGroup>
            <InputLeftAddon children='+66' style={{backgroundColor:"#0000001A"}}/>
            <Input variant="filled" type='tel' maxLength={16} className="w-full" onKeyUp={handlePhone} id="phone-input" bordered={false} placeholder="XXX-XXXXXXX" style={{backgroundColor:"#0000001A",outline:"none"}}/>
          </InputGroup>
        </div>

        <p className="secondary-color text-sm mt-6 text-center">คุณจะได้รับรหัสยืนยันตัวตนจำนวน 6 หลัก</p>
        {
          (!hideBtn && <Button onClick={handleFilled} fontWeight="bold" className={`save-btn mt-12 ${filled ? "active" : "inactive"}`} disabled={filled ? false : true}>รับรหัส OTP</Button>)
        }
        <div id="recaptcha-container"></div>
        {
          (pass && (
            <div className="mt-8">
              <h1 className="font-bold text-xl">กรอกรหัสผ่าน OTP</h1>
              <p className="secondary-color text-sm">รหัส OTP จะส่งไปยังหมายเลขโทรศัพท์ของคุณ</p>

              <div className="tel-input">
                <label className="secondary-color text-sm mt-4 mb-2 block">กรอกรหัส OTP</label>
                <Input type="number" focusBorderColor="transparent" id="otp-input" className="text-center text-xl" maxLength={6} style={{backgroundColor:"#0000001A",outline:"none"}}/>
              </div>

              <div className="text-center">
                <p className="secondary-color text-sm mt-6 mb-8 leading-6">หากคุณต้องการขอรหัสผ่าน OTP อีกครั้ง <br/>กด <span className="text-black">“ขอรหัส OTP อีกครั้ง”</span> ได้ที่ด้านล่าง</p>
                {
                  (regenerateOTP && <p className="text-black text-sm mt-4 mb-2">ขอรหัส OTP ใหม่อีกครั้งใน <CountdownTimer /> วินาที</p>)
                }
              </div>

              <Button onClick={verifyotpnow} fontWeight="bold" className={`save-btn mt-12 ${regenerateOTP ? "active" : "inactive"}`} disabled={regenerateOTP ? false : true}>ยืนยัน OTP</Button>
              <div className="mt-4 text-center">
                <a href="#" className="primary-color underline text-sm" onClick={newOTP}>ขอรหัส OTP อีกครั้ง</a>
              </div>
            </div>
          ))
        }
        

        <Modal className="popup-modal ok-btn" open={alreadyRegistered} onOk={closeModalAlreadyRegistered} closable={false} okText="ตกลง">
          <div className="text-center">
            <h2 className="primary-color mb-2">
              <span className="text-lg font-bold mt-5 inline-block">ดำเนินการไม่สำเร็จ</span>
            </h2>
            <p className="modal-text-color">หมายเลขเบอร์โทรศัพท์นี้มีการ<br/>ลงทะเบียนไปแล้ว ไม่สามารถลงทะเบียนซ้ำได้</p>
          </div>
        </Modal>

        <Modal isOpen={isOpenModalInvalid} onClose={onCloseModalInvalid} isCentered>
          <ModalOverlay />
          <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
            <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
              ดำเนินการไม่สำเร็จ
            </ModalHeader>
            <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
              กรุณากรอกเบอร์โทรศัพท์ของคุณ<br/>เพื่อลงทะเบียนเข้าสู่ระบบ
            </ModalBody>

            <ModalFooter p={0}>
              <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" onClick={onCloseModalInvalid} style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>ตกลง</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenModalAlready} onClose={onCloseModalAlready} isCentered>
          <ModalOverlay />
          <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
            <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
              ดำเนินการไม่สำเร็จ
            </ModalHeader>
            <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
              หมายเลขเบอร์โทรศัพท์นี้มีการ<br/>ลงทะเบียนไปแล้ว ไม่สามารถลงทะเบียนซ้ำได้
            </ModalBody>

            <ModalFooter p={0}>
              <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" onClick={onCloseModalAlready} style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>ตกลง</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal className="popup-modal ok-btn" open={mustFillPhone} onOk={closeModalMustFillPhone} closable={false} okText="ตกลง">
          <div className="text-center">
            <h2 className="primary-color mb-2">
              <span className="text-lg font-bold mt-5 inline-block">ดำเนินการไม่สำเร็จ</span>
            </h2>
            <p className="modal-text-color">กรุณากรอกเบอร์โทรศัพท์ของคุณ<br/>เพื่อลงทะเบียนเข้าสู่ระบบ</p>
          </div>
        </Modal>
      </main>
    </div>
  )
}

export default FillPhone