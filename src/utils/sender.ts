import AWS from 'aws-sdk'

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  };

const AWS_SES = new AWS.SES(SES_CONFIG);

export const sendError = (error) => {
      let params = {
        Source: 'jesuseovalles@gmail.com',
        Destination: {
          ToAddresses: [
            'jesuseovalles@gmail.com',
          ],
        },
        ReplyToAddresses: [],
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: error.toString(),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Hero Staking API Error`,
          }
        },
      };
      return AWS_SES.sendEmail(params).promise();
    };