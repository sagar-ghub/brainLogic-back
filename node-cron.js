const cron = require("node-cron");
const axios = require("axios");
const User = require("./Model/User");
function cronJob() {
  cron.schedule("* * * * *", () => {
    console.log("running every minute 1, 2, 4 and 5");
    fetchData("sagar-ghub").then((data) => {
      console.log(data.data.matchedUser.submitStats.acSubmissionNum);

      let temp = {
        easy: 0,
        medium: 0,
        hard: 0,
        all: 0,
      };
      let arr = data.data.matchedUser.submitStats.acSubmissionNum;
      arr.map((el) => {
        if (el.difficulty === "Easy") {
          temp.easy = el.count;
        }
        if (el.difficulty === "Medium") {
          temp.medium = el.count;
        }
        if (el.difficulty === "Hard") {
          temp.hard = el.count;
        }
        temp.all = temp.easy + temp.medium + temp.hard;
      });
      User.findOneAndUpdate()
      
    });
  });
}

const fetchData = async (leetcode_id) => {
  const { data } = await axios.get(` https://leetcode.com/graphql?query=query 
  { 
      matchedUser(username: "${leetcode_id}") 
      {
          username
          submitStats: submitStatsGlobal 
          {
              acSubmissionNum 
              {
                  difficulty
                  count
                  submissions
              }
          }
      }
  }`);
  console.log(data);

  return data;
};

module.exports = cronJob;
