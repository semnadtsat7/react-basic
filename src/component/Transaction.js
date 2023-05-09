import Item from './item';
import './Transaction.css';



const Transaction = (props)=>{
    const {items} = props

return (
    <div>
        <ul className="item-list">
            {items.map((element)=>{
                return <Item {...element} key={element.id}/> // {...element} คือ การเอา prop ทั้งหมดในobject (ย่อ)
                //{...element} = title={element.title} amount={element.amount}
                //             = title amount // ชื่อ prop กับ element เหมือนกัน ย่อได้
            })}
        </ul>

        
    </div>
);}


export default Transaction