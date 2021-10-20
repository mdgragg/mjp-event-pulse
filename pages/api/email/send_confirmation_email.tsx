import { NextApiRequest, NextApiResponse } from 'next';
import { createTemplate } from './createTemplate';

const sendEmail = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const { text, data } = req.body;

        return res.send(createTemplate({ template: text, data }));
      } catch (error) {
        return res.status(400).json({ message: error });
      }

    default:
      res.status(404).json({ message: 'No endpoint ' });
      break;
  }
};
export default sendEmail;
