import React, { useState,useEffect } from "react";
import { Avatar, Button, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, SkeletonCircle, SkeletonText, HStack, useDisclosure } from '@chakra-ui/react';
import { faChevronLeft, faChevronRight, faGift, faUserPen, faShield, faLock, faBook, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import FooterMenu from "../../components/footer-menu";
import HeaderMobile from "../../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useFrappeGetDoc } from "frappe-react-sdk";

const MyAccount = () => {
  document.body.style.backgroundColor = "white";
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: user, isLoading } = useFrappeGetDoc('Customer', 'Bonnie Yang', {
    fields: ['customer_name', 'image']
  })

  const { data: userPoints } = useFrappeGetDoc('Loyalty Point Entry', 'Bonnie Yang', {
    fields: ['loyalty_points']
  })

  const CardAccount = (props) => {
    return (
      <Link to={props.link}>
        <Button bgColor="white" className="flex items-center w-full mb-4 black" style={{height:"inherit",padding:"15px 20px",border:"none",boxShadow:"none",borderRadius:"8px",justifyContent:"space-between"}}>
          <Stack>
            <HStack>
              <FontAwesomeIcon icon={props.icon} style={{minWidth:"24px"}}/>
              <span className="font-medium text-sm">{props.text}</span>
            </HStack>
          </Stack>
          <FontAwesomeIcon icon={faChevronRight} className="float-right"/>
        </Button>
      </Link>
    )
  }

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title="ข้อมูลของฉัน" secondBtn={true} secondLink="/my-rewards" secondIcon={faGift} />
      <main>
        <section className="p-6">
          <div className="block float-left">
            {!isLoading ? (
              <>
              {user && (
              <Avatar
              style={{
                maxWidth:"114px",
                width:"100%",
                height:"auto"
              }}
              src={user.image}
            />
            )}</>
            ) : (
              <SkeletonCircle active size={114}/>
            )}
          </div>
          <div className="block ml-32">
            {!isLoading ? (<h1 className="font-with-inter text-color text-xl font-medium">{user && user.customer_name}</h1>) : (<SkeletonText active style={{maxWidth:"60px",minWidth:"0",marginBottom:"4px"}}/>)}
            <p className="primary-color">Classic Member</p>

            <div className="columns-2 mt-4">
              <div className="block pr-2" style={{borderRight:"1px solid #0000001A"}}>
                <h1 className="font-with-inter primary-color text-3xl font-semibold">{userPoints ? userPoints.loyalty_points : '0'}</h1>
                <p className="text-xs font-semibold whitespace-pre">คะแนนที่คุณมี</p>
              </div>
              <div className="block pl-2">
                <h1 className="font-with-inter primary-color text-3xl font-semibold">0</h1>
                <p className="text-xs font-semibold whitespace-pre">คะแนนที่คุณเคยใช้</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7 p-6 pb-20" style={{backgroundColor:"#F8F8F8",borderRadius:"12px 12px 0 0"}}>
          <h2 className="font-bold mb-2">การตั้งค่าและความเป็นส่วนตัว</h2>
          <CardAccount link="/edit-account" text="ข้อมูลส่วนตัว" icon={faUserPen}/>
          <CardAccount link="/terms-and-conditions" text="ข้อกำหนดและเงื่อนไข" icon={faShield}/>
          <CardAccount link="/consent-for-disclosure" text="ความยินยอมในการเปิดเผยข้อมูล" icon={faLock}/>

          <h2 className="font-bold mt-6 mb-2">ความช่วยเหลือ</h2>
          <CardAccount link="/point-collection" text="วิธีเก็บคะแนน" icon={faBook}/>
          <CardAccount link="/exchange-rewards" text="วิธีแลกของรางวัล" icon={faGift}/>
          <CardAccount link="/member-condition" text="เงื่อนไขระดับของสมาชิก" icon={faCreditCard}/>

          <h2 className="font-bold mt-6 mb-2">บัญชี</h2>
          <Button onClick={onOpen} bgColor="white" className="flex items-center w-full mb-4" style={{height:"inherit",padding:"15px 20px",border:"none",boxShadow:"none",borderRadius:"8px",color:"black",justifyContent:"space-between"}}>
            <Stack>
              <HStack>
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{minWidth:"24px"}}/>
                <span className="font-medium text-sm">ออกจากระบบ</span>
              </HStack>
            </Stack>
            <FontAwesomeIcon icon={faChevronRight} className="float-right"/>
          </Button>
        </section>
      </main>

      {/* <Modal className="popup-modal text-center test-modal" open={logoutModal} onOk={okModal} onCancel={closeModal} closable={false} cancelText="ยกเลิก" okText="ออกจากระบบ">
        <h2 className="primary-color mb-2">
          <FontAwesomeIcon icon={faArrowRightFromBracket} style={{fontSize:"54px"}}/><br/>
          <span className="text-lg font-bold mt-5 inline-block">คุณต้องการออกจากระบบหรือไม่</span>
        </h2>
        <p>การใช้งานของคุณจะสิ้นสุดลง และคุณจะต้องเข้าสู่ระบบอีกครั้ง เพื่อเปิดการใช้งาน</p>
      </Modal> */}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
          <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{fontSize:"54px",marginBottom:"28px"}}/><br/>
            คุณต้องการออกจากระบบหรือไม่
          </ModalHeader>
          <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
            การใช้งานของคุณจะสิ้นสุดลง และคุณจะต้องเข้าสู่ระบบอีกครั้ง เพื่อเปิดการใช้งาน
          </ModalBody>

          <ModalFooter p={0}>
            <Button h="50px" colorScheme="black" onClick={onClose} style={{borderRadius:"0 0 0 10px",width:"50%",color:"black",backgroundColor:"#0000000A",fontSize:"14px"}}>
              ยกเลิก
            </Button>
            <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" style={{borderRadius:"0 0 10px 0",width:"50%",color:"white",fontSize:"14px"}} onClick={() => location.href = "/login"}>ออกจากระบบ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <FooterMenu activeMenu={4}/>
    </div>
  )
}

export default MyAccount