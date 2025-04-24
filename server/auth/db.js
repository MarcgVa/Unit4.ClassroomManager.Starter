const { prisma } = require("../db/index");


const createNewInstructor = async (username, password) => {
  return await prisma.instructor.create({
    data: {
      username,
      password,
    },
  });
};

const getInstructor = async (username, password) => {
  const response =  await prisma.instructor.findFirst({
    where: {
      username,
    },
  });
  return response;
};

const getInstructorById = async ({id}) => {
  console.log('id',id);
  return await prisma.instructor.findFirst({
    where: {
      id,
    },
  });
};



module.exports = { createNewInstructor, getInstructor, getInstructorById };
