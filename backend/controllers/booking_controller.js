
const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user,admin } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
      admin
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking._id);
    existingMovie.bookings.push(booking._id);
    
    await User.findByIdAndUpdate(existingUser._id, existingUser, {
      new: true,
      runValidators: true,
    });
    await Movie.findByIdAndUpdate(existingMovie._id, existingMovie, {
      new: true,
      runValidators: true,
    });

    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};
//deletebooking  baki che   
const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    const booking = await Bookings.findById(id).populate("user movie");

    const user = await User.find({ bookings: req.params.id });
   

    const session = await mongoose.startSession();
    session.startTransaction();
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
   
    await booking.user.bookings.pull(booking);
  
    const bookings = await booking.movie.bookings.pull(booking._id);
    
    // const a = await Movie.findByIdAndUpdate(booking.movie._id, booking.movie, {
    //   new: true,
    //   runValidators: true,
    // });

    console.log("kjk" + a);
    await User.findByIdAndUpdate(booking.user._id, booking.user, {
      new: true,
      runValidators: true,
    });

    // console.log(booking.movie._id);
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

module.exports = { newBooking, getBookingById, deleteBooking };
