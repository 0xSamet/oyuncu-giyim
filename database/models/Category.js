import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    sortOrder: {type: Number, required: true, default: 0}
});

export default models.Category || model("Category", categorySchema);