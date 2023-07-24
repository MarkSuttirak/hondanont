import React, { useState, useEffect } from "react";
import HeaderMobile from "../../components/header";
import HondaNon from "../../assets/images/honda-non.png";
import { faChevronLeft, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure, Input, Button } from '@chakra-ui/react'
import locale from "antd/lib/date-picker/locale/th_TH";

const FillInfo = () => {
  document.body.style.backgroundColor = "#F8F8F8";
  const [edited, isEdited] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [idError, setIdError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const { isOpen: isOpenModalSuccess, onOpen: onOpenModalSuccess, onClose: onCloseModalSuccess } = useDisclosure()

  const typeInfo = () => {
    const nameValue = document.getElementById("name");
    const idNumberValue = document.getElementById("id-number");
    const birthDateValue = document.getElementById("birth-date");
    const emailValue = document.getElementById("email");
    if (nameValue.value != "" && idNumberValue.value != "" && birthDateValue.value != "" && emailValue.value != "") {
      isEdited(true);
    } else {
      isEdited(false);
    }
  }

  const modalSuccess = () => {
    const idNumberValue = document.getElementById("id-number");
    const emailValue = document.getElementById("email");
    if (idNumberValue.value.length !== 16) {
      setIdError(true);
      if (emailValue.value.includes("@") === false || emailValue.value.includes("@.") || emailValue.value[0] === "@" || emailValue.value.includes(".") === false || emailValue.value[emailValue.value.length - 1] === "." || emailValue.value[emailValue.value.length - 2] === "."){
        setEmailError(true);
      }
    } else if (emailValue.value.includes("@") === false || emailValue.value.includes("@.") || emailValue.value[0] === "@" || emailValue.value.includes(".") === false || emailValue.value[emailValue.value.length - 1] === "." || emailValue.value[emailValue.value.length - 2] === "."){
      setEmailError(true);
    } else {
      onOpenModalSuccess();
    }
  }

  const handleIDcard = (event) => {
    let input = event.target.value.replace(/-/g, ''); // remove all dashes
    if (input.length > 0) {
      let result = '';
      let parts = [1, 5, 10, 13]; // indexes where the dashes should be added
      let currentPart = 0;
      for (let i = 0; i < input.length; i++) {
        if (i === parts[currentPart]) {
          result += '-';
          currentPart++;
        }
        result += input[i];
      }
      input = result;
    }
    event.target.value = input;
  }

  const readyToWork = () => {
    window.location.href = "/ready";
  }

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px"/>)} secondIcon={faXmark} secondBtn={true} secondLink="/login" />
      <main className="p-6 mb-0">
        <h2 className="font-bold">ข้อมูลส่วนตัว</h2>

        <label className="inline-block mt-4 text-sm">ชื่อ-นามสกุล <span className="text-rose-600">*</span></label>
        <Input className="w-full mt-2 input-account" fontSize="14px" id="name" p="10px" variant="unstyled" placeholder="ชื่อ-นามสกุล" autoComplete="off" onInput={typeInfo} style={{backgroundColor:"white"}}/>

        <label className="inline-block mt-4 text-sm">เลขบัตรประจำตัวบัตรประชาชน <span className="text-rose-600">*</span></label>
        <Input type="tel" maxLength={16} fontSize="14px" onKeyUp={handleIDcard} p="10px" variant="unstyled" style={{backgroundColor:"white"}} className={`w-full mt-2 input-account ${idError ? "error" : ""}`} id="id-number" autoComplete="off" placeholder="กรอกเลขบัตรประชาชน 13 หลัก" onKeyDown={() => setIdError(false)} onInput={typeInfo}/>
        {idError && <p className="text-rose-600 text-xs mt-1">เลขบัตรประชาชนต้องมี 13 หลักและไม่มีขีด</p>}

        <label className="inline-block mt-4 text-sm">วันเกิด <span className="text-rose-600">*</span></label>
        {/* <DatePicker format="YYYY/MM/DD" locale={locale} inputReadOnly={true} className="w-full mt-2 input-account" id="birth-date" autoComplete="off" placeholder="วว/ดด/ปป" onInput={typeInfo}/> */}
        <Input type="datetime-local" maxLength={16} fontSize="14px" locale={locale} p="10px" variant="unstyled" style={{backgroundColor:"white"}} className={`w-full mt-2 input-account ${idError ? "error" : ""}`} id="birth-date" autoComplete="off" placeholder="วว/ดด/ปป" onInput={typeInfo}/>

        <label className="inline-block mt-4 text-sm">อีเมล <span className="text-rose-600">*</span></label>
        <Input type="email" p="10px" variant="unstyled" fontSize="14px" style={{backgroundColor:"white"}} className={`w-full mt-2 input-account ${emailError ? "error" : ""}`} id="email" autoComplete="off" placeholder="User_01@mail.com" onKeyDown={() => setEmailError(false)} onInput={typeInfo}/>
        {emailError && <p className="text-rose-600 text-xs mt-1">รูปแบบอีเมลไม่ถูกต้อง</p>}
      </main>

      <footer className="p-6 relative bottom-0">
        <Button onClick={modalSuccess} fontWeight="bold" className={`save-btn ${edited ? "active" : "inactive"}`} disabled={edited ? false : true}>ยืนยัน</Button>
      </footer>

      {/* <Modal className="popup-modal ok-btn" open={success} onOk={readyToWork} closable={false} okText="เริ่มต้นใช้งาน">
        <div className="text-center">
          <h2 className="primary-color mb-2">
            <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:"54px"}}/><br/>
            <span className="text-lg font-bold mt-5 inline-block">สมัครสมาชิกสำเร็จ</span>
          </h2>
          <p className="modal-text-color">คุณสามารถเริ่มต้นการใช้งาน <br/>Hondanont Loyalty ได้แล้ว</p>
        </div>
      </Modal> */}

      <Modal isOpen={isOpenModalSuccess} onClose={onCloseModalSuccess} isCentered>
        <ModalOverlay />
        <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
          <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
            สมัครสมาชิกสำเร็จ
          </ModalHeader>
          <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
            คุณสามารถเริ่มต้นการใช้งาน <br/>Hondanont Loyalty ได้แล้ว
          </ModalBody>

          <ModalFooter p={0}>
            <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" onClick={() => location.href = "/ready"} style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>เริ่มต้นใช้งาน</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default FillInfo