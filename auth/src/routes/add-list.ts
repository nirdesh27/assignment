import express, { Request, Response } from 'express';
import { List, Genre } from '../models/list';
import { BadRequestError } from '../errors/bad-request-error';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.post(
  '/api/users/add-list',currentUser,
  async (req: Request, res: Response) => {
      const { id, title, description, genres } = req.body;
      const userEmail = req.currentUser?.email;
      if(!userEmail){
        throw new BadRequestError('userEmail not found');
      }
      // this should be email based
      const List1 = await List.findOne(({id,email:userEmail}))
      if (List1) {
        throw new BadRequestError('List id whith email already saved');
      }
      const list = List.build({id, title, description, genres,email: userEmail})
      const saveList = await List.insertMany([list]);
      res.status(201).send(saveList);
}
);

export { router as addListRouter };
