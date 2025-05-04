


function messageClient(products, name, clientMessage, mID) {
    const message1 = `<h1 style="font-family: Arial, sans-serif; font-size: 24px; color: #333;">Thank you for your message!</h1>
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Dear `+ name + `,</p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">We have received your favourites product list and will get in touch with you within 2 days. Our aim is to respond within 24 hours to deliver the highest quality service to you. We appreciate your trust in Meloverseland and are excited to provide you with the best K-pop products.</p>
    <h2 style="font-family: Arial, sans-serif; font-size: 20px; color: #333;">Products Details</h2>
    <table style="font-family: Arial, sans-serif; font-size: 16px; color: #333; border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 8px; text-align: left;">Product Name</th>
          <th style="border: 1px solid #ccc; padding: 8px; text-align: center;">Price</th>
        </tr>
      </thead>
      <tbody>`;
    let message2 = "";
  
    for (const product of products) {
      message2 += `
        <tr>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: left;">${product.nom}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">€${parseFloat(product.price).toFixed(2)}</td>
        </tr>`;
    }
  
    const message3 = `</tbody>
    </table>
    <h2 style="font-family: Arial, sans-serif; font-size: 20px; color: #333;">Your Message</h2>
    <div style="border: 1px solid #ccc; padding: 8px; font-family: Arial, sans-serif; font-size: 16px; color: #333;">${clientMessage}</div>
  
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">If you have any questions or need further assistance, please don't hesitate to contact us via Instagram at <a href="https://instagram.com/meloverseland" >@Meloverseland</a> or reply to this email. When contacting us, please use the following message ID: <strong>${mID}</strong>.</p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Thank you for choosing MeloverseLand, and we hope you enjoy your K-pop products!</p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Best regards,</p>
    <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">The Meloverseland Team</p>
    <hr>
    <p style="font-family: Arial, sans-serif; font-size: 14px; color: #999;"><em>Confidentiality Disclaimer:</em> This email and any attachments are confidential and intended solely for the use of the individual to whom it is addressed. If you are not the intended recipient, please notify the sender immediately by replying to this email and delete it from your system. Any unauthorized use, disclosure, copying, or distribution of the contents of this email is strictly prohibited.</p>`;
    return message1 + message2 + message3;
  }

  function messageAdmin(orderId, userName, email, instagram, city, country, productList, message) {
    const instagramLink = instagram ? `<a href="https://www.instagram.com/${instagram.substring(1)}" target="_blank">${instagram}</a>` : 'Not provided by the user';
    const currentDate = new Date();
    const deadlineDate = new Date(currentDate);
    deadlineDate.setDate(deadlineDate.getDate() + 2);
  
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
  
    const emailContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="font-size: 24px; font-weight: bold;">New Message Received</h2>
      <p><strong>Message ID:</strong> ${orderId}</p>
      <p><strong>User Name:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Instagram:</strong> ${ instagramLink }</p>
      <p><strong>City:</strong> ${city || 'Not provided by the user'}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Message Received Time:</strong> ${formatDate(currentDate)}</p>
      <p><strong>Deadline to Answer:</strong> ${formatDate(deadlineDate)}</p>
      <h3 style="font-size: 20px; font-weight: bold;">Products in the favourites list:</h3>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <thead>
          <tr>
            <th style="border: 1px solid #333; padding: 8px; text-align: center;">UUID</th>
            <th style="border: 1px solid #333; padding: 8px; text-align: center;">Name</th>
            <th style="border: 1px solid #333; padding: 8px; text-align: center;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productList.map(product => `
            <tr>
              <td style="border: 1px solid #333; padding: 8px; text-align: center;">${product.uuid}</td>
              <td style="border: 1px solid #333; padding: 8px; text-align: center;">${product.nom}</td>
              <td style="border: 1px solid #333; padding: 8px; text-align: center;">€${product.price.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h3 style="font-size: 20px; font-weight: bold;">Message:</h3>
      <p>${message}</p>
      <hr>
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #999;"><em>Confidentiality Disclaimer:</em> This email and any attachments are confidential and intended solely for the use of the individual to whom it is addressed. If you are not the intended recipient, please notify the sender immediately by replying to this email and delete it from your system. Any unauthorized use, disclosure, copying, or distribution of the contents of this email is strictly prohibited.</p>
    </div>
  `;

  return emailContent;
  }


  function generateRandomVerificationCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let verificationCode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters.charAt(randomIndex);
    }
  
    return verificationCode;
  }


  function createVerificationEmail(name, code) {
    const body = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          body { font-family: 'Roboto', sans-serif; }
          h1 { font-size: 24px; color: black; }
          p { font-size: 16px; color: black; }
          .code { font-size: 20px; color: #e74c3c; font-weight: bold; }
          .footer { color: black; }
        </style>
      </head>
      <body>
        <h1>Hello ${name},</h1>
        <p>Thank you for signing up. Please verify your email address by entering the following code:</p>
        <p class="code">${code}</p>
        <p>If you did not sign up, please ignore this email.</p>
        <p class="footer">Best regards,</p>
        <p class="footer">The Meloverseland Team</p>
      </body>
    </html>
  `;

  
    return body;
  }
  
export { messageClient, messageAdmin, generateRandomVerificationCode, createVerificationEmail};