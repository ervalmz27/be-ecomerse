const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { checkoutService } = require('../services');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const ceckoutApi = catchAsync(async (req, res) => {
  const sender = {
    email: process.env.EMAIL_TOKO,
    name: 'Toko mu',
  };
  const receivers = [
    {
      email: req.body.email,
    },
  ];
  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Checkout Product',
    textContent: `
        Terimakasih Telah bertransaksi bersama kami.
        `,
    //   htmlContent: `
    //     <h1>Cules Coding</h1>
    //     <a href="https://cules-coding.vercel.app/">Visit</a>
    //             `,
  });
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: [
        {
          email: process.env.EMAIL_MYTOKO,
        },
      ],
      subject: 'Checkout Product',
      textContent: `
        ${req.body.email} Telah melakukan chekout ${req.body.product}.
        `,
      //   htmlContent: `
      //     <h1>Cules Coding</h1>
      //     <a href="https://cules-coding.vercel.app/">Visit</a>
      //             `,
    })
    .then(console.log)
    .catch(console.log);
  const result = await checkoutService.ceckoutApi(req.body);
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  ceckoutApi,
};
