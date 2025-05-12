import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const username = 'commatechjo@gmail.com';
  const password = 'Test@@2025';

  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const { id } = req.body; // Receive id from frontend

  const body = {
    authuser: username,
    authpass: password,
    from: 'admin@erbilcarrental.net',
    to: 'info@erbilcarrental.net',
    subject: 'New Order!',
    content: `New Order check now id: ${id}`,
  };

  try {
    const response = await axios.post('https://api.turbo-smtp.com/api/v2/mail/send', body, { headers });

    if (response.status === 200) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(response.status).json({ message: 'Failed to send email', error: response.data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.response?.data || error.message });
  }
}
