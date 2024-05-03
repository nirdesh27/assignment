import express, { Request, Response } from 'express';
import { List } from '../models/list';
import { BadRequestError } from '../errors/bad-request-error';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.delete(
  '/api/users/remove-list/:id',currentUser,
  async (req: Request, res: Response) => {
    const userEmail = req.currentUser?.email;
    if (!userEmail) {
        throw new BadRequestError('userEmail not found');
    }

    const itemId = req.params.id; // Extract item ID from request parameters

    // Delete the document that matches both the ID and email
    const result = await List.deleteOne({ id: itemId, email: userEmail });
    if (result.deletedCount === 0) {
        // If no document was deleted, return an error
        return res.status(404).json({ error: 'item not found' });
    }

    res.status(200).json({ message: 'item removed successfully' });
  }
);

export { router as removeListRouter };
