const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/order", async (req, res) => {
  console.log(req.body);
  const { products, pib, phone, mail, city, post, messenger, payment, note } =
    req.body;
  const sum = products.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );
  const productsHtml = products.map(
    (product) => `
      <tr>
        <td style="width: 30%;">
          <img 
          style="width: 100%; object-fit: cover;"
          src="${product.miniature || product.photos[0]}" 
          />
        </td>
        <td style="padding-left: 10px">
          <p>${product.name}</p>
          <p>Код: ${product.code}</p>
          <p>Ціна: ${product.price} ₴</p>
        </td>
      <tr>
  `
  );

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: "Felted Fluffies <felted.fluffies@gmail.com>",
      to: "felted.fluffies@gmail.com",
      subject: "Замовлення",
      html: `
      <div style="width: 500px; margin: 0 auto;">
        <div style="width: 100%; text-align: center">
          <img
            style="width: 500px"
            src="https://drive.google.com/uc?id=1ptUKsS1yGxoWTMtoIRmCNB7QO0pLI_Kw"
          />
        </div>

        <div style="width: 100%">
        <table style={{ width: "100%" }}>
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">ПІБ:</td>
            <td style="padding-left: 10px">${pib}</td>
          </tr>
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Телефон:</td>
            <td style="padding-left: 10px">${phone}</td>
          </tr>
          ${Boolean(mail.length) ? 
            `<tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Електронна пошта:</td>
              <td style="padding-left: 10px">${mail}</td>
            </tr>`
           : ""}
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Місто:</td>
            <td style="padding-left: 10px">${city}</td>
          </tr>
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Відділення/поштомат Нової Пошти:</td>
            <td style="padding-left: 10px">${post}</td>
          </tr>
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Месенджер для звя'зку:</td>
            <td style="padding-left: 10px">
              ${messenger.telegram ? "Telegram " : ""}
              ${messenger.viber ? "Viber" : ""}
            </td>
          </tr>
          <tr>
            <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Спосіб оплати:</td>
            <td style="padding-left: 10px">
              ${payment.card ? "Картка ПриватБанку" : ""}
              ${payment.cash ? "Накладений платіж" : ""}
            </td>
          </tr>
          ${Boolean(note.length) ?
            `<tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Коментар до замовлення:</td>
              <td style="padding-left: 10px">${note}</td>
            </tr>`
          : ""}
        </table>
      
      <hr />
        <table>
          ${productsHtml.join("")}
        </table>
      <hr />
      <p style="text-align: right;">Всього: <b>${sum} ₴</b></p>
      <hr />
        </div>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    if (Boolean(mail) && mail.includes("@")) {
      var mailOptions = {
        from: "Felted Fluffies <felted.fluffies@gmail.com>",
        to: mail,
        subject: "Інформація про ваше замовлення Felted Fluffies",
        html: `
          <div style="width: 500px; margin: 0 auto;">
          <div style="width: 100%; text-align: center">
            <img
              style="width: 500px"
              src="https://drive.google.com/uc?id=1ptUKsS1yGxoWTMtoIRmCNB7QO0pLI_Kw"
            />
          </div>

          <div style="width: 100%">
          <table style={{ width: "100%" }}>
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">ПІБ:</td>
              <td style="padding-left: 10px">${pib}</td>
            </tr>
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Телефон:</td>
              <td style="padding-left: 10px">${phone}</td>
            </tr>
            ${Boolean(mail.length) ? 
              `<tr>
                <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Електронна пошта:</td>
                <td style="padding-left: 10px">${mail}</td>
              </tr>`
            : ""}
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Місто:</td>
              <td style="padding-left: 10px">${city}</td>
            </tr>
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Відділення/поштомат Нової Пошти:</td>
              <td style="padding-left: 10px">${post}</td>
            </tr>
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Месенджер для звя'зку:</td>
              <td style="padding-left: 10px">
                ${messenger.telegram ? "Telegram " : ""}
                ${messenger.viber ? "Viber" : ""}
              </td>
            </tr>
            <tr>
              <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Спосіб оплати:</td>
              <td style="padding-left: 10px">
                ${payment.card ? "Картка ПриватБанку" : ""}
                ${payment.cash ? "Накладений платіж" : ""}
              </td>
            </tr>
            ${Boolean(note.length) ?
              `<tr>
                <td style="width: 30%; color: rgba(0, 0, 0, 0.6); padding: 5px 0;">Коментар до замовлення:</td>
                <td style="padding-left: 10px">${note}</td>
              </tr>`
            : ""}
          </table>
        
        <hr />
          <table>
            ${productsHtml.join("")}
          </table>
        <hr />
        <p style="text-align: right;">Всього: <b>${sum} ₴</b></p>
        <hr />
          </div>
        </div>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
