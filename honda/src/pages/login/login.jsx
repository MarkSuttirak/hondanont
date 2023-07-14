import React, { useState,useLayoutEffect } from "react";
import LogoHonda from "../../assets/images/logo-login.png";
import BgLogin from "../../assets/images/background-login.png";
import { Button, Modal, Checkbox } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
  document.body.style.backgroundImage = "url(" + BgLogin + ")";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";

  const [policyModal, setPolicyModal] = useState(false);
  const [checkedBox, setCheckedBox] = useState(false);

  const openPolicy = () => {
    setPolicyModal(true);
  }

  const closePolicy = () => {
    setPolicyModal(false);
  }

  const checkBox = (e) => {
    if (e.target.checked){
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }
  }

  const acceptedPolicy = () => {
    window.location.href = '/fill-phone'
  }

  return (
    <div className="text-center" style={{marginTop:"25vh"}}>
      <img src={LogoHonda} width="40%" className="m-auto"/>
      <h1 className="text-white font-bold" style={{fontSize:"32px",lineHeight:"34px",marginTop:"45px"}}>ยินดีต้อนรับ<br/>Hondanont Loyalty</h1>
      <p className="text-white mt-4 font-medium">ลงทะเบียนวันนี้ เริ่มสะสมคะแนนจากทุกการใช้จ่าย <br/>แลกส่วนลด และสิทธิ์พิเศษที่เหนือกว่าใคร<br/>แทนคำขอบคุณที่ไว้วางใจ</p>
      <div className="px-6 mt-12">
      <Button onClick={openPolicy} className="bg-white flex items-center w-full justify-center font-bold primary-color" style={{height:"inherit",padding:"15px 20px",border:"none",boxShadow:"none",borderRadius:"8px",fontSize:"19px"}}>
        เข้าสู่ระบบ
      </Button>
    </div>

    <Modal className="popup-modal policy" open={policyModal} onCancel={closePolicy} closable={false} footer={null} maskTransitionName="" transitionName="">
      <h1 className="font-bold text-center text-2xl mb-8">นโยบายข้อมูลส่วนบุคคล</h1>

      <h2 className="font-bold text-base">นโยบายความเป็นส่วนตัว</h2>
      <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
      มีความมุ่งมั่นในการปกป้องความเป็นส่วนตัวและข้อมูลส่วนบุคคลของลูกค้าและผู้ใช้บริการของเรานโยบายความเป็นส่วน
      ตัวนี้อธิบายถึงประเภทของข้อมูลส่วนบุคคลที่เราเก็บรวบรวมวิธีการเก็บรวบรวมและใช้ข้อมูลนั้นและสิทธิของคุณเกี่ยวกับข้อมูลส่วนบุคคลของคุณโดยการเข้าถึงเว็บไซต์ของเราและ/หรือการใช้บริการของเรา คุณยินยอมให้เราเก็บรวบรวมและใช้
      ข้อมูลส่วนบุคคลของคุณตามนโยบายความเป็นส่วนตัวนี้
      </p>

      <h3 className="font-bold text-sm mt-8">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
      <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
      บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วนบุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้ม
      ครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) โดยบริษัท
      จะดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเฉพาะเมื่อจำเป็นต่อการให้บริการและปฏิบัติตามกฎหมาย
      </p>

      <h3 className="font-bold text-sm mt-8">2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
      <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
        ข้อมูลส่วนบุคคลที่บริษัทเก็บรวบรวมจะใช้เพื่อวัตถุประสงค์ต่อไปนี้:
        <ul className="text-sm list-disc mt-3 ps-4 list-items" style={{color:"#585858"}}>
          <li>ให้บริการและจัดการบัญชีของท่าน</li>
          <li>ดำเนินการตามคำขอหรือความต้องการของท่าน</li>
          <li>วิเคราะห์และปรับปรุงการให้บริการ</li>
          <li>อื่นๆตามกฎหมาย</li>
        </ul>
      </p>

      <h3 className="font-bold text-sm mt-8">3. การรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล</h3>
      <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
      บริษัทไม่มีสิทธิ์ในการเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่
      บุคคลภายนอกยกเว้นในกรณีที่บริษัทได้รับความยินยอมจาก
      ท่านหรือเมื่อบริษัทมีหน้าที่ตามกฎหมายจะต้องเปิดเผยข้อมูล
      </p>

      <h3 className="font-bold text-sm mt-8">4. สิทธิ์ทรัพย์สินทางปัญญา</h3>
      <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
      บริษัทจะดำเนินการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่าน
      </p>

      <Checkbox onChange={checkBox} className="my-10">ข้าพเจ้าได้อ่าน และ ยินยอมให้ข้อมูลส่วนบุคคล</Checkbox>

      <Button onClick={acceptedPolicy} className={`save-btn ${checkedBox ? "active" : "inactive"}`} disabled={checkedBox ? false : true}>บันทึก</Button>
      <div style={{width:"100%",height:"26px"}}></div>
    </Modal>
  </div>
  )
}

export default LoginPage