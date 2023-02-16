import { Message } from "../models/message.js";

const findAll = async () => await Message.find();

const save = async (data) => {
  const newMessage = new Message(data);
  return await newMessage.save();
};

export {findAll, save}