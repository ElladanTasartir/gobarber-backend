import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.status(201).json(formattedUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.status(201).json(formattedUser);
  }
}
