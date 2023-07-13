import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HeaderMobile from "../../components/header";

const MemberCondition = () => {
    return (
        <div>
            <HeaderMobile firstIcon={faChevronLeft} title="เงื่อนไขระดับของสมาชิก" secondBtn={false}/>
            <main className="p-6">
                <h2 className="font-bold">เงื่อนไขระดับของสมาชิก</h2>
                <h3 className="font-bold text-sm mt-6">1. Classic</h3>
                <ul className="text-sm list-disc mt-3 ps-4" style={{color:"#585858"}}>
                    <li>ค่าใช้จ่าย: 1 - 10,000 บาท</li>
                    <li>จำนวนการเข้าบริการ: -</li>
                </ul>

                <h3 className="font-bold text-sm mt-6">2. Silver</h3>
                <ul className="text-sm list-disc mt-3 ps-4" style={{color:"#585858"}}>
                    <li>ค่าใช้จ่าย: 10,001 - 30,000 บาท</li>
                    <li>จำนวนการเข้าบริการ: อย่างน้อย 2 ครั้ง/ปี</li>
                </ul>

                <h3 className="font-bold text-sm mt-6">3. Gold</h3>
                <ul className="text-sm list-disc mt-3 ps-4" style={{color:"#585858"}}>
                    <li>ค่าใช้จ่าย: 30,001 - 60,000 บาท</li>
                    <li>จำนวนการเข้าบริการ: อย่างน้อย 2 ครั้ง/ปี</li>
                </ul>

                <h3 className="font-bold text-sm mt-6">4. Platinum</h3>
                <ul className="text-sm list-disc mt-3 ps-4" style={{color:"#585858"}}>
                    <li>ค่าใช้จ่าย: 60,001 บาท ขึ้นไป</li>
                    <li>จำนวนการเข้าบริการ: อย่างน้อย 2 ครั้ง/ปี</li>
                </ul>
            </main>
        </div>
    )
}

export default MemberCondition;