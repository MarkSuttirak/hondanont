import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import HeaderMobile from "../../components/header";
import { Input, Button, Skeleton, FormControl, FormLabel } from "@chakra-ui/react";
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk";

const EditAccount = () => {
  document.body.style.backgroundColor = "#F8F8F8";

  const [edited, isEdited] = useState(false);

  const { data: user, isLoading } = useFrappeGetDoc('Contact', 'Bonnie Yang', {
    fields: ['name', 'email']
  })

  const { updateDoc } = useFrappeUpdateDoc();

  const onUpdate = (info) => {
    updateDoc('Customer', 'Bonnie Yang', info)
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
          <FormControl name="name">
            <FormLabel className="inline-block mt-4" fontSize="14px" mb={0}>ชื่อ-นามสกุล</FormLabel>
            {!isLoading ? (
              <Input variant="unstyled" bgColor="white" className="w-full mt-1 input-account" p="10px" fontSize="14px" defaultValue={user && user.customer_name} id="name" placeholder="ชื่อ-นามสกุล" onInput={typeInfo}/>
            ) : (
              <Skeleton height='40px' className="mt-1"/>
            )}
          </FormControl>

          <FormControl name="id_number">
            <FormLabel className="inline-block mt-4" fontSize="14px" mb={0}>เลขบัตรประจำตัวบัตรประชาชน</FormLabel>
            <Input variant="unstyled" bgColor="white" className="w-full mt-1 input-account" p="10px" fontSize="14px" placeholder="0-0000-00000-00-0" maxLength={16} onKeyUp={handleIDcard} onInput={typeInfo}/>
          </FormControl>

          <FormControl name="birth_date">
            <FormLabel className="inline-block mt-4" fontSize="14px" mb={0}>วันเกิด</FormLabel>
            <Input variant="unstyled" bgColor="white" type="text" className="w-full mt-1 input-account" p="10px" fontSize="14px" onInput={typeInfo} disabled/>
          </FormControl>

          <FormControl name='email'>
            <FormLabel className="inline-block mt-4" fontSize="14px" mb={0}>อีเมล</FormLabel>
            {!isLoading ? (
              <Input variant="unstyled" bgColor="white" type="email" className="w-full mt-1 input-account" p="10px" fontSize="14px" defaultValue={user && user.email} id="emailvalues"  placeholder="example@mail.com" onInput={typeInfo}/>
            ) : (
              <Skeleton height='40px' className="mt-1"/>
            )}
          </FormControl>
      </main>
      <footer className="p-6 relative bottom-0">
        <Button onClick={onUpdate} type='submit' className={`save-btn ${edited ? "active" : "inactive"}`} disabled={edited ? false : true}>บันทึก</Button>
      </footer>
    </div>
  )
}

export default EditAccount;