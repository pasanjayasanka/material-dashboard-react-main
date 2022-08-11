/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsPieChart from "examples/Charts/PieChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import axios from "axios";

const dayName = (d) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return days[d % 7];
};
const getDays = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const temp = today.getDay();
    days.push(dayName(temp));
    today.setDate(today.getDate() - 1);
  }
  return days;
};
const reportsBarChartDataInit = {
  labels: getDays(),
  label: "ACWR",
  data: [0.6, 0.9, 1.3, 1.5, 1.2, 1.4, 1.22],
};
// const reportsBarChartDataInitset=(val)=>{
//   "labels": val.labels,
//   `datasets`: { "label": val.label, "data": val.data },
// };
// const tasksInit = {
//   labels: getDays(),
//   label: "TRIMP Score",
//   data: [48, 60, 75, 80, 70, 65, 70],
// };
const salesInit = {
  labels: getDays(),
  dataslabel: "Heart Rate",
  data: [80, 75, 85, 90, 78, 75, 68],
};
// const pie = {
//   icon: [],
//   title: ["running", "primary", "secondary", "info", "success", "warning"],
//   description: [],
//   height: [],
//   chart: [],
// };

const date = new Date();

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
const calcTrimp = (i, user, acwrval, activity) => {
  if (acwrval.length > 0 && user != null) {
    const hrHigh = user.max_hr;
    const hrLow = user.min_hr;
    const upperDiff = acwrval[i].hr - hrLow;
    const range = hrHigh - hrLow;
    const time = Math.round(activity.today / (33 * 60));
    const power = (1.92 * upperDiff) / range;
    const pv = Math.E ** power;
    const val = (time * upperDiff * 0.64 * pv) / range;
    return val;
  }
  return 0;
};

function Dashboard() {
  const [activities, setactivities] = useState({});
  const [sportActivities, setSportActivities] = useState([]);
  const [acwr, setAcwr] = useState([]);
  const [actlist, setActlist] = useState([]);
  const [reportsBarChartData, setreportsBarChartData] = useState(reportsBarChartDataInit);
  const [dailyTime, setdailyTime] = useState(null);
  // const [tasks, setTasks] = useState(tasksInit);
  const [sales, setSales] = useState(salesInit);
  const [curUser, setcurUser] = useState(null);
  const sportSet = (activitySet, weeklyActivities) => {
    if (weeklyActivities.length > 0) {
      const act = activitySet;
      const wk1 = weeklyActivities[0].activity;
      const wk2 = weeklyActivities[1].activity;
      const actarr = act.map((activity) => ({
        name: activity.name,
        acwr1: [wk1[activity.id_field]][0],
        acwr2: [wk2[activity.id_field]][0],
      }));
      actarr.pop();
      setActlist(actarr);
    }
  };
  const dailyTimes = () => {
    axios
      .get("predict/day/today/")
      .then((res) => setdailyTime(res.data[0].workload_data.har))
      .catch((e) => console.log(e));
  };
  const setDailyChartDate = () => {
    const arr = [];
    const actlist2 = [];
    if (dailyTime != null && actlist.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const i in dailyTime) {
        if (dailyTime[i] >= 0) {
          arr.push(dailyTime[i]);
        }
      }
      // actlist2 = activities.map((item) => item.name);
      // eslint-disable-next-line no-restricted-syntax
      for (const i in actlist) {
        if (actlist[i].name !== "") {
          actlist2.push(actlist[i].name);
        }
      }
    }
    // console.log("arr");
    // console.log(arr);
    // console.log("list");
    // console.log(actlist2);
    return { vals: arr, act: actlist2 };
  };
  const setTrimpData = () => {
    const dataarr = [];
    for (let i = 0; i < 7; i += 1) {
      dataarr.push(calcTrimp(i, curUser, acwr, activities));
    }
    console.log("trimp");
    console.log(dataarr);
    return {
      labels: getDays(),
      datasets: { label: "TRIMP Score", data: dataarr },
    };
  };
  const setBarchart = () => {
    const todayVal = activities.today;
    const yesterdayVal = activities.yesterday;
    let average = "";
    let label = "";
    if (yesterdayVal > 0 && todayVal > 0) {
      average = `${(((todayVal - yesterdayVal) * 100) / yesterdayVal).toString()}%`;
      label = "than yesterday";
    }
    return {
      color: "success",
      amount: average,
      label,
    };
  };
  const setHrchart = () => {
    let todayVal = 0;
    let yesterdayVal = 0;
    if (acwr.length > 0) {
      todayVal = acwr[0].hr;
      yesterdayVal = acwr[1].hr;
    }
    let average = "";
    let label = "";
    if (yesterdayVal > 0 && todayVal > 0) {
      average = `${(((todayVal - yesterdayVal) * 100) / yesterdayVal).toString()}%`;
      label = "than yesterday";
    }
    return {
      color: "success",
      amount: average,
      label,
    };
  };
  const getSportActivities = () => {
    // setLoading(true);
    axios
      .get("/sport/activity/user/")
      .then((res) => {
        setSportActivities(res.data);
        // setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const getActivities = () => {
    // setLoading(true);
    axios
      .get(`/upload/merge/length/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      .then((res) => {
        setactivities(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getACWR = () => {
    axios
      .get(`/predict/week/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      .then((res) => {
        setAcwr(res.data);
        // console.log("dat");
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const average = (arr) => {
    let total = 0;
    let count = 0;
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i in arr) {
      count += 1;
      // console.log(i);
      // console.log(`${total}total`);
      // console.log(`${arr[i]}arr[i]`);
      total += arr[i];
    }
    return total / count;
  };
  const setChartData = () => {
    if (acwr.length > 0) {
      const data = [];
      const hr = [];
      acwr.forEach((value) => {
        data.push(average(value.activity));
        hr.push(value.hr);
      });
      console.log("data");
      console.log(data);
      setreportsBarChartData({ ...reportsBarChartData, data });
      setSales({ ...sales, data: hr });
    }
  };
  const fetchUser = () => {
    // const id=userData();
    axios
      .get("/auth/profile/")
      .then((res) => setcurUser(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setreportsBarChartData(reportsBarChartDataInit);
    dailyTimes();
    // setTasks(tasksInit);
    setSales(salesInit);
    getActivities();
    getACWR();
    getSportActivities();
    fetchUser();
    average({});
  }, []);
  useEffect(() => {
    setChartData();
  }, [acwr, sportActivities]);
  useEffect(() => {
    sportSet(sportActivities, acwr);
  }, [sportActivities, acwr]);
  useEffect(() => {
    setBarchart();
  }, [activities]);
  useEffect(() => {
    calcTrimp(0, curUser, acwr, activities);
    console.log("daily");
    // console.log(dailyTime);
    setDailyChartDate();
  }, [curUser, activities, acwr, dailyTime]);
  useEffect(() => console.log(actlist), [actlist]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {activities && (
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="timer"
                  title="Training Time"
                  count={`${
                    Math.round(activities.today / (33 * 60))
                      ? Math.round(activities.today / (33 * 60))
                      : 0
                  } mins`}
                  percentage={setBarchart()}
                />
              </MDBox>
            </Grid>
          )}
          {acwr &&
            actlist.map((a) => (
              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title={`${a.name} ACWR`}
                    count={`${parseFloat(a.acwr1).toFixed(2)}`}
                    percentage={{
                      color: "success",
                      amount: parseFloat(((a.acwr1 - a.acwr2) * 100) / a.acwr1)
                        .toFixed(2)
                        .toString(),
                      label: "% than yesterday",
                    }}
                  />
                </MDBox>
              </Grid>
            ))}

          {acwr.length > 0 && (
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="favorite"
                  title="Average Heart Rate"
                  count={`${acwr[0].hr} Pulse`}
                  // count="76 pulse"
                  percentage={
                    //   {
                    //   color: "success",
                    //   amount: "+1%",
                    //   label: "than yesterday",
                    // }
                    setHrchart()
                  }
                />
              </MDBox>
            </Grid>
          )}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="local_hospital"
                title="TRIMP Score"
                count={`${parseFloat(calcTrimp(0, curUser, acwr, activities)).toFixed(2)}`}
                // count={`${calcTrimp(0)}`}
                percentage={
                  //   color: "success",
                  //   amount: "+1%",
                  //   label: "than yesterday",
                  // }
                  setHrchart()
                }
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="ACWR value"
                  description="Change During the week"
                  chart={{
                    labels: reportsBarChartData.labels,
                    datasets: {
                      label: reportsBarChartData.label,
                      data: reportsBarChartData.data.reverse(),
                    },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Average Heart Rate"
                  description="Change During the week"
                  chart={{
                    labels: sales.labels,
                    datasets: { label: sales.label, data: sales.data.reverse() },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="TRIMP Score"
                  description="Change During the week"
                  chart={setTrimpData()}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsPieChart
                  icon={{ color: "info", component: "leaderboard" }}
                  color="info"
                  title="Activity Time"
                  description="Change During the week"
                  // chart={tasks}
                  chart={{
                    labels: setDailyChartDate().act,
                    datasets: {
                      label: "Projects",
                      backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
                      data: setDailyChartDate().vals,
                    },
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
