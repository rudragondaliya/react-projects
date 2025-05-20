import React, { useState,useEffect } from 'react';
import logo from './assets/bookmyshow-logo.png'
import { CiMenuBurger } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import poster from './assets/raid-post.avif'
import Form from './components/Form';
import Card from './components/Card';


const App = () => {

     const [hover,setHover] = useState(0);
     const [star,setStar] = useState(0);
     const [list,setList] = useState([]);
     const [feedback,setFeedback] = useState({})


    useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("list")) || [];
    setList(savedList);
  }, []);
  
    useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

     const handleHover=(idx)=>{
      setHover(idx)
      if(star != 0){
        setStar(0)
      }
     }

     const handleLeave=(idx)=>{
         setHover(0)
         setStar(idx)
     }

     const handleDown=(idx)=>{
      setStar(idx)
     }

     const handleSubmit=(e)=>{
       e.preventDefault()
       setList([...list,{...feedback,id:Date.now(),star : star}])
       setFeedback({});
       alert("ThankYou For Your feedback..")
     }

    const handleChange=(e)=>{
      const {name,value} = e.target;
      setFeedback({...feedback,[name]:value})
    }

    const handleDelete=(id)=>{
        let cardData = list.filter((val)=> val.id !== id);
        setList(cardData)
    }
     

  return (
    <>
      <div className="container-fluid p-0">
              <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <a className="navbar-brand" href="#"> <span><img src={logo} alt="" width="120px" className='navbar-logo' /></span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <form className="d-flex w-50" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
             
            <li className="nav-item dropdown">
            <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Navsari
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="#">Valsad</a></li>
              <li><a className="dropdown-item" href="#">Vapi action</a></li>
              <li><a className="dropdown-item" href="#">Surat</a></li>
            </ul>
          </li>

              <li className='mx-3'>
                <button className='btn sign-btn'>Sign in</button>
              </li>
              <li>
                <CiMenuBurger />
              </li>
             
            </ul>
          
          </div>
        </div>
      </nav>

      <div className="links-menu bg-body-tertiary ">
        <div className="container d-flex align-items-center justify-content-between">
          <ul className='list-unstyled d-flex align-items-center mt-2 gap-3'>
            <li>Movies</li>
            <li>Stream</li>
            <l>Events</l>
            <li>Plays</li>
            <li>Sports</li>
            <li>Activites</li>
          </ul>

          <ul className='list-unstyled d-flex align-items-center mt-2 gap-3'>
            <li>ListYourShow</li>
            <li>Corporates</li>
            <li>Offers</li>
            <li>Gift Cards</li>
          </ul>
  
        </div>
      </div>

      </div>


      <div className="banner px-5">
  <div className="container">
    <div className="row align-items-center">

      <div className="col-md-3 mb-4 mb-md-0">
        <img src={poster} alt="Raid 2 Poster" className="poster-img" />
        <p className="text-center mt-2 text-info">In cinemas</p>
      </div>
  
      <div className="col-md-9">
        <h1 className="fw-bold">Raid 2</h1>
       
        <div className="d-flex align-items-center gap-3 my-3">
          <div className="rating-box text-white">
             {
               [...Array(5).keys()].map((_,idx)=>(
                <FaStar key={idx} size={20}
                color={hover > idx || star > idx ? 'FF355E' : 'gray'}
                onMouseOver={()=>handleHover(idx+1)}
                onMouseLeave={()=>handleLeave(idx+1)}
                onMouseDown={()=>handleDown(idx+1)}
                
                />
               ))
             }
          </div>
          <button className="btn btn-light btn-sm">Rate now</button>
          <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Review Here</button>
        </div>

      

        



        <div className="mb-3">
          <span className="badge bg-light text-dark me-2">2D, ICE</span>
          <span className="badge bg-light text-dark">Hindi</span>
        </div>
 
        <p>2h 19m • Drama, Thriller • UA13+ • 1 May, 2025</p>

        <button className="btn btn-pink px-4 py-2 text-white">Book tickets</button>
      </div>
    </div>
  </div>
</div>

  <section className='abMovie p-5'>
    <div className="container-fluid">
      <div className="ab-txt">
        <h3 className='text-black fw-semibold'>About This Movie</h3>
        <p className='fw-medium fs-6 mt-3'>A fiery Income Tax officer, Amay Patnaik, confronts the corrupt nexus in Bhoj. Beneath the veneer of honesty lies a sinister <br /> operation tied to Dada Bhai, a revered politician. As Amay unravels layers of deceit buried in fields and fortresses, one question <br /> looms: will justice prevail, or will power silence the truth?</p>
      </div>
    </div>
  </section>

   <hr />

  <section className='reviews-section p-5'>
    <div className="container-fluid">
      <div className="reviews bo">
            <h3 className='text-black fw-semibold'>Top reviews</h3>
            <small>Your Feedback will be seen here...</small>
            <div className="card-area mt-2">
              <div className="card-list p-2 d-flex align-items-center gap-3 flex-wrap">
                <Card
                  list={list}
                  star={star}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
      </div>
    </div>
  </section>

    <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        list={list}
        feedback={feedback}
      />

    </>
  );
}





export default App;
