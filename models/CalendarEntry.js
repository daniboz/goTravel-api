const mongoose = require('mongoose');
const { Schema } = mongoose;

const calendarEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  start: { type: Date },
  end: { type: Date },
  isAllDay: { type: Boolean, default: false },
  attraction: { type: Schema.Types.ObjectId, ref: 'Attraction' },
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
}, { timestamps: true });

module.exports = mongoose.model('CalendarEntry', calendarEntrySchema);
