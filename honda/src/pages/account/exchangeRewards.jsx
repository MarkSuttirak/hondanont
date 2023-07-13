import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HeaderMobile from "../../components/header";

const ExchangeRewards = () => {
    return (
        <div>
            <HeaderMobile firstIcon={faChevronLeft} title="วิธีแลกของรางวัล" secondBtn={false}/>
            <main className="p-6">
                <h2 className="font-bold">ขั้นตอนในการแลกของรางวัลมีดังนี้</h2>
                <h3 className="font-bold text-sm mt-4">1. เลือกรางวัลที่ต้องการแลก</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วน
                    บุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้มครองข้อมูลส่วน
                    บุคคล พ.ศ. 2562 (PDPA) โดยบริษัทจะดำเนินการเก็บรวบรวมข้อมูล
                </p>

                <h3 className="font-bold text-sm mt-8">2. กดใช้คูปอง</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วน
                    บุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้มครองข้อมูลส่วน
                    บุคคล พ.ศ. 2562 (PDPA) โดยบริษัทจะดำเนินการเก็บรวบรวมข้อมูล
                </p>

                <h3 className="font-bold text-sm mt-8">3. นำ QR Code ที่ได้ให้พนักงานสแกน ณ จุดให้บริการ</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วน
                    บุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้มครองข้อมูลส่วน
                    บุคคล พ.ศ. 2562 (PDPA) โดยบริษัทจะดำเนินการเก็บรวบรวมข้อมูล
                </p>
            </main>
        </div>
    )
}

export default ExchangeRewards;