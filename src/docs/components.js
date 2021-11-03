export const components = {
  schemas: {
    // User model
    User: {
      type: "object",
      properties: {
        id: {
          type: "int",
          description: "User identification number",
          example: "ytyVgh", // example of an id
        },
        firstname: {
          type: "string",
          description: "User's firstname",
          example: "chudi", // example of a title
        },
        lastname: {
          type: "string",
          description: "User's lastname",
          example: "samual", // example of a title
        },
        email: {
          type: "string",
          description: "User's email",
          example: "chidisam@gmail.com", // example of a title
        },
        password: {
          type: "string",
          description: "The password of the User",
          example: "63283jdj2hhhs#", // example of a completed value
        },
      },
    },

    // error model
    Error: {
      type: "object",
      properties: {
        message: {
          type: "int",
          description: "Error message",
          example: "Not found", // example of an error message
        },
        internal_code: {
          type: "int",
          description: "Error internal code",
          example: "Invalid parameters", // example of an error internal code
        },
      },
    },
  },
};
