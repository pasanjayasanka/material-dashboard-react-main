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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
// eslint-disable-next-line react/prop-types
function Typogr({ component, href, variant, color, fontWeight, data }) {
  return (
    <MDTypography
      component={component}
      href={href}
      variant={variant}
      color={color}
      fontWeight={fontWeight}
    >
      {data}
    </MDTypography>
  );
}
const projectsTableData = {
  columns: [
    { Header: "Session Date", accessor: "date", width: "30%", align: "left" },
    { Header: "Session Time", accessor: "time", align: "left" },
    { Header: "ACWR", accessor: "status", align: "center" },
    { Header: "Avg Heart Rate", accessor: "completion", align: "center" },
    { Header: "TRIMP", accessor: "action", align: "center" },
  ],

  rows: [
    {
      date: (
        // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        //   17/07/20222
        // </MDTypography>
        <Typogr
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
          data="16/07/2022"
        />
      ),
      time: (
        // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        //   18 mins
        // </MDTypography>
        <Typogr
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
          data="18 mins"
        />
      ),
      activity1: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          1.22
        </MDTypography>
      ),
      activity2: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          68 Pulse
        </MDTypography>
      ),
      activity3: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          73
        </MDTypography>
      ),
    },
    {
      project: (
        // <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        //   16/07/2022
        // </MDTypography>
        <Typogr
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
          data="16/07/2022"
        />
      ),
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          22 mins
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          1.3
        </MDTypography>
      ),
      completion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          75 Pulse
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          65
        </MDTypography>
      ),
    },
    {
      project: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          15/07/2022
        </MDTypography>
      ),
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          30 mins
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          1.2
        </MDTypography>
      ),
      completion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          78 Pulse
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          70
        </MDTypography>
      ),
    },
  ],
};

function Tables() {
  const { columns: pColumns, rows: pRows } = projectsTableData;
  const [wlData, setwlData] = useState([]);
  const [activities, setActivities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [tableData, settableData] = useState({});
  const fetchData = () => {
    axios
      .get("/predict/workload/all/")
      .then((res) => setwlData(res.data))
      .catch((e) => console.log(e));
  };
  const fetchActivities = () => {
    axios
      .get("/sport/activity/user/")
      .then((res) => setActivities(res.data))
      .catch((e) => console.log(e));
  };
  const convObjArr = (objval) => {
    const arr = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in objval) {
      arr.push(objval[key]);
    }
    return arr;
  };
  const dataset = () => {
    const data = [];
    const date = [];
    if (activities.length > 0 && wlData.length > 0) {
      wlData.forEach((item) => {
        const temp = convObjArr(item.workload_data.har);
        date.push(item.date);
        data.push(temp);
      });
      const ret = [];
      const totals = [];
      data.forEach((dat) => {
        const temp1 = [];
        let total = 0;
        dat.forEach((d) => {
          activities.forEach((act) => {
            if (act.id_field === dat.indexOf(d)) {
              temp1.push({ a: act.name, w: d });
              total += d;
            }
          });
        });
        totals.push(total);
        ret.push(temp1);
      });
      // console.log(ret);
      return { total_time: totals, date_list: date, sport_vals: ret };
    }
    return null;
  };
  // eslint-disable-next-line no-unused-vars
  const setHeaders = () => {
    // eslint-disable-next-line camelcase,no-unused-vars
    const head_list = [
      { Header: "Session Date", accessor: "date", width: "20%", align: "left" },
      { Header: "Session Time", accessor: "time", align: "left" },
    ];
    if (dataset() && dataset().sport_vals.length > 0) {
      dataset().sport_vals[0].forEach((head) => {
        const tempHead = { Header: head.a, accessor: head.a, align: "center" };
        // eslint-disable-next-line camelcase
        head_list.push(tempHead);
      });
    }
    // eslint-disable-next-line camelcase
    // console.log("head_list");
    console.log(head_list);
    // eslint-disable-next-line camelcase
    return head_list;
  };
  const setTableData = () => {
    const initData = [];
    console.log("type1");
    console.log(typeof pColumns);
    // console.log(typeof initData);
    if (dataset() && dataset().sport_vals.length > 0) {
      for (let i = 0; i < dataset().sport_vals.length; i += 1) {
        const init = {
          date: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {dataset().date_list[i]}
            </MDTypography>
          ),
          time: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {dataset().total_time[i]}
            </MDTypography>
          ),
        };
        dataset().sport_vals[i].forEach((val) => {
          const temp = (
            <Typogr
              component="a"
              href="#"
              variant="button"
              color="text"
              fontWeight="medium"
              data={val.w}
            />
          );
          const tempKey = val.a.toString();
          init[`${tempKey}`] = temp;
        });
        initData.push(init);
      }
      console.log("initdata");
      console.log(pRows);
      console.log(initData);

      console.log(typeof initData);
      return Object.values(initData);
    }
    return {};
  };
  useEffect(() => {
    fetchData();
    fetchActivities();
    dataset();
  }, []);
  useEffect(() => {
    dataset();
    setHeaders();
    setTableData();
  }, [activities, wlData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Session History
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: setHeaders(), rows: pRows }}
                  // table={{ columns: setHeaders(), rows: setTableData() }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
// const Typogr = ({ component, href, variant, color, fontWeight, data }) => (
//   <MDTypography
//     component={component}
//     href={href}
//     variant={variant}
//     color={color}
//     fontWeight={fontWeight}
//   >
//     {data}
//   </MDTypography>
// );
export default Tables;
