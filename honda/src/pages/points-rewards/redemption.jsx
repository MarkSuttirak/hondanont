import React, { useState,useEffect } from "react";
import { Card, Button, Space, Collapse, theme, Modal, Skeleton } from "antd";
import { faChevronLeft, faHeart, faClockRotateLeft, faGift, faShareNodes, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import HondaNon from "../../assets/images/honda-non.png";
import HeaderMobile from '../../components/header'
import FooterMenu from '../../components/footer-menu'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useFrappeDocumentEventListener, useFrappeGetDoc } from "frappe-react-sdk";
import { useParams } from "react-router-dom";

const Redemption = () => {
  document.body.style.backgroundColor = "white";

  const { Panel } = Collapse;

  const panelStyle = {
    marginBottom: 16,
    background: "#F8F8F8",
    borderRadius: "8px",
    border: 'none',
  };

  let { id } = useParams()

  const { data, isLoading, error, mutate } = useFrappeGetDoc('Item', id, {
    fields: ['item_name', 'item_group', 'image', 'points']
  })

  useFrappeDocumentEventListener('Item', (d) => {
    if (d.doctype === 'Item'){
      mutate();
    }
  })

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={(<img src={HondaNon} width="94px" style={{margin:"auto"}}/>)} secondBtn={false} />
      <main>
          <>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>{data && (<img src={data.image} width="100%" style={{height:"280px"}} />)}</>
            )}
            <div className="brand-info p-6">
              <div className="grid grid-cols-2 flex items-center justify-between">
                <div className="block">
                  <h5 className="text-xs">Testtype</h5>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>{data && (<h2 className="font-bold text-xl">{data.item_name}</h2>)}</>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 mt-4 pb-2">
                <div className="block pr-4" style={{borderRight:"1px solid #0000001A"}}>
                  <p className="text-xs" style={{color:"#00000061"}}>คะแนนที่ใช้</p>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>{data && (<h1 className="font-with-inter primary-color text-2xl font-semibold">{data.points} คะแนน</h1>)}</>
                  )}
                </div>
                <div className="block pl-4">
                  <p className="text-xs" style={{color:"#00000061"}}>คูปองมีอายุการใช้งานภายใน</p>
                  <h1 className="font-with-inter primary-color text-md font-semibold">1 day</h1>
                </div>
              </div>
            </div>
          </>
      </main>
    </div>
  )
}

export default Redemption