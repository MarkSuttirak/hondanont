import React, { useState,useEffect } from "react";
import { Space } from "antd";
import { faChevronLeft, faHeart, faClockRotateLeft, faGift, faShareNodes, faCircleXmark, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import HondaNon from "../../assets/images/honda-non.png";
import HeaderMobile from '../../components/header'
import FooterMenu from '../../components/footer-menu'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFrappeDocumentEventListener, useFrappeGetDoc } from "frappe-react-sdk";
import { useParams } from "react-router-dom";
import { Modal, ModalBody, ModalOverlay, ModalHeader, ModalContent, ModalFooter, Box, Button, Accordion, AccordionIcon, AccordionItem, AccordionButton, AccordionPanel, useDisclosure, SkeletonText, Skeleton } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons"

const Redemption = () => {
  document.body.style.backgroundColor = "white";
  const [like, setLike] = useState(false);
  const [usrreward, setUsrreward] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnisactive, setbtnisactive] = useState(true);
  const [formsubmitloader, setformsubmitloader] = useState(false);
  const [showerror, setshowerror] = useState(false);

  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  const { isOpen: isOpenModalAccepted, onOpen: onOpenModalAccepted, onClose: onCloseModalAccepted } = useDisclosure()
  const { isOpen: isOpenModalNotEnough, onOpen: onOpenModalNotEnough, onClose: onCloseModalNotEnough } = useDisclosure()

  const panelStyle = {
    marginBottom: 16,
    background: "#F8F8F8",
    borderRadius: "8px",
    border: 'none',
  };

  let { id } = useParams()

  const { data, isValidating, error, mutate } = useFrappeGetDoc('Item', id, {
    fields: ['item_name', 'item_group', 'image', 'points', 'description']
  })

  const { data: userPoints } = useFrappeGetDoc('Loyalty Point Entry', 'Bonnie Yang', {
    fields: ['loyalty_points']
  })

  useFrappeDocumentEventListener('Item', (d) => {
    console.log(d);
    if (d.doctype === 'Item'){
      mutate();
    }
  })

  const [acceptRedemption, setAcceptRedemption] = useState(false);
  const [notEnough, setNotEnough] = useState(false);

  const showModalRedemption = () => {
    setAcceptRedemption(true);
  }

  const closeModalRedemption = () => {
    setAcceptRedemption(false);
  }

  const [accepted, setAccepted] = useState(false);

  const showModalAccepted = () => {
    onCloseModal();
    onOpenModalAccepted()
  }

  const buythisreward = () => {
    if (data && userPoints) {
      if (data.points > userPoints.loyalty_points) {
        setformsubmitloader(false);
        setAcceptRedemption(false);
        showNotEnough()
      } else {
        setformsubmitloader(false);
        setAcceptRedemption(false);
        setAccepted(true);
      }
    }
  }

  const showNotEnough = () => {
    setAcceptRedemption(false);
    setNotEnough(true);
  }

  const closeModalNotEnough = () => {
    setNotEnough(false);
  }

  const pressCheckReward = () => {
    window.location.replace("/my-rewards");
  }

  const closeModalAccepted = () => {
    setAccepted(false);
  }

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px" style={{margin:"auto"}}/>)} secondBtn={false} />
      <main>
          <>
          {data && 
            <>
              <Skeleton isLoaded={!isValidating}>
                <img src={data.image} width="100%" style={{height:"280px"}} />
              </Skeleton>
              <div className="brand-info p-6">
                <div className="grid grid-cols-2 flex items-center justify-between">
                  <div className="block">
                    <Skeleton isLoaded={!isValidating}>
                      <h5 className="text-xs">{data.item_group}</h5>
                    </Skeleton>
                    <Skeleton isLoaded={!isValidating} className="mt-1">
                      <h2 className="font-bold text-xl">{data.item_name}</h2>
                    </Skeleton>
                  </div>
                </div>

                <div className="grid grid-cols-2 mt-4 pb-2">
                  <div className="block pr-4" style={{borderRight:"1px solid #0000001A"}}>
                    <p className="text-xs" style={{color:"#00000061"}}>คะแนนที่ใช้</p>
                    <h1 className="font-with-inter primary-color text-2xl font-semibold">{data.points} คะแนน</h1>
                  </div>
                  <div className="block pl-4">
                    <p className="text-xs" style={{color:"#00000061"}}>คูปองมีอายุการใช้งานภายใน</p>
                    <h1 className="font-with-inter primary-color text-md font-semibold">1 day</h1>
                  </div>
                </div>

                <div style={{borderTop:"1px solid #0000001A",padding:"20px 0 32px"}}>
                  <h2 className="font-bold">รายละเอียด</h2>
                  <SkeletonText isLoaded={!isValidating}>
                    {data.description}
                  </SkeletonText>
                </div>

                {data.item_group === 'Free Product' ? (
                  <Accordion allowToggle allowMultiple>
                  <AccordionItem style={panelStyle}>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton p="12px 16px 12px 12px">
                            <Box as="span" flex='1' textAlign='left' fontSize="14px">
                              <span className="text-sm">วิธีการแลกของรางวัล</span>
                            </Box>
                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="text-sm list-disc ps-4 list-items" style={{color:"#585858"}}>
                            <li>กดเลือกของรางวัล ที่ต้องการแลกแต้ม</li>
                            <li>กดปุ่มแลกของรางวัล</li>
                            <li>จากนั้นแสดง QR code การแลกของรางวัลนั้น ให้แก่เจ้าหน้าที่แคชเชียร์ เพื่อสแกนทำการจ่ายของรางวัลเพียงเท่านี้ก็สามารถแลกแต้มได้เองง่ายๆ</li>
                          </ul>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem style={panelStyle}>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton p="12px 16px 12px 12px">
                            <Box as="span" flex='1' textAlign='left' fontSize="14px">
                              <span className="text-sm">เงื่อนไขในการแลกของรางวัล</span>
                            </Box>
                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="text-sm list-disc ps-4 list-items" style={{color:"#585858"}}>
                            <li>สามารถกดแลกของรางวัล โดยกดเลือกสาขาที่ต้องการรับของรางวัล โดยท่านจะต้องเดินทางมารับของรางวัล ณ ศูนย์บริการที่ได้ทำการเลือกไว้ เท่านั้น</li>
                            <li>การคำนวณแต้มสะสม แต้มที่ได้รับจะถูกคำนวณจากยอดชำระสุทธิเท่านั้น โดยเศษทศนิยมที่เหลือจากการคำนวณจะไม่ถูกนำไปรวมกับยอดชำระอื่น ๆ และไม่สามารถแลกเป็นแต้มสะสมได้</li>
                            <li>แต้มสะสมที่ใช้แลกของรางวัลแล้ว ไม่สามารถขอคืนได้ ไม่ว่ากรณีใด ๆ ทั้งสิ้น</li>
                            <li>ในกรณีที่ของรางวัลที่ลูกค้าแลก ขาดสต๊อก ทางบริษัทฯ จะทำการนัดหมายให้ลูกค้าเข้ามารับในภายหลัง</li>
                            <li>หากมีข้อโต้แย้งใด ๆ เกิดขึ้นเกี่ยวกับการสะสมแต้ม หรือการแลกของรางวัลให้ถือการตัดสินของบริษัทฯ เป็นที่สิ้นสุด</li>
                          </ul>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Accordion>
                ) : (data.item_group === "Cash Coupon" ? (
                  <Accordion allowToggle allowMultiple>
                  <AccordionItem style={panelStyle}>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton p="12px 16px 12px 12px">
                            <Box as="span" flex='1' textAlign='left'>
                              <span className="text-sm">วิธีการแลกส่วนลดเงินสด</span>
                            </Box>
                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="text-sm list-disc ps-4 list-items" style={{color:"#585858"}}>
                            <li>กดเลือกจำนวนส่วนลดเงินสด ที่ต้องการ</li>
                            <li>กดปุ่มแลกส่วนลดเงินสด</li>
                            <li>กดยืนยันการแลก</li>
                            <li>จากนั้นแสดง QR code การแลกส่วนลดเงินสดนั้น ให้แก่เจ้าหน้าที่แคชเชียร์ เพื่อสแกนทำจ่ายส่วนลดเงินสดเพียงเท่านี้ก็สามารถแลกแต้มได้เองง่ายๆ</li>
                          </ul>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                  <AccordionItem style={panelStyle}>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton p="12px 16px 12px 12px">
                            <Box as="span" flex='1' textAlign='left' fontSize="14px">
                              <span className="text-sm">เงื่อนไขในการแลกส่วนลดเงินสด</span>
                            </Box>
                            {isExpanded ? (
                              <MinusIcon fontSize="12px" />
                            ) : (
                              <AddIcon fontSize="12px" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <ul className="text-sm list-disc ps-4 list-items" style={{color:"#585858"}}>
                            <li>สามารถกดแลกส่วนลดเงินสด ใช้เป็นส่วนลดสำหรับการซื้อสินค้าและบริการครั้งต่อไปโดยไม่มีขั้นต่ำ</li>
                            <li>การคำนวณแต้มสะสม แต้มที่ได้รับจะถูกคำนวณจากยอดชำระสุทธิเท่านั้น โดยเศษทศนิยมที่เหลือจากการคำนวณจะไม่ถูกนำไปรวมกับยอดชำระอื่น ๆ และไม่สามารถแลกเป็นแต้มสะสมได้</li>
                            <li>แต้มสะสมไม่สามารถแลกเปลี่ยน หรือทอนเป็นเงินสดได้</li>
                            <li>แต้มสะสมที่ใช้แลกส่วนลดเงินสดแล้ว ไม่สามารถขอคืนได้ ไม่ว่ากรณีใด ๆ ทั้งสิ้น</li>
                            <li>หากมีข้อโต้แย้งใด ๆ เกิดขึ้นเกี่ยวกับการสะสมแต้ม หรือการแลกส่วนลดเงินสดให้ถือการตัดสินของบริษัทฯ เป็นที่สิ้นสุด</li>
                          </ul>
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Accordion>
                ) : (
                  <Skeleton style={{height:"280px"}}/>
                ))}
              </div>
            </>
          }
          </>
      </main>
      <footer className="p-6 fixed bottom-0 w-full">
        <Button className="save-btn active" onClick={onOpenModal}>
          <Space>
            <FontAwesomeIcon icon={faGift}/>
            <span className="font-bold">แลกของรางวัล</span>
          </Space>
        </Button>
      </footer>

      <Modal isOpen={isOpenModal} onClose={onCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
          <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
            ยืนยันการแลก
          </ModalHeader>
          <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
            หลังจากกด “ยืนยันการแลก” <br/>คุณสามารถเก็บไว้ใช้ภายหลังได้
          </ModalBody>

          <ModalFooter p={0}>
            <Button h="50px" colorScheme="black" onClick={onCloseModal} style={{borderRadius:"0 0 0 10px",width:"50%",color:"black",backgroundColor:"#0000000A",fontSize:"14px"}}>
              ยกเลิก
            </Button>
            <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" style={{borderRadius:"0 0 10px 0",width:"50%",color:"white",fontSize:"14px"}} onClick={showModalAccepted}>ยืนยันการแลก</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenModalAccepted} onClose={onCloseModalAccepted} isCentered>
        <ModalOverlay />
        <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
          <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
            แลกของรางวัลสำเร็จ
          </ModalHeader>
          <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
            สามารถกด “ดูรางวัลของฉัน” <br/>เพื่อแลกของรางวัลได้เลย
          </ModalBody>

          <ModalFooter p={0}>
            <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>ยืนยันการแลก</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenModalNotEnough} onClose={onCloseModalNotEnough} isCentered>
        <ModalOverlay />
        <ModalContent w="80%" style={{borderRadius:"10px",textAlign:"center"}}>
          <ModalHeader p="26px 26px 8px" style={{color:"#F0592A",fontSize:"18px",fontWeight:"bold"}}>
            คะแนนของคุณไม่เพียงพอ
          </ModalHeader>
          <ModalBody p="0 26px 26px" style={{fontSize:"14px"}}>
            แลกของรางวัลไม่สำเร็จ<br/>{showerror}
          </ModalBody>

          <ModalFooter p={0}>
            <Button h="50px" variant='ghost' bg="linear-gradient(133.91deg,#f16a28 1.84%,#f9a30f)" style={{borderRadius:"0 0 10px 10px",width:"100%",color:"white",fontSize:"14px"}}>ตกลง</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Modal className="popup-modal text-center one-btn" closable={false} open={accepted} onCancel={closeModalAccepted} onOk={pressCheckReward} okText="ดูรางวัลของฉัน">
        <h2 className="primary-color mb-2">
          <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:"54px"}}/><br/>
          <span className="text-lg font-bold mt-5 inline-block">แลกของรางวัลสำเร็จ</span>
        </h2>
        <p className="modal-text-color">สามารถกด “ดูรางวัลของฉัน” <br/>เพื่อแลกของรางวัลได้เลย</p>
      </Modal> */}

      {/* <Modal className="popup-modal text-center one-btn" closable={true} open={notEnough} onOk={closeModalNotEnough} okText="ตกลง">
        <h2 className="primary-color mb-2">
          <FontAwesomeIcon icon={faCircleXmark} style={{fontSize:"54px"}}/><br/>
          <span className="text-lg font-bold mt-5 inline-block">คะแนนของคุณไม่เพียงพอ</span>
        </h2>
        <p className="modal-text-color">แลกของรางวัลไม่สำเร็จ<br/>{showerror}</p>
      </Modal> */}
    </div>
  )
}

export default Redemption