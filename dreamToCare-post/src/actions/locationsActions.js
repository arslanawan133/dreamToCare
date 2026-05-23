import { toast } from 'react-toastify';
import { deleteLocation, getLocations, postLocations, updateLocation } from '../api/locationsApi';
import { startLoadingAction, stopLoadingAction } from './postAction';

const getLocationsAction = (payload) => {
  return {
    type: 'GET_LOCATIONS',
    payload,
  };
};

const createLocationAction = (payload) => {
  return {
    type: 'CREATE_LOCATION',
    payload,
  };
};

const updateLocationAction = (payload) => {
  return {
    type: 'UPDATE_LOCATION',
    payload,
  };
};

const deleteLocationAction = (payload) => {
  return {
    type: 'DELETE_LOCATION',
    payload,
  };
};

export const GetLocation = () => async (dispatch) => {
  const location = await getLocations();
  dispatch(startLoadingAction());
  if (location.status === 200) {
    dispatch(getLocationsAction(location.data));
    dispatch(stopLoadingAction());
  }
};

export const CreateLocation = (data) => async (dispatch) => {
  try {
    const location = await postLocations(data);
    if (location.status === 201) {
      dispatch(createLocationAction(location.data));
      toast.success('Location added successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const UpdateLocation = (data) => async (dispatch) => {
  try {
    const location = await updateLocation(data);
    if (location.status === 201) {
      dispatch(updateLocationAction(location.data));
      toast.success('Location updated successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const DeleteLocation = (id) => async (dispatch) => {
  try {
    const location = await deleteLocation(id);
    if (location.status === 200) {
      dispatch(deleteLocationAction(location.data));
      toast.success('Location deleted successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};