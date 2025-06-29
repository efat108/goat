const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aurthor: "Tokodori", // Convert By Goatbot Tokodori
    role: 0,
    shortDescription: " ",
    longDescription: "",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: 'JOY',
        gender: '𝐌𝐚𝐥𝐞',
        age: '𝟏7±',
        height: '5.08',
        choise: 'Russian 😞',
        nick: 'NAI'
      };

      const bold = 'https://i.imgur.com/v9A1DLB.mp4'; // Replace with working direct video URL

      const tmpFolderPath = path.join(__dirname, 'tmp');

      // Ensure tmp folder exists
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      // Download the video
      const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });

      const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');
      fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

      const response = ` 
╭[ .  ]•〆 JOY 〆 ]  ─⦿
╭────────────◊
├‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 
├‣ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}
├‣ 𝐆𝐞𝐧𝐝𝐞𝐫:  ${ownerInfo.gender}
├‣ 𝐀𝐠𝐞 : ${ownerInfo.age}
├‣ 𝐍𝐢𝐜𝐤 : ${ownerInfo.nick}
├‣ 𝐂𝐡𝐨𝐢𝐬𝐞:  ${ownerInfo.choise}   
├‣ 𝐇𝐞𝐢𝐠𝐡𝐭 : ${ownerInfo.height}
╰────────────◊ 
`;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(videoPath)
      }, event.threadID, event.messageID);

      // React to the message
      if (event.body && event.body.toLowerCase().includes('ownerinfo')) {
        api.setMessageReaction('🚀', event.messageID, () => {}, true);
      }

    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('❌ কমান্ড চালাতে সমস্যা হয়েছে!', event.threadID, event.messageID);
    }
  },
};
