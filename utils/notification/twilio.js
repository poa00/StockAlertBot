import Twilio from 'twilio';
import fs from "fs";
import moment from 'moment';
import config from "../config.js";
import { SMS_TWILIO } from '../../main.js'

const twilio = config.twilio;

export default async function sendAlertToTwilio(product_url, title, store) {
	if (SMS_TWILIO) {
		if (!fs.existsSync('.env')) {
			console.error(moment().format('LTS') + ": Error sending twilio alert, rename example.env file to .env")
		}
		else if (twilio.sid == "" || twilio.auth == "" || twilio.from == "" || twilio.to == "") {
			console.error(moment().format('LTS') + ": Error sending twilio alert, open and edit .env file")
		} else {
			console.info(moment().format('LTS') + ": Sending twilio alert")

			try {
				var client = new Twilio(twilio.sid, twilio.auth);
				client.messages.create({
					from: twilio.from,
					to: twilio.to,
					body: `***** In Stock at ${store} ***** \n\n${title} \n\n${product_url} \n\nStockAlertBot | ${moment().format('MMM Do YYYY - h:mm:ss A')}`,
				});
			} catch (error) {
				console.error(moment().format('LTS') + ": Error sending twilio alert", error)
			}
		}
	}	
}