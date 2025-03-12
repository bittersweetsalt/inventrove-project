export default function handler(req, res) {
    // For logout, simply clear the token on the client-side.
    res.status(200).json({ message: 'Logged out' });
  }
  