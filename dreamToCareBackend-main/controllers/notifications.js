import PostModel from '../models/posts.js';
import QueryModel from '../models/query.js'
import Notifications from '../models/notifications.js';
import UserModel from '../models/user.js';
// import OneSignal from 'onesignal-node';
import moment from 'moment';
import { getIO, getSockets } from './socketIO.js';

export const getNotification = async (req, res) => {
  try {
    let startDate = moment().subtract(1, 'd').toDate();
    let endDate = moment().toDate();

    if (!!req.query.byWeek) {
      startDate = moment().subtract(7, 'd').toDate();
    } else if (!!req.query.byMonth) {
      startDate = moment().subtract(30, 'd').toDate();
    }

    const notifications = await Notifications.find({
      "notificationFor": req.user._id,
      "createdAt": {
        $gt: startDate,
        $lte: endDate
      }
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  // const client = new OneSignal.Client(
  //   'b0d393b2-4b28-4f63-b073-860410951463',
  //   'MWFkN2RlMmMtMDQ4Mi00ZmRjLWJlMzctNTM5NjZhZGU4Nzg2'
  // );
  const { receiverId, amount } = req.body;
  const donor = req.user;
  const admin = await UserModel.findOne({ status: 'admin' });
  const receiver = await UserModel.findOne({ _id: receiverId });
  const notificationForDonor = `your payment has been received by our support team and receiver will get Rs.${amount} in 3 days`;
  const notificationForReceiver = `${donor.name.toUpperCase()} has sent Rs.${amount} for you to our support team and now this Rs.${amount} will be forwarded to you in 3 days`;
  const notificationForAdmin = `you have received Rs.${amount} from ${donor.name.toUpperCase()} for <a href="javascript:void(0);" class="receiver" uid="${receiver._id}" uname="${receiver.name}" uemail="${receiver.email}">${receiver.name.toUpperCase()}</a> now complete the process and forward this amount to ${receiver.name.toUpperCase()}`;

  const messageForDonor = new Notifications({
    message: notificationForDonor,
    notificationFor: donor._id,
    createdAt: new Date().toISOString(),
  });
  const messageForReceiver = new Notifications({
    message: notificationForReceiver,
    notificationFor: receiverId,
    createdAt: new Date().toISOString(),
  });
  const messageForAdmin = new Notifications({
    message: notificationForAdmin,
    notificationFor: admin?._id,
    createdAt: new Date().toISOString(),
  });

  const io = getIO();
  const sockets = getSockets();
  let donorSocketId = sockets.find(socket => socket.handshake.query.userId == donor._id)?.id;
  let adminSocketId = sockets.find(socket => socket.handshake.query.userId == admin._id)?.id;
  let receiverSocketId = sockets.find(socket => socket.handshake.query.userId == receiver._id)?.id;
  io.to(donorSocketId).to(adminSocketId).to(receiverSocketId).emit('notificationReceived', true);
  // console.log(donor.playerId, admin.playerId, receiver.playerId)
  // const pushNotification = {
  //   contents: {
  //     en: 'New notification received, Please check your notifications...',
  //   },
  //   include_player_ids: [donor.playerId, admin.playerId, receiver.playerId],
  // };

  try {
    await messageForDonor.save();
    await messageForReceiver.save();
    await messageForAdmin.save();
    const notification = await Notifications.find({ "notificationFor": { $eq: req.user._id } });
    // client
    //   .createNotification(pushNotification)
    //   .then((res) => console.log(res.body))
    //   .catch((err) => console.log('Something went wrong...', err));
    res.status(201).json(notification);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const reportPost = async (req, res) => {
  const { user: reporter, params: { id, type } } = req;
  const admin = await UserModel.findOne({ status: { $eq: 'admin' } });
  const notificationForAdmin = `A ${type} is reported with ID: <a href="/post/${id}">${id}.</a>`;

  switch (type) {
    case 'post': {
      await PostModel.findByIdAndUpdate(id, { $push: { reportIds: reporter._id } });
    }
    case 'query': {
      await QueryModel.findByIdAndUpdate(id, { $push: { reportIds: reporter._id } });
    }
  }

  const messageForAdmin = new Notifications({
    message: notificationForAdmin,
    notificationFor: admin._id,
    createdAt: new Date().toISOString(),
  });

  try {
    const io = getIO();
    const sockets = getSockets();
    let adminSocketId = sockets.find(socket => socket.handshake.query.userId == admin._id)?.id;
    io.to(adminSocketId).emit('notificationReceived', true);
    await messageForAdmin.save();
    res.status(200).json({ message: 'Successfully reported this post!' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
