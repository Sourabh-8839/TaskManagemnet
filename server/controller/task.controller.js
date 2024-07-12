import Notice from '../models/Notice.js';
import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createTask = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, team, stage, date, priority, description } = req.body;

    let text = 'New task has been assigned to you';
    if (team?.length > 1) {
      text = text + ` and ${team?.length - 1} others.`;
    }

    text =
      text +
      ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
        date
      ).toDateString()}. Thank you!!!`;

    const task = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      description,
    });

    for (let id of team) {
      await User.findByIdAndUpdate(id, {
        $push: {
          tasks: task._id,
        },
      });
    }

    await Notice.create({
      team,
      text,
      task: task._id,
    });

    res.status(200).json(new apiResponse(200, task));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const dashboardStatistics = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const allTasks = isAdmin
      ? await Task.find()
          .populate({
            path: 'team',
            select: 'name role title email',
          })
          .sort({ _id: -1 })
      : await Task.find({ team: { $all: [userId] } })
          .populate({
            path: 'team',
            select: 'name role title email',
          })
          .sort({ _id: -1 });

    const users = await User.find()
      .select('-password -createdAt')
      .limit(10)
      .sort({ _id: -1 });

    //   group task by stage and calculate counts
    const groupTaskks = allTasks.reduce((result, task) => {
      const stage = task.stage;

      if (!result[stage]) {
        result[stage] = 1;
      } else {
        result[stage] += 1;
      }

      return result;
    }, {});

    // Group tasks by priority
    const groupData = Object.entries(
      allTasks.reduce((result, task) => {
        const { priority } = task;

        result[priority] = (result[priority] || 0) + 1;
        return result;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    // calculate total tasks
    const totalTasks = allTasks?.length;
    const last10Task = allTasks?.slice(0, 10);

    const summary = {
      totalTasks,
      last10Task,
      users: isAdmin ? users : [],
      tasks: groupTaskks,
      graphData: groupData,
    };

    res.status(200).json({
      status: true,
      message: 'Successfully',
      ...summary,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTaskList = async (req, res) => {
  try {
    const { userId } = req.user;
    const users = await User.findById(userId).populate('tasks').populate('_id');

    res
      .status(200)
      .json(new apiResponse(200, users.tasks, 'User Get Succesfully task'));
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.date = date;
    task.priority = priority.toLowerCase();
    task.stage = stage.toLowerCase();
    task.team = team;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: 'Task updated successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    const task = await Task.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: `Task Delete successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getAllAdminTask = asyncHandler(async (req, res) => {
  const task = await Task.find();

  res.status(200).json(new apiResponse(200, task, 'get All task'));
});

export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate({
    path: 'team',
    select: '-password -refreshToken -tasks',
  });

  if (!task) {
    throw new ApiError(404, 'Task is not found ');
  }

  res.status(200).json(new apiResponse(200, task));
});
