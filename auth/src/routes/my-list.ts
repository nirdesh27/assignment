import express, { Request, Response } from 'express';
import { List, Genre } from '../models/list';
import { BadRequestError } from '../errors/bad-request-error';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();
router.get('/api/users/my-list', currentUser, async (req: Request, res: Response) => {
        const userEmail = req.currentUser?.email;
        if (!userEmail) {
            throw new BadRequestError('userEmail not found');
        }

        const page = parseInt(req.query.page as string) || 1; // Current page number (default: 1)
        const limit = parseInt(req.query.limit as string) || 10; // Number of items per page (default: 10)

        const startIndex = (page - 1) * limit;

        // Query the database to get a slice of items based on pagination parameters
        const listItems = await List.find({ email: userEmail })
            .skip(startIndex)
            .limit(limit);

        // Calculate total count of items (for pagination metadata)
        const totalCount = await List.countDocuments({ email: userEmail });

        // Calculate total pages based on total count and limit
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            page: page,
            totalPages: totalPages,
            totalCount: totalCount,
            data: listItems
        });
});

export { router as myListRouter };
