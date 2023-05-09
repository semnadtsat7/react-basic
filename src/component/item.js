import PropTypes from 'prop-types';
import './item.css';
import DataContext from '../data/DataContext';
import { useContext } from 'react';

const Item = (props)=>{
    const {title,amount}=props
    const status = amount<0 ? "expense":"income" //หลัง ? (ทำถ้าเงื่อนไขเป็นจริง):(ทำถ้าเงื่อนไขเป็นเท็จ)
    const symbol = amount<0 ? "-":"+"
    const formatNumber=(num)=> {  //ทำให้ค่าเงินมีคอมม่าขั้น
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <li className={status}>{title}<span>{symbol}{formatNumber(Math.abs(amount))}</span>
        
        </li>
    );
}

Item.propTypes={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}
export default Item