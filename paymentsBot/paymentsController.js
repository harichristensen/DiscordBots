'use strict'
const paypal = require('paypal-rest-sdk');
class paymentsController {
  constructor (msg) {
    this.PAYPAL_RETURN_URL = `https://www.paypal.com/myaccount/summary`
    this.PAYPAL_CANCEL_URL = `https://www.paypal.com/myaccount/summary`
    this.msg = msg
    paypal.configure({
      mode: 'sandbox',
      client_id: process.env['PAYPAL_CLIENT_ID'],
      client_secret: process.env['PAYPAL_CLIENT_SECRET']
    })
  }



  async getPayPalSuccess ({request, session, view}) {
    const paymentId = session.get('paymentId')
    const paymentDetails = { payer_id: request.input('PayerID') }
    try {
      await this.getPayPalSuccessDetails(paymentId, paymentDetails)
      this.msg.reply("Success 1")
      return view.render('api.paypal', { result: true, success: true })

    } catch (e) {
      console.log('error', e.message)
      return view.render('api.paypal', { result: true, success: false })
    }
  }

  async getPayPalCancel ({view, session}) {
    session.forget('paymentId')
    return view.render('api.paypal', { result: true, canceled: true })
  }

  getPayPalSuccessDetails(paymentId, paymentDetails){
    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, paymentDetails, (err) => {
        if (err) {
          return reject(err)
        }
        this.msg.reply("Success 2")
        return resolve({success: true})
      })
    })
  }

  getPaymentDetails(description, amount, currency) {
    return {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: this.PAYPAL_RETURN_URL,
        cancel_url: this.PAYPAL_CANCEL_URL
      },
      transactions: [{
        description: description,
        amount: {
          currency: currency,
          total: amount
        }
      }]
    }
  }

  createPaypalPayment (msg, description, amount, currency) {
    return new Promise((resolve, reject) => {
      paypal.payment.create(this.getPaymentDetails(description, amount, currency), (err, payment) => {
        if (err) {
          return reject(err)
        }
        const links = payment.links
        const string = links[1]['href']
        this.msg = msg
        msg.reply(string)
        for (let i = 0; i < links.length; i++) {
          if (links[i].rel === 'approval_url') {
            return resolve({
              approvalUrl: links[i].href,
              paymentId: payment.id
            })
          }
        }
      })
    })
  }

}
module.exports = paymentsController