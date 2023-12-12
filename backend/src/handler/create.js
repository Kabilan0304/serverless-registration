const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// Initialize the DynamoDB client
const ddbClient = new DynamoDBClient({ region: "your-region" }); // replace 'your-region' with your DynamoDB region

exports.handler = async (event) => {
  try {
    // Validate and extract user registration information from the event
    const { userId, email, name } = event;
    if (!userId || !email || !name) {
      throw new Error("Missing registration information");
    }

    // Define the item to be added to DynamoDB
    const params = {
      TableName: "UserRegistrations", // replace with your DynamoDB table name
      Item: {
        userId: { S: userId },
        email: { S: email },
        name: { S: name },
      },
    };

    // Add the item to DynamoDB
    await ddbClient.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User registered successfully" }),
    };
  } catch (error) {
    console.error("Error registering user: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error registering user" }),
    };
  }
};
