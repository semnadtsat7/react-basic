import { useState,useEffect } from 'react';
import './FormComponent1.css';
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props)=>{

    console.log("Render from Component")
    const [title,setTitle] = useState('')
    const [amount,setAmount]  = useState('')
    const [formValid,setFormValid] = useState('')

    const inputTitle =(event)=>{
        setTitle(event.target.value)  //ทำให้ค่าที่พิมเก็บใน title
    }
    const inputAmount =(event)=>{
        setAmount(event.target.value) //ทำให้ค่าที่พิมเก็บใน amount
    }
    const saveitem =  (event)=>{
        event.preventDefault()//ทำให้เวลากดsubmitแล้วจอรีเฟรชแล้วข้อมูลยังอยู่
        const itemData  = {  //เก็บต่า title กับ amount ที่ได้มาในนี้
            id:uuidv4(),
            title:title,
            amount:Number(amount) 
        }
        props.onAddItem(itemData) //propข้อมูลเพื่อส่งค่าไปหาแม่ note1
        setTitle('')
        setAmount(0) //หมายถึงเมื่อกด submit ส่งข้อมูลแล้วให้เปลี่ยนค่าเป็นค่าเริ่มต้น
    }

    useEffect(()=>{  //useEffectเรียกใช้เมื่อมีการเปลี่ยนแปลง state ก็คือ title กับ amount
        const checkData = title.trim().length>0 && amount !==0
        setFormValid(checkData)
    },[amount]) //useEffectตอนแรกจะแค่เรียกใช้เวลาstateปป แต่ถ่้ามีอันนี้จะเรียกใช้แค่ตอน state amount เปลี่ยนแปลง, title เปลี่ยนแปลงไม่เรียก
    
    return(
        <div>
            <form onSubmit={saveitem}>
                <div className="form__group field">
                    <input type="text" className="form__field" placeholder="ระบุชื่อรายการของคุณ" required  onChange={inputTitle} value={title}/>
                    <label className="form__label">ชื่อรายการ</label>
                </div>
                <div class="form__group field">
                    <input type="Number" className="form__field" placeholder="(+ ราบรับ , - รายจ่าย)"required onChange={inputAmount} value={amount} />
                    <label className="form__label">จำนวนเงิน</label>
                </div>


                
                <div><button type='summit' className='button-68' disabled={!formValid}>เพิ่มข้อมูล</button></div>  
            </form>
        </div>
    )
}

export default FormComponent