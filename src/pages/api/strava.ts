import { NextApiRequest, NextApiResponse } from "next";
import {
  StravaActivity,
  StravaGraphData,
  StravaGraphPoint,
} from "../../types/strava";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !process.env.STRAVA_CLIENT ||
    !process.env.STRAVA_REFRESH_TOKEN ||
    !process.env.STRAVA_SECRET
  ) {
    res.status(500).json("No environment variables set for Strava API");
    return;
  }

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    client_secret: process.env.STRAVA_SECRET,
    grant_type: "refresh_token",
  });

  const headers = {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json",
  };

  try {
    const reauthouriseRes = await fetch("https://www.strava.com/oauth/token", {
      body: body,
      headers: headers,
      method: "post",
    });

    const reAuthJson = await reauthouriseRes.json();

    const mondayDate = Math.floor(getMondaysDate().getTime() / 1000);

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthJson.access_token}&after=${mondayDate}`
    );

    const activitiesJson: StravaActivity[] = await activitiesRes.json();

    const formattedStravaData = formatStravaData(activitiesJson);

    res.status(200).json(formattedStravaData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

const getMondaysDate = () => {
  const nzDate = convertTZToNz(new Date());
  let day = nzDate.getDay(),
    diff = nzDate.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  let dayOnMonday = new Date(nzDate.setDate(diff));
  dayOnMonday.setHours(0, 0, 0, 0);
  return dayOnMonday;
};

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// I want two lots of data (swimming and running)
const formatStravaData = (data: StravaActivity[]) => {
  const formattedStravaData = getEmptyStravaData();

  data.forEach((activity) => {
    if (activity.type === "Run") {
      formattedStravaData.running.forEach((activityToFind) => {
        if (
          activityToFind.day === weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.distance =
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Swim") {
      formattedStravaData.swimming.forEach((activityToFind) => {
        if (
          activityToFind.day === weekday[new Date(activity.start_date_local).getDay()]
        ) {
          activityToFind.distance =
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    }
  });

  return formattedStravaData;
};

const getEmptyStravaData = (): StravaGraphData => {
  const formattedStravaData: StravaGraphData = {
    swimming: [] as StravaGraphPoint[],
    running: [] as StravaGraphPoint[],
  };

  formattedStravaData.running.push({ day: "Monday", distance: 0 });
  formattedStravaData.running.push({ day: "Tuesday", distance: 0 });
  formattedStravaData.running.push({ day: "Wednesday", distance: 0 });
  formattedStravaData.running.push({ day: "Thursday", distance: 0 });
  formattedStravaData.running.push({ day: "Friday", distance: 0 });
  formattedStravaData.running.push({ day: "Saturday", distance: 0 });
  formattedStravaData.running.push({ day: "Sunday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Monday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Tuesday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Wednesday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Thursday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Friday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Saturday", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sunday", distance: 0 });

  return formattedStravaData;
};

function convertTZToNz(date: string | Date): Date {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "Pacific/Auckland",
    })
  );
}
