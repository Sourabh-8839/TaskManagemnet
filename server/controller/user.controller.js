import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';

const options = {
  httpOnly: true,
};

const genreateRefreshTokenAndaccessToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while genrating refresh and access Token'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //step 1 Extract data from req
  //step 2 check validation empty string
  //step 3 user is already exist
  //step 3 check file validation
  //step 4 upload file in cloud and store response
  //step 5 create user object
  //step 6 send response to user

  const { username, email, password, Role, isAdmin } = req.body;

  if ([email, Role, password].some((field) => field?.trim === '')) {
    throw new ApiError(200, 'All fields Required');
  }

  if (!email.includes('@gmail'))
    throw new ApiError(400, 'email must required @gmail');

  const existedEmail = await User.findOne({ email: email });

  if (existedEmail) {
    throw new ApiError(409, 'Email is already exist');
  }

  const user = await User.create({
    username,
    email,
    password,
    Role: Role,
    isAdmin,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something Went Wrong While registring User');
  }

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, 'User registered Succesfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(401, 'email is required');
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, 'user does not exist');
  }
  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid user credentials');
  }

  const { accessToken, refreshToken } =
    await genreateRefreshTokenAndaccessToken(user._id);

  const updatedUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: updatedUser,
          accessToken,
          refreshToken,
        },
        'User login succesfully '
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: '' },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new apiResponse(201, {}, 'User Logut Successfully'));
});
export { registerUser, loginUser, logOutUser };
