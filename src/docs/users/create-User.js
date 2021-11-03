export const user = {
  tags: ["Todo CRUD operations"],
  description: "Create todo",
  operationId: "createTodo",
  parameters: [],
  requestBody: {
    // expected request body
    content: {
      // content-type
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserInput", // todo input data model
        },
      },
    },
  },
  // expected responses
  responses: {
    // response code
    201: {
      description: "Todo created successfully", // response desc
    },
    // response code
    500: {
      description: "Server error", // response desc
    },
  },
};
