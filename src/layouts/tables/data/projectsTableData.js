/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );

  // const Progress = ({ color, value }) => (
  //   <MDBox display="flex" alignItems="center">
  //     <MDTypography variant="caption" color="text" fontWeight="medium">
  //       {value}%
  //     </MDTypography>
  //     <MDBox ml={0.5} width="9rem">
  //       <MDProgress variant="gradient" color={color} value={value} />
  //     </MDBox>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: "Session Date", accessor: "project", width: "30%", align: "left" },
      { Header: "Session Time", accessor: "budget", align: "left" },
      { Header: "ACWR", accessor: "status", align: "center" },
      { Header: "Avg Heart Rate", accessor: "completion", align: "center" },
      { Header: "TRIMP", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            17/07/2022
          </MDTypography>
        ),
        budget: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            18 mins
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            1.22
          </MDTypography>
        ),
        completion: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            68 Pulse
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            73
          </MDTypography>
        ),
      },
      {
        project: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            16/07/2022
          </MDTypography>
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
}
