import React, { useEffect, useState } from 'react';
import img1 from './assets/product-img-2.webp'

const App = () => {

  const [count, setCount] = useState(0)

  const handleRemain=()=>{
    let oldcount = JSON.parse(localStorage.getItem('count'))
    setCount(oldcount)
  }

   const handleIncrement = ()=>{
    let newcount = count+1;
    localStorage.setItem("count",JSON.stringify(newcount))
    setCount(newcount)
   
   }

  const handleDecrement=()=>{
    if(count>0){
      let removecount = count-1;
      localStorage.setItem("count",JSON.stringify(removecount));
      setCount(removecount);
    }
  }

   useEffect(()=>{
    handleRemain()

   })


  


  return (
    <>
    <div className="main">
      <div className="card  shadow " style={{width: '20rem'}}>
  <div className="product-item">
    <img src={img1} className="card-img-top" alt="..." />
  </div>
  <div className="card-body">
    <h5 className="card-title">Gray Shoes</h5>
    <h6 className="card-subtitle mt-2 text-secondary">$50.00 <span className="ms-2 text-decoration-line-through">$100.00</span></h6>
    <p className="card-text mt-2">
    </p><div className="rating text-warning">
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star-fill" />
      <i className="bi bi-star" />
    </div>
    <p/>
    <button className=' btnfw-bold mx-2 shadow fs-5' onClick={handleDecrement}>-</button>
    <span className='mx-2 fs-5'>{count}</span>
    <button className=' btnfw-bold shadow fs-5 mx-2' onClick={handleIncrement}>+</button> <br />
    <a href className="btn cartBtn text-white w-100 mt-4">Add to cart</a>
  </div>
</div>
</div>
    </>
  );
}

export default App;
