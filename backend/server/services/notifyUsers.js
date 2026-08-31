import cron from "node-cron";
import { User } from "../models/userModel.js";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      console.log("notifyUsers cron: job triggered");
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo },
        returnDate: null,
        notified: false,
      });

      for (const element of borrowers) {
        if (element.user && element.user.email) {
          const user = await User.findById(element.user.id);
          const recipientEmail = user?.email || element.user.email;

          await sendEmail({
            email: recipientEmail,
            subject: "Book Return Reminder",
            message: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for return today.`,
          });

          element.notified = true;
          await element.save();
          console.log(`Email sent to ${element.user.name}`);
        }
      }
    } catch (error) {
      console.error("Error while notifying users:", error);
    }
  });
};