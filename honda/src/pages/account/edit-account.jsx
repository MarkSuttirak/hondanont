import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import HeaderMobile from "../../components/header";
import { Input, DatePicker, Button,Form,notification, Skeleton } from "antd";
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk";

const EditAccount = () => {
  document.body.style.backgroundColor = "#F8F8F8";
  const [form] = Form.useForm();
  const [edited, isEdited] = useState(false);

  const { data: user, isLoading } = useFrappeGetDoc('Customer', 'Bonnie Yang', {
    fields: ['customer_name', 'image']
  })

  const { updateDoc } = useFrappeUpdateDoc();

  const onUpdate = (info) => {
    updateDoc('User', 'bonnie@mail.com', info)
  }

  const typeInfo = () => {
    const nameValue = document.getElementById("name");
    const idNumberValue = document.getElementById("id_number");
    const birthDateValue = document.getElementById("birth_date");
    const phoneValue = document.getElementById("phone-input");
    const emailValue = document.getElementById("emailvalues");
    if (nameValue.value != "" || idNumberValue.value != "" || birthDateValue.value != "" || phoneValue.value != "" || emailValue.value != "") {
      isEdited(true);
    } else {
      isEdited(false);
    }
  }

  const handleIDcard = (event) => {
    let input = event.target.value.replace(/-/g, ''); // remove all dashes
    if (input.length > 0) {
      let result = '';
      let parts = [1, 5, 10, 12]; // indexes where the dashes should be added
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

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title="ข้อมูลของฉัน" secondBtn={false}/>
      <main className="p-6 mb-0">
        <h2 className="font-bold">ข้อมูลส่วนตัว</h2>
        <Form form={form}>
          <label className="inline-block mt-4 text-sm">ชื่อ-นามสกุล</label>
          {!isLoading ? (
            <Form.Item name = "name" className="mb-0"> 
              <Input className="w-full mt-2 input-account" defaultValue={user && user.full_name} id="name" placeholder="ชื่อ-นามสกุล" onInput={typeInfo}/>
            </Form.Item>
          ) : (
            <Skeleton.Input size="large" active block className="mt-1"/>
          )}

          <label className="inline-block mt-4 text-sm">เลขบัตรประจำตัวบัตรประชาชน</label>
          <Form.Item name = "id_number" type="tel" className="mb-0"> 
            <Input className="w-full mt-2 input-account" placeholder="0-0000-00000-00-0" maxLength={16} onKeyUp={handleIDcard} onInput={typeInfo}/>
          </Form.Item>

          <label className="inline-block mt-4 text-sm">วันเกิด</label>
          <Form.Item name = "birth_date"> 
            <Input type="text" className="w-full mt-2 input-account"  onInput={typeInfo} disabled/>
          </Form.Item>

          <label className="inline-block mt-4 text-sm">อีเมล</label>
          {!isLoading ? (
            <Form.Item name = "emailvalues"> 
              <Input type="email" className="w-full mt-2 input-account" defaultValue={user && user.email} id="emailvalues"  placeholder="example@mail.com" onInput={typeInfo}/>
            </Form.Item>
          ) : (
            <Skeleton.Input size="large" active block className="mt-1"/>
          )}
        </Form>
      </main>
      <footer className="p-6 relative bottom-0">
        <Button onClick={onUpdate} type='submit' className={`save-btn ${edited ? "active" : "inactive"}`} disabled={edited ? false : true}>บันทึก</Button>
      </footer>
    </div>
  )
}

export default EditAccount;