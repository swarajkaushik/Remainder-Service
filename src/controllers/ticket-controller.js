const TicketService = require("../service/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully registered an email remainder",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      err: error,
      message: "Unable to register the email notification",
    });
  }
};

module.exports = {
  create,
};
