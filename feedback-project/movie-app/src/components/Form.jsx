import React from 'react';

const Form = ({handleChange,handleSubmit,feedback}) => {
  return (
    <>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form method='post' onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                    <input type="text" className="form-control" name="username" onChange={handleChange} value={feedback.username || ''} id="username" />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor="recipient-name" className="col-form-label">Experience:</label>
                    <input type="text" className="form-control" name="feel" onChange={handleChange} value={feedback.feel || ''} id="feel" />
                  </div>
                 

                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">Review:</label>
                    <textarea className="form-control" name='message' onChange={handleChange} value={feedback.message || ''} id="message-text" defaultValue={""} />
                  </div>
                   <button type="submit" data-bs-dismiss="modal" className="btn btn-primary w-100 border-0 review-btn">Send message</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark " data-bs-dismiss="modal">Close</button>
               
              </div>
            </div>
          </div>
        </div>



    </>
  );
}

export default Form;
