const CalendarEntry = require('../models/CalendarEntry');

const getEntries = async (req, res) => {
  const userId = req.user.id;
  try {
    const entries = await CalendarEntry.find({ user: userId })
      .populate('attraction')
      .populate('event')
      .populate('restaurant');
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const createEntry = async (req, res) => {
  const userId = req.user.id;
  const { name, start, end, isAllDay, attraction, event, restaurant } = req.body;
  try {
    const newEntry = new CalendarEntry({
      user: userId,
      name,
      start,
      end,
      isAllDay,
      attraction,
      event,
      restaurant
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { name, start, end, isAllDay, attraction, event, restaurant } = req.body;
  try {
    const updatedEntry = await CalendarEntry.findByIdAndUpdate(
      id,
      { name, start, end, isAllDay, attraction, event, restaurant },
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteEntry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEntry = await CalendarEntry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry
};
