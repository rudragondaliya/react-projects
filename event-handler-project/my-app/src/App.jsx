import React, { useRef, useState} from 'react';

const App = () => {
  const [employee, setEmployee] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [field, setField] = useState([]);
  const [editid, setEditid] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const updateRef = useRef();
  const focusRef = useRef();
  const toastRef = useRef();

  const showToast = (message) => {
    const toastEl = toastRef.current;
    toastEl.querySelector('.toast-body').textContent = message;
    const toast = new window.bootstrap.Toast(toastEl);
    toast.show();
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'field') {
      let newfield = [...field];
      if (checked) {
        newfield.push(value);
      } else {
        newfield = newfield.filter((item) => item !== value);
      }
      setField(newfield);
      setEmployee({ ...employee, field: newfield });
      return;
    }

    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee.ename || !employee.salary) {
      showToast('Please fill Employee Name and Salary!');
      return;
    }

    if (editid === null) {
      setEmployeeData([...employeeData, { ...employee, id: Date.now() }]);
      showToast('Employee added successfully!');
    } else {
      const updatedData = employeeData.map((item) =>
        item.id === editid ? employee : item
      );
      setEmployeeData(updatedData);
      setEditid(null);
      updateRef.current.classList.remove('btn-success');
      updateRef.current.innerText = 'Submit';
      updateRef.current.classList.add('btn-primary');
      showToast('Employee updated successfully!');
    }

    setEmployee({});
    setField([]);
    focusRef.current.focus();
  };

  const handleDelete = (id) => {
    const updatedData = employeeData.filter((val) => val.id !== id);
    setEmployeeData(updatedData);
    showToast('Employee deleted!');
  };

  const handleEdit = (id) => {
    const data = employeeData.find((data) => data.id === id);
    setEmployee(data);
    setEditid(id);
    setField(data.field || []);
    updateRef.current.classList.add('btn-success');
    updateRef.current.innerText = 'Update';
    updateRef.current.classList.remove('btn-primary');
    focusRef.current.focus();
  };

  const toggleDarkMode = () => 
  setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-dark bg-primary'}`}>
        <div className="container d-flex align-items-center">
          <a className="navbar-brand" href="/">
            Employee Manager
          </a>
          <div className="container mt-3 d-flex justify-content-end">
          <button
          type="button"
          onClick={toggleDarkMode}
          className={`btn mb-2 p-2 btn-${darkMode ? 'light' : 'dark'} btn-sm`}
            >
           
              
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </label>
             </button>
          </div>
        </div>
      </nav>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">


            <div className={`card shadow-sm mb-5 ${darkMode ? 'bg-secondary text-light' : ''}`}>
              <div className="card-body">
                <h3 className="card-title text-center mb-4">Employee Data</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="ename" ref={focusRef} className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ename"
                      name="ename"
                      value={employee.ename || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="salary" className="form-label">
                      Salary
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="salary"
                      name="salary"
                      value={employee.salary || ''}
                      onChange={handleChange}
                    />
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

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      className="form-control"
                      value={employee.address || ''}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      className="form-select"
                      value={employee.city || ''}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        --Select-City--
                      </option>
                      {['Navsari', 'Surat', 'Daman'].map((city, i) => (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    ref={updateRef}
                    className="btn btn-primary w-100"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Table Card */}
            <div className={`card shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}>
              <div className="card-body">
                <h4 className="card-title mb-3">Employee List</h4>
                <div className="table-responsive">
                  <table className={`table ${darkMode ? 'table-dark table-bordered' : 'table-striped table-bordered'}`}>
                    <thead className={darkMode ? 'table-dark' : 'table-primary'}>
                      <tr>
                        <th>Sr.no</th>
                        <th>Employee</th>
                        <th>Salary</th>
                        <th>Field</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeData.map((val, index) => {
                        const { id, ename, salary, field, gender, address, city } = val;
                        return (
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{ename}</td>
                            <td>{salary}</td>
                            <td>{field?.toString()}</td>
                            <td>{gender}</td>
                            <td>{address}</td>
                            <td>{city}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => handleDelete(id)}
                                title="Delete"
                              >
                               Delete
                              </button>
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEdit(id)}
                                title="Edit"
                              >
                               Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {employeeData.length === 0 && (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No employees found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        ref={toastRef}
       className={`toast position-fixed bottom-0 end-0 m-3 ${darkMode ? 'bg-dark text-white' : ''}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-delay="2000"
      >
        <div className={`toast-header ${darkMode ? 'bg-secondary text-white' : ''}`}>
          <strong className="me-auto">Notification</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body"></div>
      </div>
    </div>
  );
};

export default App;



