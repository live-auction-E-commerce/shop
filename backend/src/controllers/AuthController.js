import * as AuthLogic from '../logic/AuthLogic.js';

export const register = async (req, res) => {
  try {
    const { token, user } = await AuthLogic.register(req.body);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { token, user } = await AuthLogic.login(req.body);
    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
