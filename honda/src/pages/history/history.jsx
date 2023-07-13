import React, { useState,useEffect } from "react";
import { Tabs, Card, Skeleton } from "antd";
import FooterMenu from "../../components/footer-menu";
import HeaderMobile from "../../components/header";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const History = () => {
  document.body.style.backgroundColor = "#F8F8F8";
  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title="ประวัติ" secondBtn={false}/>
      <main className="p-6 tabs-menu bg-[#F8F8F8] h-full">
        <div className="mb-4 card-history">
          <Card bordered={false}>
              <div className="columns-2 flex items-center justify-between">
                <div className="block history-title">
                  <h2 className="text-color font-bold text-base" style={{overflow:"hidden",textOverflow:"ellipsis"}}>Test</h2>
                </div>
                <div className="block transaction-title">
                  <h2 className={`font-semibold text-center text-xs text-white transaction `}>Used</h2>
                </div>
                <div className="block point-title">
                  <h2 className="primary-color font-bold text-right text-base">+10 คะแนน</h2>
                </div>
              </div>
          </Card>
        </div>
      </main> 
      <FooterMenu activeMenu={3}/>
    </div>
  )
}

export default History