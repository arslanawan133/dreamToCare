import React, { useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { CreateLocation, DeleteLocation, UpdateLocation } from '../../actions/locationsActions';
import { toast } from 'react-toastify'
import Loader from '../loader';

const Dastarkhuan = () => {
  const dispatch = useDispatch();
  const { auth, locations, isLoading } = useSelector((state) => ({
    auth: state.auth,
    isLoading: state.posts.loading,
    locations: state.locations,
  }));

  const [location, setLocation] = useState({
    _id: '',
    place: '',
    address1: '',
    address2: '',
    city: '',
    hasMap: false,
    search: ''
  });

  const handleSubmit = () => {
    const errors = isValidLocation();
    if (errors.length) {
      toast.error(errors.join(', ') + ' is required');
    } else {
      dispatch(location._id === '' ? CreateLocation(location) : UpdateLocation(location)).then(() =>
        setLocation({
          _id: '',
          place: '',
          address1: '',
          address2: '',
          city: '',
          hasMap: false,
          search: ''
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(DeleteLocation(id));
  }

  const isValidLocation = () => {
    const { address1, address2, city } = location;
    const errors = [];
    if (address1.length === 0) { errors.push('Address line #1') }
    if (address2.length === 0) errors.push('Address line #2');
    if (city.length === 0) errors.push('City');
    return errors
  }

  return (
    <div className='container py-5'>
      <div className='col-md-12'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='row'>
            {locations.length !== 0 ? locations?.map((e) => (<div key={e._id} className="col-lg-6 p-3">
              <div className='card'>
                <div className="card-header" id="heading1">
                  <h2 className={`mb-0 ${auth.isAdmin ? 'd-flex align-items-center justify-content-between' : ''}`}>
                    <button className={`location_title ${auth.isAdmin ? 'text-left' : ''}`} type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                      <h4 className={auth.isAdmin ? 'mb-0' : ''}>{e.place.toUpperCase()}</h4>
                    </button>
                    {auth.isAdmin && (<><button className='btn btn-primary mr-2' data-toggle='modal' data-target='#LocationModal' onClick={() => { setLocation({ ...location, ...e, hasMap: e.search.length !== 0 }) }}>
                      <i className='fa fa-edit'></i>
                    </button>
                      <button className='btn btn-danger' onClick={() => handleDelete(e._id)}>
                        <i className='fa fa-trash'></i>
                      </button></>)}
                  </h2>
                </div>
                <div id="collapse1" className='collapse' aria-labelledby="heading1">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    {e.address1} <br /> {e.address2} <br /> {e.city}
                    {e.search.length !== 0 && <button className='location_button' onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${e.search.split(' ').join('+')}`)}>
                      <i className='fa fa-map-marker fa-2x'></i>
                    </button>}
                  </div>
                </div>
              </div>
            </div>)) : <p>No Live Dastarkhuans</p>}
          </div>)}
        {auth.isAdmin && <div className='d-flex justify-content-center my-3'>
          <button data-toggle='modal' data-target='#LocationModal' className='theme-btn' >
            Add Location
          </button>
        </div>}
      </div>
      {auth.isAdmin && <div
        className='modal fade'
        id='LocationModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' style={{ background: '#252525' }}>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Location
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className="tp-donations-amount p-0 mb-2">
                <h2 className='text-left mb-2'>Place name</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Place Name" onChange={(e) => setLocation({ ...location, place: e.target.value })}
                  value={location.place} />
              </div>
              <div className="tp-donations-amount p-0 mb-2">
                <h2 className='text-left mb-2'>Address Line #1</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Address Line #1" onChange={(e) => setLocation({ ...location, address1: e.target.value })}
                  value={location.address1} />
              </div>
              <div className="tp-donations-amount p-0 mb-2">
                <h2 className='text-left mb-2'>Address Line #2</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Address Line #2" onChange={(e) => setLocation({ ...location, address2: e.target.value })}
                  value={location.address2} />
              </div>
              <div className="tp-donations-amount p-0 mb-2">
                <h2 className='text-left mb-2'>City</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter City" onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  value={location.city} />
              </div>
              <input type="checkbox" checked={location.hasMap} onChange={(e) => setLocation({ ...location, hasMap: !location.hasMap })} /><label className='ml-2'>Add Google Maps Link?</label>
              {location.hasMap && <div className="tp-donations-amount p-0 mt-2 mb-2">
                <h2 className='text-left mb-2'>Precise Map Location</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Precise Location on Map" onChange={(e) => setLocation({ ...location, search: e.target.value })}
                  value={location.search} />
              </div>}
            </div>
            <div className='modal-footer'>
              <button type='button' className='theme-btn-s2' data-dismiss='modal'>
                Close
              </button>
              <button type='button' className='theme-btn' data-dismiss={isValidLocation().length === 0 && 'modal'} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Dastarkhuan;
