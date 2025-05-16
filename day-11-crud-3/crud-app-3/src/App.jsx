import React, { useRef, useState } from 'react';

const App = () => {


  const [employee,setEmployee] = useState({});
  const [employeeData,setEmployeeData] = useState([]);
  const [field,setField] = useState([]);
  const [editid,setEditid] = useState(null)
   const updateRef = useRef();
  const focusRef = useRef();

  

  const handleChange=(e)=>{
    const {name,value,checked} = e.target;

    if(name === 'field')
    {
      let newfield = [...field];

      if(checked){
        newfield.push(value)
      }
      else
      {
        newfield = newfield.filter((item)=> item !== value)
      }
      setField(newfield);
      setEmployee({...employee,field: newfield})
      return;
    }

    const newdata = {...employee,[name]:value};
    setEmployee(newdata);
    console.log(newdata);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(editid === null){
      setEmployeeData([...employeeData,{...employee,id:Date.now()}])
    }
    else
    {
      let data = employeeData.map((item)=>{
        if(item.id == editid)
        {
          item = employee;
        }
        return item;
      })
      setEmployeeData(data);
      setEditid(null)
      updateRef.current.classList.remove("btn-success");
      updateRef.current.innerText = "Submit";
      updateRef.current.classList.add("btn-primary");
    }
    setEmployee({})
    setField([])
    focusRef.current.focus();
    

      }

      const handleDelete=(id)=>{
      let deleteData = employeeData.filter((val,index)=> val.id !== id)
      setEmployeeData(deleteData)
    }
    
    const handleEdit=(id)=>{
      let data = employeeData.filter((data)=> data.id === id)[0]
      setEmployee(data);
      setEditid(id);
      setField(data.field || [])
      updateRef.current.classList.add("btn-success");
      updateRef.current.innerText = "Update";
      updateRef.current.classList.remove("btn-primary");
      focusRef.current.focus();
    }
 
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form method='post' className='mt-3' onSubmit={handleSubmit}>
              <h2 className='text-center'>Employee Data</h2>
            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputEmail1" ref={focusRef} className="form-label">Employee Name</label>
              <input type="text"
               className="form-control"
                onChange={handleChange} 
                name='ename' 
                value={employee.ename || ''}
                 id="exampleInputEmail1" 
                 aria-describedby="emailHelp" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Salary</label>
              <input type="number"
               className="form-control"
                onChange={handleChange}
                name='salary'
                value={employee.salary || ''}
                id="exampleInputPassword1" />
            </div>

            <div className="checking">
              <label>Field</label> <br />
            <div className="mb-3 mt-2 form-check form-check-inline">
              <input type="checkbox"
               className="form-check-input"
                name='field'
                checked={field.includes("developer") ? true: false}
                 onChange={handleChange} 
                 value="developer" 
                 id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">developer</label>
            </div>

            <div className="mb-3 form-check form-check-inline">
              <input type="checkbox"
               className="form-check-input"
                checked={field.includes("tester")? true: false}
                 onChange={handleChange} 
                 name='field' 
                 value="tester" 
                 id="exampleCheck2" />
              <label className="form-check-label" htmlFor="exampleCheck2">Tester</label>
            </div>

            <div className="mb-3 form-check form-check-inline">
              <input type="checkbox" 
              className="form-check-input" 
              checked={field.includes("hr")? true: false} 
              onChange={handleChange} 
              name='field' 
              value="hr"  
              id="exampleCheck3" />
              <label className="form-check-label" htmlFor="exampleCheck13">Hr</label>
            </div>
            </div>

            <div className="gender">
              <label htmlFor="">Gender:</label>
             <div>
            <div className="form-check form-check-inline mt-2">
              <input className="form-check-input"  
              value="male" 
              checked={employee.gender === 'male' ? true : false}
              onChange={handleChange} 
              type="radio" 
              name="gender" 
              id="radioDefault1" />
              <label className="form-check-label" htmlFor="radioDefault1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"  
              value="female" onChange={handleChange} 
              checked={employee.gender === 'female' ? true : false}
              type="radio" 
              name="gender" 
              id="radioDefault2" />
              <label className="form-check-label" htmlFor="radioDefault2">
                Female
              </label>
            </div>
          </div>
            </div>

            <div className="textarea mt-2">
              <label htmlFor="">Address</label> <br />
              <textarea name="address"
               rows="3" 
               cols="50" 
               onChange={handleChange}
               value={employee.address || ""}
               >
                
               </textarea>
            </div>


            <div className="mb-3">
          <label htmlFor="exampleInputCity" className="form-label">
            City
          </label>

          <select
            name="city"
            id="exampleInputCity"
            className="form-select"
            onChange={handleChange}
          >
            <option selected disabled value="">
              --Select-City--
            </option>
            {[
              "Navsari",
              "Surat",
              "Daman",
            ].map((city, index) => (
              <option
                selected={employee.city == city ? true : false}
                key={index}
                value={city}
              >
                {" "}
                {city}{" "}
              </option>
            ))}
          </select>
         
        </div>
            
             <br />
            <button type="submit"  ref={updateRef} className="btn btn-primary">Submit</button>
          </form>

          </div>
        </div>
      </div>

      <div className="container-fluid w-100 mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table border table-striped">
              <thead>
                <th>Sr.no</th>
                <th>Employee</th>
                <th>Salary</th>
                <th>Field</th>
                <th>Gender</th>
                <th>Address</th>
                <th>City</th>
                <th>Action</th>
              </thead>
              <tbody>
                {
                  employeeData.map((val,index)=>{
                    const { id,ename,salary,field,gender,address,city} = val;
                    return(
                      <tr key={index}>
                        <td>{index +1}</td>
                        <td>{ename}</td>
                        <td>{salary}</td>
                        <td>{field.toString()}</td>
                        <td>{gender}</td>
                        <td>{address}</td>
                        <td>{city}</td>
                        <td>
                          <button className='btn btn-danger mx-2' onClick={()=>handleDelete(id)}>Delete</button>
                          <button className='btn btn-warning' onClick={()=>handleEdit(id)}>Edit</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
