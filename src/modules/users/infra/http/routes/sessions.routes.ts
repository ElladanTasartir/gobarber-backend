import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  const formattedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: formattedUser, token });
});

export default sessionsRouter;
