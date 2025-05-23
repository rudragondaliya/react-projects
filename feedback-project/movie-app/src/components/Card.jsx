import React from 'react';
import { FaStar } from 'react-icons/fa';
import { CiShare2 } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

const Card = ({list,star,handleDelete,id}) => {
  return (
    <>
      {
        list.map((val,idx)=>{
            const {username,message,feel} = val;
          return(
            <div className="card" style={{width: '20rem', height:"200px"}}>
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary mt-2">{
                    
                    [...Array(5).keys().map((_,idx)=>(
                        <FaStar 
                        key={idx}
                        color={val.star > idx ? "#FF355E" : "grey"}
                         size={20}
                        />
                    ))]

                    }</h6>

                  <h5>#{feel}</h5>
                <p className="card-text"> <small>{message}</small></p>
                <div className='d-flex gap-2'>
                  <p>Did you find it helpful?</p>
                <a href="#" className="card-link text-decoration-none ms-1">Yes</a>
                <a href="#" className="card-link text-decoration-none">No</a>
                <FaTrash  key={idx} color='FF355E' className='ms-3' onClick={()=>handleDelete(val.id)} size={20}/>
                </div>

                

                
            </div>
            </div>

          )

        })
      }
    </>
  );
}

export default Card;
