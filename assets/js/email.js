const formContact = document.getElementById('contact-form');

formContact.addEventListener('submit', (e) => {
  e.preventDefault();

  const serviceId = 'service_6fnmjai';
  const templateId = 'template_qh8lxyp';
  const userId = 'f_lCAFK-rBeaLH5hy';

  const from_name = formContact.from_name.value;
  const to_name  = formContact.to_name .value;
  const message = formContact.message.value;

  const emailBody = {
    from_name: from_name,
    to_name: to_name,
    message: message
  }

  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: emailBody
    })
  })
    .then(res => {
      console.log('Success!', res);
    })
    .catch(err => console.log('Failed...', err))

});
