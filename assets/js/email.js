const formContact = document.getElementById('contact-form');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

formContact.addEventListener('submit', (e) => {
  e.preventDefault();

  const serviceId = 'service_6fnmjai';
  const templateId = 'template_qh8lxyp';
  const userId = 'f_lCAFK-rBeaLH5hy';

  const from_name = formContact.from_name.value;
  const to_name  = formContact.to_name.value;
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
        if (res.ok) {
          showNotification(`Dear ${from_name}, your message has been sent.`);
          formContact.reset(); // Reset the form after successful submission
        } else {
          console.log('Failed...', res);
          showNotification('Failed to send the message. Please try again.', 'error');
        }
      })
      .catch(err => {
        console.log('Failed...', err);
        showNotification('An error occurred. Please try again later.', 'error');
      });
});

function showNotification(message, type = 'success') {
  notificationText.textContent = message;
  notification.className = `notification ${type} show`;

  setTimeout(() => {
    closeNotification();
  }, 10000); // 10000 milliseconds (10 seconds)
}

function closeNotification() {
  notification.className = 'notification hidden';
}
