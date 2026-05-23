import Dastarkhawan from '../models/liveDastarkhawan.js';

export const getLocation = async (req, res) => {
  try {
    const locations = await Dastarkhawan.find();

    res.status(200).json(locations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLocation = async (req, res) => {
  const {_id, ...location} = req.body;
  let newLocation;
  const oldLocation = await Dastarkhawan.findOne({ place: location.place });

  if (!oldLocation) {
    newLocation = new Dastarkhawan({
      ...location,
      createdAt: new Date().toISOString(),
    });
  } else {
    newLocation = await Dastarkhawan.findByIdAndUpdate(
      oldLocation._id,
      { ...location, _id: oldLocation._id },
      { new: true }
    );
  }
  try {
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  const location = req.body;
  let updatedLocation = await Dastarkhawan.findByIdAndUpdate(
    location._id,
    { ...location },
    { new: true }
  );
  try {
    await updatedLocation.save();
    res.status(201).json(updatedLocation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  let location = await Dastarkhawan.findByIdAndDelete(id);
  try {
    res.status(200).json(location);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};