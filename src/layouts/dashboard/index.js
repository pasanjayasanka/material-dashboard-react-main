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
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import axios from "axios";

const date = new Date();

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [activities, setactivities] = useState({});
  const [sportActivities, setSportActivities] = useState([]);
  const [acwr, setAcwr] = useState([]);
  const [actlist, setActlist] = useState([]);
  const sportSet = (activitySet, weeklyActivities) => {
    const act = activitySet;
    const wk1 = weeklyActivities[0];
    const wk2 = weeklyActivities[1];
    const actarr = act.map((activity) => ({
      name: activity.name,
      acwr1: [wk1[activity.id_field]][0],
      acwr2: [wk2[activity.id_field]][0],
    }));
    actarr.pop();
    setActlist(actarr);
  };
  const getSportActivities = () => {
    axios
      .get("/sport/activity/user/")
      .then((res) => setSportActivities(res.data))
      .catch((e) => console.log(e));
  };
  const getActivities = () => {
    axios
      .get(`/upload/merge/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      .then((res) => {
        setactivities(res.data);
        console.log("activities");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getACWR = () => {
    axios
      .get(`/predict/week/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
      .then((res) => {
        setAcwr(res.data);
        console.log("acwr");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getActivities();
    getACWR();
    getSportActivities();
  }, []);
  useEffect(() => {
    // const act = activities[0];
    // const data = "data";
    console.log("return");
    console.log(acwr[0]);
    console.log(sportActivities);
  }, [acwr, sportActivities]);
  useEffect(() => {
    sportSet(sportActivities, acwr);
  }, [sportActivities, acwr]);
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
                    Math.round(activities.len / (33 * 6))
                      ? Math.round(activities.len / (33 * 6))
                      : 0
                  } mins`}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
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

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="favorite"
                title="Average Heart Rate"
                // count="68 Pulse"
                count={`${acwr[0][5]} Pulse`}
                // count={`${actlist[actlist.length - 1]} Pulse`}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="local_hospital"
                title="TRIMP Score"
                count="73"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
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
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Average Heart Rate"
                  description="Change During the week"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="TRIMP Score"
                  description="Change During the week"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsPieChart
                  color="info"
                  title="Activity Time"
                  description="Change During the week"
                  chart={sales}
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
