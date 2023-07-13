import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import HeaderMobile from "../../components/header";

const ConsentForDisclosure = () => {
    return (
        <div>
            <HeaderMobile firstIcon={faChevronLeft} title="ความยินยอมในการเปิดเผยข้อมูล" secondBtn={false}/>
            <main className="p-6">
                <h2 className="font-bold">นโยบายความเป็นส่วนตัว</h2>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    มีความมุ่งมั่นในการปกป้องความเป็นส่วนตัวและข้อมูลส่วนบุคคลของลูกค้าและผู้ใช้บริการของเรานโยบายความเป็นส่วนตัวนี้อธิบายถึง
                    ประเภทของข้อมูลส่วนบุคคลที่เราเก็บรวบรวมวิธีการเก็บรวบรวมและใช้ข้อมูลนั้น และสิทธิของคุณเกี่ยวกับข้อมูลส่วนบุคคลของคุณโดยการ
                    เข้าถึงเว็บไซต์ของเราและ/หรือการใช้บริการของเรา คุณยินยอมให้เรา
                    เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของคุณตามนโยบาย
                    ความเป็นส่วนตัวนี้
                </p>

                <h3 className="font-bold text-sm mt-8">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วน
                    บุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้มครองข้อมูลส่วน
                    บุคคล พ.ศ. 2562 (PDPA) โดยบริษัทจะดำเนินการเก็บรวบรวมข้อมูล
                    ส่วนบุคคลของท่านเฉพาะเมื่อจำเป็นต่อการให้บริการและปฏิบัติ
                    ตามกฎหมาย
                </p>

                <h3 className="font-bold text-sm mt-8">2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    ข้อมูลส่วนบุคคลที่บริษัทเก็บรวบรวมจะใช้เพื่อวัตถุประสงค์ต่อไปนี้:
                    <ul className="text-sm list-disc mt-3 ps-4" style={{color:"#585858"}}>
                        <li>ให้บริการและจัดการบัญชีของท่าน</li>
                        <li>ดำเนินการตามคำขอหรือความต้องการของท่าน</li>
                        <li>วิเคราะห์และปรับปรุงการให้บริการ</li>
                        <li>อื่นๆตามกฎหมาย</li>
                    </ul>
                </p>

                <h3 className="font-bold text-sm mt-8">3. การรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทไม่มีสิทธิ์ในการเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บุคคล
                    ภายนอกยกเว้นในกรณีที่บริษัทได้รับความยินยอมจากท่านหรือเมื่อ
                    บริษัทมีหน้าที่ตามกฎหมายจะต้องเปิดเผยข้อมูล
                </p>

                <h3 className="font-bold text-sm mt-8">4. สิทธิ์ทรัพย์สินทางปัญญา</h3>
                <p className="text-sm mt-3 font-medium" style={{color:"#585858"}}>
                    บริษัทจะดำเนินการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่าน
                </p>
            </main>
        </div>
    )
}

export default ConsentForDisclosure;